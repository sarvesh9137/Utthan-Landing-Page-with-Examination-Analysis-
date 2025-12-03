import html2canvas from 'html2canvas';

// Create a temporary canvas context for color resolution
const tempCtx = document.createElement('canvas').getContext('2d');

/**
 * Resolves any CSS color string (including oklch, variables, etc.) to a standard RGBA string
 * by forcing the browser to render it to a canvas pixel.
 */
function resolveColor(color) {
    if (!color || color === 'transparent' || color === 'inherit' || color === 'currentcolor' || color === 'none') {
        return color;
    }

    try {
        // Clear the temp canvas
        tempCtx.clearRect(0, 0, 1, 1);

        // Set the fill style and draw a pixel
        tempCtx.fillStyle = color;
        tempCtx.fillRect(0, 0, 1, 1);

        // Get the pixel data (forces rasterization to RGBA)
        const data = tempCtx.getImageData(0, 0, 1, 1).data;

        // Convert to standard rgba string
        // data is [r, g, b, a] (0-255)
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    } catch (e) {
        console.warn('Failed to resolve color:', color, e);
        return color;
    }
}

/**
 * Recursively copies computed styles from source to target and resolves colors
 */
function flattenStyles(source, target) {
    const computed = window.getComputedStyle(source);

    // Comprehensive list of properties that might contain colors
    const colorProperties = [
        'color',
        'backgroundColor',
        'borderColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
        'outlineColor',
        'boxShadow',
        'textShadow',
        // SVG specific properties
        'fill',
        'stroke',
        'stopColor',
        'floodColor',
        'lightingColor'
    ];

    colorProperties.forEach(prop => {
        const value = computed[prop];
        if (value && value !== 'none' && value !== 'transparent') {
            // Resolve the color to a standard format (hex/rgb) that html2canvas supports
            // For complex properties like boxShadow, this simple resolver might not work perfectly 
            // if the browser returns the whole string with oklch inside. 
            // But for single color properties it works.

            if (prop === 'boxShadow' || prop === 'textShadow') {
                // If shadow contains oklch, we might just have to remove it or try to replace it
                if (value.includes('oklch')) {
                    target.style[prop] = 'none'; // Safer to remove shadow than crash
                } else {
                    target.style[prop] = value;
                }
            } else {
                target.style[prop] = resolveColor(value);
            }
        }
    });

    // Handle children
    const sourceChildren = source.children;
    const targetChildren = target.children;

    for (let i = 0; i < sourceChildren.length; i++) {
        if (targetChildren[i]) {
            flattenStyles(sourceChildren[i], targetChildren[i]);
        }
    }
}

/**
 * Helper function to capture an element by manually cloning it to remove transforms
 */
async function captureElement(elementId) {
    const originalElement = document.getElementById(elementId);
    if (!originalElement) {
        throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Create a clone of the element
    const clone = originalElement.cloneNode(true);

    // Style the clone to be flat and visible but positioned off-screen
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '-9999px';
    clone.style.transform = 'none';
    clone.style.transition = 'none';
    clone.style.width = `${originalElement.offsetWidth}px`;
    clone.style.height = `${originalElement.offsetHeight}px`;
    clone.style.backgroundColor = '#ffffff'; // Ensure background is white
    clone.style.zIndex = '9999';

    // Reset perspective on the clone if it exists
    clone.style.perspective = 'none';

    // Append to body
    document.body.appendChild(clone);

    try {
        // Flatten styles and resolve all colors to standard formats
        flattenStyles(originalElement, clone);

        // Small delay to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Capture the clone
        const canvas = await html2canvas(clone, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
            useCORS: true,
            allowTaint: true,
            width: originalElement.offsetWidth,
            height: originalElement.offsetHeight,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight,
            x: 0,
            y: 0
        });
        return canvas;
    } finally {
        // Clean up
        if (document.body.contains(clone)) {
            document.body.removeChild(clone);
        }
    }
}

/**
 * Downloads a chart as a PNG image
 * @param {string} elementId - The ID of the chart container element to download
 * @param {string} filename - The name for the downloaded file (without extension)
 */
export async function downloadChart(elementId, filename = 'chart') {
    try {
        const canvas = await captureElement(elementId);

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create image blob');
            }
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${filename}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Error downloading chart:', error);
        alert(`Failed to download chart: ${error.message}`);
    }
}

/**
 * Copies a chart as a PNG image to the clipboard
 * @param {string} elementId - The ID of the chart container element to copy
 * @param {HTMLElement} [triggerElement] - The element that triggered the copy (e.g., the button)
 */
export async function copyChartToClipboard(elementId, triggerElement) {
    try {
        const canvas = await captureElement(elementId);

        // Convert canvas to blob
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));

        if (!blob) {
            throw new Error('Failed to generate image blob');
        }

        // Check for ClipboardItem support
        if (typeof ClipboardItem === 'undefined') {
            throw new Error('ClipboardItem is not supported in this browser');
        }

        // Try to restore focus
        if (triggerElement) {
            triggerElement.focus();
        } else {
            window.focus();
        }

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob,
            }),
        ]);

        alert('Chart copied to clipboard!');
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        if (error.name === 'NotAllowedError') {
            alert('Failed to copy: Document is not focused. Please click anywhere on the page and try again.');
        } else {
            alert(`Failed to copy image: ${error.message}`);
        }
    }
}

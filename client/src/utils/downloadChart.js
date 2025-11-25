import html2canvas from 'html2canvas';

/**
 * Downloads a chart as a PNG image
 * @param {string} elementId - The ID of the chart container element to download
 * @param {string} filename - The name for the downloaded file (without extension)
 */
export async function downloadChart(elementId, filename = 'chart') {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID "${elementId}" not found`);
            return;
        }

        // Capture the element as a canvas
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
        });

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${filename}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Error downloading chart:', error);
    }
}

/**
 * Copies a chart as a PNG image to the clipboard
 * @param {string} elementId - The ID of the chart container element to copy
 */
/**
 * Copies a chart as a PNG image to the clipboard
 * @param {string} elementId - The ID of the chart container element to copy
 * @param {HTMLElement} [triggerElement] - The element that triggered the copy (e.g., the button)
 */
export async function copyChartToClipboard(elementId, triggerElement) {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID "${elementId}" not found`);
            return;
        }

        // Capture the element as a canvas
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
        });

        // Convert canvas to blob
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));

        if (!blob) {
            throw new Error('Failed to generate image blob');
        }

        // Check for ClipboardItem support
        if (typeof ClipboardItem === 'undefined') {
            throw new Error('ClipboardItem is not supported in this browser');
        }

        // Try to restore focus to the trigger element or the document body
        // This is critical for the Clipboard API to work
        if (triggerElement) {
            triggerElement.focus();
        } else {
            window.focus();
            if (document.activeElement === document.body) {
                // If body is already active, good. If not, try to focus it.
                // Note: body usually isn't focusable unless it has tabindex, 
                // but window.focus() handles the window level.
            }
        }

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob,
            }),
        ]);

        // Optional: You could return true or show a toast here
        console.log('Chart copied to clipboard');
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

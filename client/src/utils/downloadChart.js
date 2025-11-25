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

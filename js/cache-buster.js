// Cache busting functionality
(function() {
    // Version number - update this when you make changes
    const VERSION = '1.0.0';
    
    // Function to add version parameter to URLs
    function addVersionToUrl(url) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}v=${VERSION}`;
    }

    // Function to update all script and link tags
    function updateResourceUrls() {
        // Update script tags
        document.querySelectorAll('script[src]').forEach(script => {
            if (!script.src.includes('v=')) {
                script.src = addVersionToUrl(script.src);
            }
        });

        // Update link tags (CSS)
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.href.includes('v=')) {
                link.href = addVersionToUrl(link.href);
            }
        });
    }

    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateResourceUrls);
    } else {
        updateResourceUrls();
    }
})(); 
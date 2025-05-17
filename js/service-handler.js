document.addEventListener('DOMContentLoaded', function() {
    // Get the service parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service');

    // If there's a service parameter, set it in the form
    if (serviceType) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Map the service parameter to the correct option value
            const serviceMap = {
                'tree-cutting': 'tree-cutting',
                'tree-inventory': 'tree-inventory',
                'landscaping': 'landscaping',
                'seedling-production': 'seedling-production',
                'permitting': 'permitting',
                'other': 'other'
            };

            const optionValue = serviceMap[serviceType];
            if (optionValue) {
                serviceSelect.value = optionValue;
                // Trigger the change event to update the recipient email
                const event = new Event('change');
                serviceSelect.dispatchEvent(event);
            }
        }
    }
}); 
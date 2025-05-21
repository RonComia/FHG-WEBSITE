// Initialize EmailJS
(function() {
    console.log('Initializing EmailJS...');
    emailjs.init("I0TbPEGJS8k27oHS2"); // Your Public Key
    console.log('EmailJS initialized');
})();

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Setting up contact form...');
    const serviceSelect = document.getElementById('service');
    const recipientSelect = document.getElementById('recipientEmail');
    const fileUploadGroup = document.querySelector('.file-upload-group');
    const fileInput = document.getElementById('projectFiles');
    const selectedFiles = document.getElementById('selectedFiles');
    const contactForm = document.getElementById('contactForm');

    // Maximum file size (5MB for EmailJS)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    // Allowed file types
    const ALLOWED_FILE_TYPES = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.google-earth.kml+xml'
    ];

    // Show/hide file upload based on service selection
    serviceSelect.addEventListener('change', function() {
        if (this.value) {
            fileUploadGroup.style.display = 'block';
        } else {
            fileUploadGroup.style.display = 'none';
            fileInput.value = '';
            selectedFiles.innerHTML = '';
        }

        // Set recipient email based on service
        switch(this.value) {
            case 'tree-cutting':
            case 'landscaping':
            case 'seedling-production':
            case 'other':
                recipientSelect.value = 'iamfeluna@yahoo.com';
                break;
            case 'tree-inventory':
            case 'permitting':
                recipientSelect.value = 'ga_luna358@yahoo.com';
                break;
            default:
                recipientSelect.value = 'all';
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', function() {
        selectedFiles.innerHTML = '';
        const files = Array.from(this.files);
        let hasInvalidFiles = false;

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                fileItem.classList.add('error');
                fileItem.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${file.name}</span>
                    <span class="file-error">File too large (max 5MB)</span>
                `;
                hasInvalidFiles = true;
                return;
            }

            // Validate file type
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                fileItem.classList.add('error');
                fileItem.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${file.name}</span>
                    <span class="file-error">Invalid file type</span>
                `;
                hasInvalidFiles = true;
                return;
            }

            // Determine icon based on file type
            let iconClass = 'fas fa-file';
            if (file.type === 'application/vnd.google-earth.kml+xml') {
                iconClass = 'fas fa-map-marked-alt';
            } else if (file.type === 'application/pdf') {
                iconClass = 'fas fa-file-pdf';
            } else if (file.type.startsWith('image/')) {
                iconClass = 'fas fa-file-image';
            } else if (file.type.includes('word')) {
                iconClass = 'fas fa-file-word';
            }

            fileItem.innerHTML = `
                <i class="${iconClass}"></i>
                <span>${file.name}</span>
                <span class="file-size">(${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                <button type="button" class="remove-file" title="Remove file">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // Add remove file functionality
            const removeButton = fileItem.querySelector('.remove-file');
            removeButton.addEventListener('click', () => {
                fileItem.remove();
                // Update the FileList
                const dt = new DataTransfer();
                Array.from(fileInput.files).forEach(f => {
                    if (f !== file) dt.items.add(f);
                });
                fileInput.files = dt.files;
            });

            selectedFiles.appendChild(fileItem);
        });

        // Show error message if there are invalid files
        if (hasInvalidFiles) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'file-error-message';
            errorMessage.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Some files were not added due to size or type restrictions.
                Maximum file size is 5MB. Allowed types: PDF, JPG, PNG, DOC, KMZ
            `;
            selectedFiles.insertBefore(errorMessage, selectedFiles.firstChild);
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        console.log('Form submission started');
        e.preventDefault();
        
        // Remove any existing messages
        const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            console.log('Starting form validation...');
            // Get all form values
            console.log('Name input element:', document.getElementById('name'));
            console.log('Email input element:', document.getElementById('email'));
            console.log('Phone input element:', document.getElementById('phone'));
            console.log('Service select element:', document.getElementById('service'));
            console.log('Message textarea element:', document.getElementById('message'));
            console.log('Recipient select element:', document.getElementById('recipientEmail'));
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value.trim();
            const message = document.getElementById('message').value.trim();
            const recipientEmail = document.getElementById('recipientEmail').value.trim();

            console.log('Form values collected:', {
                name,
                email,
                phone,
                service,
                message,
                recipientEmail
            });

            // Validate required fields
            const missingFields = [];
            if (!name) missingFields.push('Name');
            if (!email) missingFields.push('Email');
            if (!service) missingFields.push('Service');
            if (!message) missingFields.push('Message');
            if (!recipientEmail) missingFields.push('Recipient Email');

            if (missingFields.length > 0) {
                throw new Error(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            }

            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Get form data
            const formData = {
                name: name,
                email: email,
                phone: phone,
                service: formatServiceName(service),
                message: message,
                recipientEmail: recipientEmail,
                subject: `New Contact Form Submission - ${formatServiceName(service)}`
            };

            // Handle file attachments
            const files = fileInput.files;
            if (files.length > 0) {
                const attachments = [];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const base64 = await convertFileToBase64(file);
                    attachments.push({
                        name: file.name,
                        data: base64.split(',')[1]
                    });
                }
                formData.attachments = attachments;
            }

            console.log('Form data prepared:', formData);
            console.log('Attempting to send email with EmailJS...');
            console.log('Service ID:', 'service_hgz8zzp');
            console.log('Template ID:', 'template_e051a3f');
            
            const response = await emailjs.send(
                'service_hgz8zzp',
                'template_e051a3f',
                formData
            );
            console.log('EmailJS response received:', response);

            if (response.status !== 200) {
                throw new Error('Failed to send email. Please try again later.');
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message. We will get back to you soon!</p>
            `;
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Only reset form after successful email send
            setTimeout(() => {
                contactForm.reset();
                selectedFiles.innerHTML = '';
                fileUploadGroup.style.display = 'none';
                successMessage.remove();
            }, 3000);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>${error.message}</p>
            `;
            contactForm.insertBefore(errorMessage, contactForm.firstChild);

            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Function to convert file to base64
    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    function formatServiceName(service) {
        const serviceMap = {
            'tree-cutting': 'Tree Cutting',
            'landscaping': 'Landscaping',
            'seedling-production': 'Seedling Production',
            'tree-inventory': 'Tree Inventory',
            'permitting': 'Permitting',
            'other': 'Other Services'
        };
        return serviceMap[service] || service;
    }

    console.log(document.querySelectorAll('#name').length);
    console.log(document.querySelectorAll('#email').length);
    console.log(document.querySelectorAll('#phone').length);
    console.log(document.querySelectorAll('#service').length);
    console.log(document.querySelectorAll('#message').length);
    console.log(document.querySelectorAll('#recipientEmail').length);
    console.log(document.getElementById('contactForm'));
}); 
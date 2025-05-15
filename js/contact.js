// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // EmailJS Configuration
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your EmailJS public key

    const serviceSelect = document.getElementById('service');
    const fileUploadGroup = document.querySelector('.file-upload-group');
    const fileInput = document.getElementById('projectFiles');
    const selectedFiles = document.getElementById('selectedFiles');
    const contactForm = document.getElementById('contactForm');

    // Show/hide file upload based on service selection
    serviceSelect.addEventListener('change', function() {
        if (this.value) {
            fileUploadGroup.style.display = 'block';
        } else {
            fileUploadGroup.style.display = 'none';
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', function() {
        selectedFiles.innerHTML = '';
        if (this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                // Determine icon based on file type
                let iconClass = 'fas fa-file';
                if (file.name.toLowerCase().endsWith('.kmz')) {
                    iconClass = 'fas fa-map-marked-alt';
                } else if (file.name.toLowerCase().endsWith('.pdf')) {
                    iconClass = 'fas fa-file-pdf';
                } else if (file.name.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
                    iconClass = 'fas fa-file-image';
                } else if (file.name.toLowerCase().match(/\.(doc|docx)$/)) {
                    iconClass = 'fas fa-file-word';
                }

                fileItem.innerHTML = `
                    <i class="${iconClass}"></i>
                    <span>${file.name}</span>
                    <span class="file-size">(${(file.size / 1024).toFixed(1)} KB)</span>
                `;
                selectedFiles.appendChild(fileItem);
            });
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Create FormData object
            const formData = new FormData(this);
            
            // Get recipient selection
            const recipientValue = document.getElementById('recipientEmail').value;
            let recipients = [];
            if (recipientValue === 'all') {
                recipients = [
                    'info@foresthillsgarden.com',
                    'support@foresthillsgarden.com',
                    'sales@foresthillsgarden.com'
                ];
            } else {
                recipients = [recipientValue];
            }
            formData.delete('recipient'); // Remove if exists
            recipients.forEach(email => formData.append('recipient', email));

            // Send the form data
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Show success message
            alert('Thank you for your message. We will get back to you soon!');
            
            // Reset form
            this.reset();
            selectedFiles.innerHTML = '';
            fileUploadGroup.style.display = 'none';
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}); 
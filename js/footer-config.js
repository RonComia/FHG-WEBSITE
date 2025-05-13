// Footer configuration
const footerConfig = {
    contact: {
        email: 'info@foresthillsgarden.com',
        phone: '(555) 123-4567'
    },
    socialMedia: {
        facebook: {
            url: 'https://www.facebook.com/FHGWeDoItRightAndFast',
            icon: 'fab fa-facebook',
            enabled: true
        },
        instagram: {
            url: '#',
            icon: 'fab fa-instagram',
            enabled: true
        },
        twitter: {
            url: '#',
            icon: 'fab fa-twitter',
            enabled: true
        }
    },
    copyright: '© 2024 Forest Hills Garden. All rights reserved.'
};

// Function to generate footer HTML
function generateFooter() {
    const socialLinks = Object.entries(footerConfig.socialMedia)
        .filter(([_, platform]) => platform.enabled)
        .map(([platform, data]) => `
            <a href="${data.url}" target="_blank" rel="noopener noreferrer">
                <i class="${data.icon}"></i>
            </a>
        `).join('');

    return `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: ${footerConfig.contact.email}</p>
                    <p>Phone: ${footerConfig.contact.phone}</p>
                </div>
                <div class="footer-section">
                    <h3>Follow Us</h3>
                    <div class="social-links">
                        ${socialLinks}
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${footerConfig.copyright}</p>
            </div>
        </footer>
    `;
} 
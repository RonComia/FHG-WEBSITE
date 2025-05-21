// Footer configuration
const footerConfig = {
    contact: {
        emails: [
            'iamfeluna@yahoo.com',
            'ga_luna35@yahoo.com',
            'ron23comia@gmail.com'
        ],
        phone: '(043) 741 0603'
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
    copyright: '© 2025 Forest Hills Garden. All rights reserved.'
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
                    <div class="footer-emails">
                        ${footerConfig.contact.emails.map(email => `<p>Email: <a href="mailto:${email}">${email}</a></p>`).join('')}
                    </div>
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
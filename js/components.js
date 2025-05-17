// Function to include HTML components
async function includeHTML(elementId, path) {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id "${elementId}" not found`);
            return;
        }

        if (elementId === 'footer-container') {
            // Use the footer configuration
            element.innerHTML = generateFooter();
            return;
        }

        // Adjust path for GitHub Pages
        const basePath = window.location.hostname.includes('github.io') ? '/FHG-WEBSITE' : '';
        const fullPath = `${basePath}/${path}`;

        const response = await fetch(fullPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;

        // Set active class for current page
        let currentPage = window.location.pathname.split('/').pop() || 'index.html';
        currentPage = currentPage.split('?')[0].split('#')[0];
        if (currentPage === '') currentPage = 'index.html';
        const navLinks = element.querySelectorAll('.nav-links a, .hamburger-menu a');
        navLinks.forEach(link => {
            let linkHref = link.getAttribute('href').split('?')[0].split('#')[0];
            if ((currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === './' || linkHref === '')) || linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        // Provide fallback content if component fails to load
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'header-container') {
                element.innerHTML = `
                    <header>
                        <nav class="navbar">
                            <div class="logo">
                                <a href="index.html" style="text-decoration:none;"><h1>Forest Hills Garden</h1></a>
                            </div>
                            <ul class="nav-links">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="history.html">History</a></li>
                                <li><a href="affiliations.html">Affiliations</a></li>
                                <li><a href="find-us.html">Find Us</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                            <div class="hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                                <ul class="hamburger-menu">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="about.html">About</a></li>
                                    <li><a href="services.html">Services</a></li>
                                    <li><a href="history.html">History</a></li>
                                    <li><a href="affiliations.html">Affiliations</a></li>
                                    <li><a href="find-us.html">Find Us</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </div>
                        </nav>
                    </header>`;
            }
        }
    }
}

// Include header and footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header-container', 'components/header.html');
    includeHTML('footer-container', 'components/footer.html');
}); 
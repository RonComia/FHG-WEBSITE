// Wait for DOM content to be loaded
let hamburger;
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    hamburger = document.querySelector('.hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    const hamburgerLinks = document.querySelectorAll('.hamburger-menu a');
    hamburgerLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger) {
        if (!hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--primary-color)';
    } else {
        navbar.style.backgroundColor = 'var(--primary-color)';
    }
}); 
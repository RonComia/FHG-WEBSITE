// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Add transition delay to each nav item
        navLinks.querySelectorAll('li').forEach((item, index) => {
            item.style.setProperty('--i', index);
        });

        // Toggle menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

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

    // Initial check for timeline items
    checkTimelineItems();
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

// Timeline animation
function checkTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const triggerBottom = window.innerHeight * 0.8;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;

        if (itemTop < triggerBottom && itemBottom > 0) {
            item.classList.add('visible');
        }
    });
}

// Check timeline items on scroll with throttling
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            checkTimelineItems();
            isScrolling = false;
        });
        isScrolling = true;
    }
}); 
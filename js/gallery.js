// Gallery data structure
const galleryData = {
    'tree-removal': [
        { src: 'images/services/1.jpg', alt: 'Tree Removal Service 1' },
        { src: 'images/services/2.jpg', alt: 'Tree Removal Service 2' },
        { src: 'images/services/3.jpg', alt: 'Tree Removal Service 3' }
    ],
    'landscaping': [
        { src: 'images/services/landscaping-1.jpg', alt: 'Landscaping Service 1' },
        { src: 'images/services/landscaping-2.jpg', alt: 'Landscaping Service 2' },
        { src: 'images/services/landscaping-3.jpg', alt: 'Landscaping Service 3' }
    ],
    'seedling': [
        { src: 'images/services/seedling-1.jpg', alt: 'Seedling Production 1' },
        { src: 'images/services/seedling-2.jpg', alt: 'Seedling Production 2' },
        { src: 'images/services/seedling-3.jpg', alt: 'Seedling Production 3' }
    ],
    'inventory': [
        { src: 'images/services/inventory-1.jpg', alt: 'Tree Inventory 1' },
        { src: 'images/services/inventory-2.jpg', alt: 'Tree Inventory 2' },
        { src: 'images/services/inventory-3.jpg', alt: 'Tree Inventory 3' }
    ],
    'permitting': [
        { src: 'images/services/permitting-1.jpg', alt: 'Permitting Services 1' },
        { src: 'images/services/permitting-2.jpg', alt: 'Permitting Services 2' },
        { src: 'images/services/permitting-3.jpg', alt: 'Permitting Services 3' }
    ],
    'other': [
        { src: 'images/services/other-1.jpg', alt: 'Other Services 1' },
        { src: 'images/services/other-2.jpg', alt: 'Other Services 2' },
        { src: 'images/services/other-3.jpg', alt: 'Other Services 3' }
    ]
};

// Gallery state
let currentGallery = null;
let currentIndex = 0;
let slideshowInterval = null;
const SLIDESHOW_DELAY = 5000; // 5 seconds between slides

// Service slideshow state
let serviceSlideshows = {};

// DOM Elements
const modal = document.querySelector('.gallery-modal');
const modalImage = modal.querySelector('img');
const thumbnailsContainer = modal.querySelector('.gallery-thumbnails');
const prevButton = modal.querySelector('.gallery-prev');
const nextButton = modal.querySelector('.gallery-next');
const closeButton = modal.querySelector('.gallery-close');

// Initialize service slideshows
function initServiceSlideshows() {
    document.querySelectorAll('.service-slideshow').forEach(slideshow => {
        const images = slideshow.querySelectorAll('img');
        const serviceType = slideshow.parentElement.dataset.gallery;
        let currentIndex = 0;

        // Store slideshow state
        serviceSlideshows[serviceType] = {
            images,
            currentIndex,
            interval: null
        };

        // Start slideshow
        startServiceSlideshow(serviceType);
    });
}

// Start service slideshow
function startServiceSlideshow(serviceType) {
    const slideshow = serviceSlideshows[serviceType];
    if (!slideshow) return;

    // Clear existing interval
    if (slideshow.interval) {
        clearInterval(slideshow.interval);
    }

    // Set new interval
    slideshow.interval = setInterval(() => {
        const { images, currentIndex } = slideshow;
        
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        slideshow.currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to new image
        images[slideshow.currentIndex].classList.add('active');
    }, 3000); // Change image every 3 seconds
}

// Stop service slideshow
function stopServiceSlideshow(serviceType) {
    const slideshow = serviceSlideshows[serviceType];
    if (slideshow && slideshow.interval) {
        clearInterval(slideshow.interval);
        slideshow.interval = null;
    }
}

// Initialize gallery
function initGallery() {
    // Initialize service slideshows
    initServiceSlideshows();

    // Add click handlers to service images
    document.querySelectorAll('.service-image').forEach(image => {
        image.addEventListener('click', () => {
            const galleryType = image.dataset.gallery;
            if (galleryData[galleryType]) {
                openGallery(galleryType);
            }
        });
    });

    // Add navigation handlers
    prevButton.addEventListener('click', () => {
        stopSlideshow();
        showPreviousImage();
    });
    nextButton.addEventListener('click', () => {
        stopSlideshow();
        showNextImage();
    });
    closeButton.addEventListener('click', closeGallery);

    // Close gallery on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGallery();
        } else if (e.key === 'ArrowLeft') {
            stopSlideshow();
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            stopSlideshow();
            showNextImage();
        }
    });

    // Close gallery on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGallery();
        }
    });
}

// Start slideshow
function startSlideshow() {
    stopSlideshow(); // Clear any existing interval
    slideshowInterval = setInterval(() => {
        const images = galleryData[currentGallery];
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateGallery();
    }, SLIDESHOW_DELAY);
}

// Stop slideshow
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Open gallery
function openGallery(galleryType) {
    currentGallery = galleryType;
    currentIndex = 0;
    updateGallery();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    startSlideshow();
}

// Close gallery
function closeGallery() {
    stopSlideshow();
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentGallery = null;
}

// Update gallery content
function updateGallery() {
    const images = galleryData[currentGallery];
    if (!images) return;

    // Update main image
    const currentImage = images[currentIndex];
    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.alt;

    // Update thumbnails
    thumbnailsContainer.innerHTML = '';
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.alt;
        thumbnail.classList.add('gallery-thumbnail');
        if (index === currentIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', () => {
            stopSlideshow();
            currentIndex = index;
            updateGallery();
            startSlideshow();
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Update navigation buttons
    prevButton.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
}

// Show previous image
function showPreviousImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
}

// Show next image
function showNextImage() {
    const images = galleryData[currentGallery];
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateGallery();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery); 
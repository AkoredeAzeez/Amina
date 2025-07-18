// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }

    // Close mobile nav when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            navToggle.classList.remove('open');
        });
    });

    // --- REFACTORING FOR MULTIPLE SLIDESHOWS START ---

    // Function to initialize a background slideshow
    function initializeBackgroundSlideshow(containerSelector, imagesArray, intervalTime = 5000) {
        const slideshowContainer = document.querySelector(containerSelector);

        if (!slideshowContainer) {
            console.warn(`Slideshow container not found for selector: ${containerSelector}`);
            return;
        }

        const imgElements = [];

        // Create and append image elements
        imagesArray.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Background slide ${index + 1}`;
            img.loading = 'lazy';

            // Make first image active
            if (index === 0) {
                img.classList.add('active-slide');
            }

            slideshowContainer.appendChild(img);
            imgElements.push(img); // Store reference to the img element
        });

        // Slideshow functionality
        let currentSlide = 0;

        function nextSlide() {
            if (imgElements.length === 0) return; // Prevent errors if no images

            // Remove active class from current slide
            imgElements[currentSlide].classList.remove('active-slide');

            // Move to next slide
            currentSlide = (currentSlide + 1) % imgElements.length;

            // Add active class to new slide
            imgElements[currentSlide].classList.add('active-slide');
        }

        // Change slide every X seconds
        setInterval(nextSlide, intervalTime);
    }

    // Initialize Hero Section Slideshow
    const heroBackgroundImages = [
        './backgrounds/1.jpg', // Ensure these paths are correct for your hero
        './backgrounds/2.jpg',
        './backgrounds/3.jpg',
        './backgrounds/4.jpg',
        './backgrounds/5.jpg',
        './backgrounds/6.jpg',
        './backgrounds/7.jpg'
        // Add more hero background images if you have them
    ];
    // Use the specific selector for the hero's slideshow
    initializeBackgroundSlideshow('.hero-section .background-slideshow', heroBackgroundImages, 5000);

    // Initialize Vision Section Slideshow
    const visionBackgroundImages = [
        './backgrounds/20.jpg', // 👈 REPLACE with actual paths for VISION background images
        './backgrounds/21.jpg', // e.g., './backgrounds/vision_img_01.jpg'
        './backgrounds/22.jpg',
        './backgrounds/23.jpg', 
        './backgrounds/24.jpg', 
        './backgrounds/25.jpg',
        './backgrounds/26.jpg', 
        './backgrounds/27.jpg',
        './backgrounds/28.jpg'   // Make sure these images exist!
        // Add more vision background images as needed
    ];
    // Use the specific selector for the vision's slideshow
    initializeBackgroundSlideshow('.vision-section .background-slideshow', visionBackgroundImages, 7000); // Different interval for variety

    // --- REFACTORING FOR MULTIPLE SLIDESHOWS END ---

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Animate child elements with delay
                const childElements = entry.target.querySelectorAll('.story-item, .vision-point, .manifesto-item');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('is-visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all animated sections
    const animatedSections = document.querySelectorAll('.animated-section');
    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('open');
        });

        // Close nav when a link is clicked (for smooth scrolling)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('open');
                }
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const sectionsToAnimate = document.querySelectorAll('.story-item, .vision-point, .manifesto-item');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const sectionObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for internal links
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

    // Basic Form Submission (replace with actual backend logic)
    const emailSignupForm = document.querySelector('.email-signup');
    if (emailSignupForm) {
        emailSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for signing up for updates!');
            this.reset(); // Clear the form
            // In a real application, you'd send this data to your CRM/email list
        });
    }

    // Background Slideshow Logic
    function setupBackgroundSlideshow() {
        const slideshowContainer = document.querySelector('.background-slideshow');
        if (!slideshowContainer) {
            console.log('Slideshow container not found');
            return;
        }

        // Get all img elements inside the slideshow container
        const slides = slideshowContainer.querySelectorAll('img');
        console.log('Found slides:', slides.length);
        
        if (slides.length <= 1) {
            if (slides.length === 1) slides[0].classList.add('active-slide');
            return;
        }

        let currentSlide = 0;
        
        // Ensure first slide is active, others are not
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });

        // Start slideshow
        setInterval(() => {
            slides[currentSlide].classList.remove('active-slide');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active-slide');
            console.log('Switched to slide:', currentSlide);
        }, 4000); // Change slide every 4 seconds
    }

    // Initialize slideshow
    setupBackgroundSlideshow();
});
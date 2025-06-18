import { testimonialCarousel } from './sections/carousel.js';
import { utils } from './utils.js';

// Scroll animations handler
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initVinylPlayer () {
    // Initialisation du lecteur vinyle
    const player = vinylPlayer();
    player.init();

    // Bouton Lecture/Pause
    const toggleBtn = document.getElementById('btn-toggle-play');
    toggleBtn.addEventListener('click', () => {
        player.togglePlay();
        player.handleEasterEggClick();
    });

    // Contrôle du volume
    const volumeSlider = document.getElementById('volume-control');
    volumeSlider.addEventListener('input', (event) => {
        player.setVolume(event.target.value);
    });

    window.addEventListener('beforeunload', () => {
        player.cleanup();
    });
    
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load content
    loadSkills();
    loadProjects();
    loadExperiences();
    loadHobbies();
    loadTestimonials();

    // Initialize features
    handleScrollAnimations();
    initSmoothScroll();
    initVinylPlayer();
    
    // Add loading animation to fade-in elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Export utils for potential use in other scripts
window.portfolioUtils = utils;
window.testimonialCarousel = testimonialCarousel;
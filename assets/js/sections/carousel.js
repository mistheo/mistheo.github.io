// Alpine.js Carousel Component for Testimonials
function testimonialCarousel() {
    return {
        currentSlide: 0,
        get totalSlides() {
            return testimonialsData ? testimonialsData.length : 1;
        },
        init() {
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
                if (e.key === 'ArrowRight') this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                if (e.key === ' ') e.preventDefault();
            });
        },
        goToSlide(index) {
            this.currentSlide = index;
        },
    }
}

export { testimonialCarousel };
function loadTestimonials() {
    const container = document.getElementById('testimonials-content');
    const template = document.getElementById('testimonial-card-template');
    if (!container || !template || typeof testimonialsData === 'undefined') return;

    container.innerHTML = '';

    testimonialsData.forEach((testimonial, index) => {
        const clone = template.content.cloneNode(true);
        const slide = clone.children[0];
        slide.classList.add('testimonial-slide');
        slide.setAttribute('data-index', index);

        slide.querySelector('.testimonial-avatar').src = testimonial.avatar;
        slide.querySelector('.testimonial-avatar').alt = testimonial.name;
        slide.querySelector('.testimonial-name').textContent = testimonial.name;
        slide.querySelector('.testimonial-role').textContent = testimonial.role;
        slide.querySelector('.testimonial-company').textContent = testimonial.company;
        slide.querySelector('.testimonial-text').textContent = testimonial.text;

        container.appendChild(slide);
    });
}

export { loadTestimonials };
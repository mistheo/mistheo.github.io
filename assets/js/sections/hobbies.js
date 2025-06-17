function loadHobbies() {
    const container = document.getElementById('hobbies-content');
    const template = document.getElementById('hobby-card-template');
    if (!container || !template || typeof hobbiesData === 'undefined') return;

    container.innerHTML = '';

    hobbiesData.forEach((hobby, index) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.hobby-icon').textContent = hobby.icon;
        clone.querySelector('.hobby-name').textContent = hobby.name;
        clone.querySelector('.hobby-description').textContent = hobby.description;
        clone.querySelector('.hobby-details').innerHTML = hobby.details;

        clone.children[0].style.animationDelay = `${index * 0.1}s`;

        container.appendChild(clone);
    });
}

export { loadHobbies };
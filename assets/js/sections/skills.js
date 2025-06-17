function loadSkills() {
    const container = document.getElementById('skills-content');
    const template = document.getElementById('skill-category-template');
    if (!container || !template || typeof skillsData === 'undefined') return;

    container.innerHTML = '';

    Object.values(skillsData).forEach((category, index) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.skill-icon').textContent = category.icon;
        clone.querySelector('.skill-title').textContent = category.title;

        const skillList = clone.querySelector('.skill-list');
        category.skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'flex justify-between items-center';
            skillDiv.innerHTML = `
                <span class="font-medium">${skill.name}</span>
                <span class="text-sm ${skill.color} text-cream px-2 py-1 rounded-full">${skill.level}</span>
            `;
            skillList.appendChild(skillDiv);
        });

        // Optionnel : animation delay
        clone.children[0].style.animationDelay = `${index * 0.2}s`;

        container.appendChild(clone);
    });
}

export { loadSkills };
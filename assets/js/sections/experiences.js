function loadExperiences() {
    const container = document.getElementById('experiences-content');
    if (!container || typeof experiencesData === 'undefined') return;
    
    container.innerHTML = '';
    
    // Section Expérience Professionnelle
    const professionalDiv = document.createElement('div');
    professionalDiv.className = 'experiences-section fade-in';
    professionalDiv.innerHTML = `
        <div class="section-header">
            <h3 class="section-title font-bebas text-3xl text-orange mb-8">
                EXPÉRIENCE PROFESSIONNELLE
            </h3>
        </div>
        
        <div class="experience-grid space-y-8">
            ${experiencesData.professional.map(exp => `
                <article class="experience-card bg-cream p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange">
                    <header class="experience-header mb-6">
                        <h4 class="experience-title font-montserrat font-bold text-xl text-bordeaux mb-3 leading-tight">
                            ${exp.title}
                        </h4>
                        <div class="experience-meta flex flex-col sm:flex-row sm:items-center mb-4">
                            <span class="period-badge bg-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                                ${exp.period}
                            </span>
                            <span class="company-name text-bordeaux font-medium text-lg">
                                ${exp.company}
                            </span>
                        </div>
                    </header>
                    
                    <div class="experience-content">
                        <ul class="task-list text-gray-700 leading-relaxed">
                            ${exp.tasks.map(task => `
                                <li class="task-item flex items-start">
                                    <span class="task-bullet w-2 h-2 bg-orange rounded-full flex-shrink-0"></span>
                                    <span class="task-text">${task}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
    
    // Section Formation Académique
    const academicDiv = document.createElement('div');
    academicDiv.className = 'experiences-section fade-in mt-16';
    academicDiv.innerHTML = `
        <div class="section-header">
            <h3 class="section-title font-bebas text-3xl text-orange mb-8">
                FORMATION ACADÉMIQUE
            </h3>
        </div>
        
        <div class="education-grid space-y-8">
            ${experiencesData.academic.map(edu => `
                <article class="education-card bg-cream p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-mint-dark">
                    <header class="education-header mb-6">
                        <h4 class="education-title font-montserrat font-bold text-xl text-bordeaux mb-3 leading-tight">
                            ${edu.degree}
                        </h4>
                        <div class="education-meta flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <span class="period-badge bg-mint-dark text-white px-4 py-2 rounded-full text-sm font-semibold">
                                ${edu.period}
                            </span>
                            <span class="institution-name text-bordeaux font-medium text-lg">
                                ${edu.institution}
                            </span>
                        </div>
                    </header>
                    
                    <div class="education-content">
                        <p class="description text-gray-700 leading-relaxed text-base">
                            ${edu.description}
                        </p>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
    
    // Animation séquentielle des éléments
    container.appendChild(professionalDiv);
    container.appendChild(academicDiv);
    
    // Déclencher les animations après un court délai
    setTimeout(() => {
        professionalDiv.classList.add('animate-in');
        setTimeout(() => {
            academicDiv.classList.add('animate-in');
        }, 200);
    }, 100);
}

export { loadExperiences };
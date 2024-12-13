import { images, navigate } from '../main.js';

export function renderGalleryPage(container) {
    container.innerHTML = `
        <header class="header">
            <div class="header-content">
                <h1>
                    <i class="fas fa-palette icon"></i>
                    ARt Journey
                </h1>
            </div>
        </header>
        <div class="image-grid">
            ${images.map(image => `
                <div class="image-card" data-id="${image.id}">
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers to images
    const imageCards = container.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('click', () => navigate('ar'));
    });
}
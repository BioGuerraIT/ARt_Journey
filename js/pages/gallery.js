import { images, navigate } from '../main.js';

export function renderGalleryPage(container) {
    // Add console.log to debug
    console.log('Rendering gallery with images:', images);
    
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
                    <img src="${image.imageUrl}" alt="${image.name}" loading="lazy">
                    <div class="image-title">${image.name}</div>
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers to images
    const imageCards = container.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            const image = images.find(img => img.id === card.dataset.id);
            if (image && image.markerUrl && image.videoUrl) {
                sessionStorage.setItem('mindFileUrl', image.markerUrl);
                sessionStorage.setItem('targetImageUrl', image.imageUrl);
                sessionStorage.setItem('videoUrl', image.videoUrl);
                navigate('ar');
            } else {
                console.log('This image does not have AR content yet');
                alert('This image does not have AR content yet');
            }
        });
    });
}
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
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers to images
    const imageCards = container.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Image card clicked');
            // For testing, let's use a sample video URL
            sessionStorage.setItem('mindFileUrl', 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind');
            sessionStorage.setItem('targetImageUrl', card.querySelector('img').src);
            sessionStorage.setItem('videoUrl', 'https://faas-output-video.s3.ap-southeast-1.amazonaws.com/prod/f21d32ff-f125-4780-82ee-211656fe8663/30bd3d708ab34e2d98572334e725e72b.mp4');
            navigate('ar');
        });
    });
}
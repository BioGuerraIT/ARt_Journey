import { renderGalleryPage } from './pages/gallery.js';
import { renderCreatePage } from './pages/create.js';
import { renderARPage } from './pages/ar.js';

// Sample images data (in a real app, this would come from an API)
export const images = [
    { id: 1, url: 'https://picsum.photos/500/300?random=1', title: 'Image 1' },
    { id: 2, url: 'https://picsum.photos/500/300?random=2', title: 'Image 2' },
    { id: 3, url: 'https://picsum.photos/500/300?random=3', title: 'Image 3' },
    { id: 4, url: 'https://picsum.photos/500/300?random=4', title: 'Image 4' },
    { id: 5, url: 'https://picsum.photos/500/300?random=5', title: 'Image 5' },
    { id: 6, url: 'https://picsum.photos/500/300?random=6', title: 'Image 6' },
];

// Router function
export function navigate(page) {
    console.log('Navigating to:', page);
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });

    const app = document.querySelector('#app');
    
    switch (page) {
        case 'gallery':
            renderGalleryPage(app);
            break;
        case 'create':
            renderCreatePage(app);
            break;
        case 'ar':
            renderARPage();
            break;
        default:
            renderGalleryPage(app);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    if (!app) {
        console.error('App container not found');
        return;
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => navigate(btn.dataset.page));
    });

    // Initial render
    navigate('gallery');
});
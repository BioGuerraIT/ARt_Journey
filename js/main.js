import { renderGalleryPage } from './pages/gallery.js';
import { renderCreatePage } from './pages/create.js';
import { renderARPage } from './pages/ar.js';

// Import art data
import artData from '../art_data.json';

// Export the art items for use in other modules
export const images = artData.items;

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
// Import art data
import artData from '../art_data.json';

// Export the art items for use in other modules
export const images = artData.items;

// Navigation function
export function navigate(page) {
    window.location.href = page === 'ar' ? 'ar.html' : `#${page}`;
}

// Router function
function router() {
    const container = document.getElementById('app');
    const hash = window.location.hash || '#gallery';

    // Import and render the appropriate page
    switch (hash) {
        case '#gallery':
            import('./pages/gallery.js').then(module => {
                module.renderGalleryPage(container);
            });
            break;
        case '#create':
            import('./pages/create.js').then(module => {
                module.renderCreatePage(container);
            });
            break;
        default:
            navigate('gallery');
    }
}

// Initialize router
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
import { showLoadingSpinner, hideLoadingSpinner } from '../utils/ui.js';

export function renderARPage() {
    console.log('Rendering AR page...');
    showLoadingSpinner();
    
    const mindFileUrl = sessionStorage.getItem('mindFileUrl');
    const targetImageUrl = sessionStorage.getItem('targetImageUrl');
    
    console.log('Mind file URL:', mindFileUrl);
    console.log('Target image URL:', targetImageUrl);
    
    if (!mindFileUrl) {
        console.error('No mind file URL found');
        hideLoadingSpinner();
        return;
    }
    
    // Save current page state
    sessionStorage.setItem('lastPage', window.location.href);
    // Navigate to AR page with relative path
    window.location.href = 'ar.html'; // Remove the leading slash
    hideLoadingSpinner();
}
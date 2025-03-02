/**
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the main module
vi.mock('../js/main.js', () => ({
  navigate: vi.fn(),
  images: [
    { 
      id: '1', 
      name: 'Test Art 1', 
      imageUrl: '/images/test1.jpg',
      markerUrl: '/markers/test1.mind',
      videoUrl: '/videos/test1.mp4'
    },
    { 
      id: '2', 
      name: 'Test Art 2', 
      imageUrl: '/images/test2.jpg',
      markerUrl: '/markers/test2.mind',
      videoUrl: '/videos/test2.mp4'
    }
  ]
}));

// Import the gallery page and mocked main module
import { renderGalleryPage } from '../js/pages/gallery.js';
import { navigate, images } from '../js/main.js';

describe('Gallery Page', () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = '<div id="app"></div>';
    
    // Clear mocks and storage
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test('renderGalleryPage should render the correct number of images', () => {
    const container = document.getElementById('app');
    renderGalleryPage(container);
    
    const imageCards = container.querySelectorAll('.image-card');
    expect(imageCards.length).toBe(2);
  });

  test('clicking an image should set session storage and navigate to AR page', () => {
    const container = document.getElementById('app');
    renderGalleryPage(container);
    
    // Simulate clicking on the first image
    const firstImageCard = container.querySelector('.image-card[data-id="1"]');
    firstImageCard.click();
    
    // Check if session storage was set correctly
    expect(sessionStorage.getItem('mindFileUrl')).toBe('/markers/test1.mind');
    expect(sessionStorage.getItem('targetImageUrl')).toBe('/images/test1.jpg');
    expect(sessionStorage.getItem('videoUrl')).toBe('/videos/test1.mp4');
    
    // Check if navigate was called with 'ar'
    expect(navigate).toHaveBeenCalledWith('ar');
  });

  test('clicking an image without AR content should show an alert', () => {
    // Create a spy for the alert function
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Temporarily modify the mock data
    const originalMarkerUrl = images[0].markerUrl;
    const originalVideoUrl = images[0].videoUrl;
    images[0].markerUrl = null;
    images[0].videoUrl = null;
    
    const container = document.getElementById('app');
    renderGalleryPage(container);
    
    // Simulate clicking on the first image (which now has no AR content)
    const firstImageCard = container.querySelector('.image-card[data-id="1"]');
    firstImageCard.click();
    
    // Check if alert was called
    expect(alertSpy).toHaveBeenCalledWith('This image does not have AR content yet');
    
    // Check that navigate was not called
    expect(navigate).not.toHaveBeenCalled();
    
    // Restore the original values
    images[0].markerUrl = originalMarkerUrl;
    images[0].videoUrl = originalVideoUrl;
    
    // Restore the original alert function
    alertSpy.mockRestore();
  });
}); 
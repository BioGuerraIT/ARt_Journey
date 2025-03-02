/**
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the page rendering functions
vi.mock('../js/pages/gallery.js', () => ({
  renderGalleryPage: vi.fn(),
}));

vi.mock('../js/pages/create.js', () => ({
  renderCreatePage: vi.fn(),
}));

vi.mock('../js/pages/tutorial.js', () => ({
  renderTutorialPage: vi.fn(),
}));

vi.mock('../js/pages/ar.js', () => ({
  renderARPage: vi.fn(),
}));

// Import the navigate function and mocked rendering functions
import { navigate } from '../js/main.js';
import { renderGalleryPage } from '../js/pages/gallery.js';
import { renderCreatePage } from '../js/pages/create.js';
import { renderTutorialPage } from '../js/pages/tutorial.js';
import { renderARPage } from '../js/pages/ar.js';

describe('Navigation', () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = `
      <main id="app"></main>
      <nav class="bottom-nav">
        <button class="nav-btn" data-page="gallery">Gallery</button>
        <button class="nav-btn" data-page="create">Create</button>
        <button class="nav-btn" data-page="tutorial">Tutorial</button>
      </nav>
    `;
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  test('navigate function should set active class on the correct button', () => {
    // Navigate to gallery
    navigate('gallery');
    
    // Check if gallery button has active class
    const galleryButton = document.querySelector('[data-page="gallery"]');
    const createButton = document.querySelector('[data-page="create"]');
    const tutorialButton = document.querySelector('[data-page="tutorial"]');
    
    expect(galleryButton.classList.contains('active')).toBe(true);
    expect(createButton.classList.contains('active')).toBe(false);
    expect(tutorialButton.classList.contains('active')).toBe(false);
  });

  test('navigate function should call the correct render function', () => {
    // Navigate to gallery
    navigate('gallery');
    expect(renderGalleryPage).toHaveBeenCalled();
    
    // Navigate to create
    navigate('create');
    expect(renderCreatePage).toHaveBeenCalled();
    
    // Navigate to tutorial
    navigate('tutorial');
    expect(renderTutorialPage).toHaveBeenCalled();
    
    // Navigate to AR
    navigate('ar');
    expect(renderARPage).toHaveBeenCalled();
  });

  test('navigate function should default to gallery for unknown pages', () => {
    // Navigate to an unknown page
    navigate('unknown');
    expect(renderGalleryPage).toHaveBeenCalled();
  });
}); 
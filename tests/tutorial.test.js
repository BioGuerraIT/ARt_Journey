/**
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { renderTutorialPage } from '../js/pages/tutorial.js';

describe('Tutorial Page', () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = '<div id="app"></div>';
  });

  test('renderTutorialPage should render the tutorial sections', () => {
    const container = document.getElementById('app');
    renderTutorialPage(container);
    
    // Check if the tutorial header is rendered
    const header = container.querySelector('h1');
    expect(header.textContent.trim()).toContain('How to Use ARt Journey');
    
    // Check if all tutorial sections are rendered
    const sections = container.querySelectorAll('.tutorial-section');
    expect(sections.length).toBe(3); // Gallery, Create, and Tips sections
    
    // Check if Gallery section is rendered correctly
    const gallerySection = sections[0];
    expect(gallerySection.querySelector('h2').textContent).toContain('Gallery Mode');
    const gallerySteps = gallerySection.querySelectorAll('.tutorial-step');
    expect(gallerySteps.length).toBe(3);
    
    // Check if Create section is rendered correctly
    const createSection = sections[1];
    expect(createSection.querySelector('h2').textContent).toContain('Create Mode');
    const createSteps = createSection.querySelectorAll('.tutorial-step');
    expect(createSteps.length).toBe(3);
    
    // Check if Tips section is rendered correctly
    const tipsSection = sections[2];
    expect(tipsSection.querySelector('h2').textContent).toContain('Tips');
    const tips = tipsSection.querySelectorAll('.tips-list li');
    expect(tips.length).toBeGreaterThan(0);
  });
}); 
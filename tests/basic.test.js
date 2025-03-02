/**
 * @jest-environment jsdom
 */

import { describe, test, expect } from 'vitest';

describe('Basic Test', () => {
  test('true should be true', () => {
    expect(true).toBe(true);
  });

  test('DOM manipulation works', () => {
    document.body.innerHTML = '<div id="test">Test</div>';
    const element = document.getElementById('test');
    expect(element.textContent).toBe('Test');
  });

  test('sessionStorage works', () => {
    sessionStorage.setItem('test', 'value');
    expect(sessionStorage.getItem('test')).toBe('value');
  });
}); 
'use strict';

export function sideMobileMenu() {
  const button = document.querySelector('[data-nav-side-button]');
  const nav = document.querySelector('[data-nav-side]');

  button.addEventListener('click', () => {
    button.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
}

'use strict';

export function menuMobile() {
  const buttons = document.querySelectorAll('[data-nav-toggle]');
  const nav = document.querySelector('[data-header-nav]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });
  });
}

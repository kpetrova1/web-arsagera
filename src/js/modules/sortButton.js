'use strict';

export function sortButton() {
  const buttons = document.querySelectorAll('[data-sort-button]');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      button.querySelector('svg').classList.toggle('is-inverted');
    });
  });
}

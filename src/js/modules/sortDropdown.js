'use strict';

export function sortDropdown() {
  const button = document.querySelector('[data-action-dropdown-toggle]');
  const actionButtons = document.querySelectorAll('[data-action-dropdown-button]');
  const selects = document.querySelectorAll('[data-sort-button]');
  const dropdown = button.nextElementSibling;

  const toggleDropdown = () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', (!isExpanded).toString());
    dropdown.classList.toggle('is-active');
  };

  selects.forEach((select) => {
    select.addEventListener('change', function () {
      button.querySelector('span').textContent = select.querySelector('span').textContent;

      if (window.innerWidth >= 768) {
        toggleDropdown();
      }
    });
  });

  button.addEventListener('click', toggleDropdown);

  actionButtons.forEach((button) => button.addEventListener('click', toggleDropdown));
}

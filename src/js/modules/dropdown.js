'use strict';

export function dropdown(dataButton) {
  const button = document.querySelector(dataButton);
  const dropdown = button.nextElementSibling;

  if (!button || !dropdown) return;

  const toggleDropdown = () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', (!isExpanded).toString());
    dropdown.classList.toggle('is-active');
  };

  const closeOnClickOutside = (event) => {
    if (!event.target.matches(dataButton) && dropdown.classList.contains('is-active')) {
      button.setAttribute('aria-expanded', 'false');
      dropdown.classList.toggle('is-active');
    }
  };

  button.addEventListener('click', toggleDropdown);
  document.addEventListener('click', closeOnClickOutside);
}

'use strict';

export function menuDropdown() {
  const navLinks = document.querySelectorAll('[data-menu-dropdown-link]');
  let isMobile = window.matchMedia('(max-width: 768px)').matches;

  navLinks.forEach((link) => {
    if (isMobile) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        toggleDropdown(link, dropdown);
      });
    }

    link.addEventListener('mouseenter', function () {
      if (!isMobile) {
        const dropdown = this.nextElementSibling;
        toggleDropdown(link, dropdown);
      }
    });

    link.addEventListener('mouseleave', function () {
      if (!isMobile) {
        const dropdown = this.nextElementSibling;
        toggleDropdown(link, dropdown);
      }
    });
  });

  const toggleDropdown = (link, dropdown) => {
    const isExpanded = link.getAttribute('aria-expanded') === 'true';
    link.setAttribute('aria-expanded', (!isExpanded).toString());
    dropdown.classList.toggle('is-active');
  };

  window.addEventListener('resize', function () {
    isMobile = window.matchMedia('(max-width: 768px)').matches;
  });
}

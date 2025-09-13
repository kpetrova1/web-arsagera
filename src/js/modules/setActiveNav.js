'use strict';

export function setActiveNav() {
  const nav = document.querySelector('[data-header-nav]');
  const path = window.location.pathname;
  const links = nav.querySelectorAll('a');

  links.forEach((link) => {
    link.classList.remove('is-active');

    const url = new URL(link.href);
    const linkPath = url.pathname;

    if (linkPath === path) {
      link.classList.add('is-active');
    }
  });
}

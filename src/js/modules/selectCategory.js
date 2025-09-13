'use strict';

export function selectCategory(buttonData, linkData) {
  const button = document.querySelector(buttonData);
  const links = document.querySelectorAll(linkData);
  const dropdown = button.nextElementSibling;

  let prevItem = dropdown.querySelector('.is-hidden');

  links.forEach((link) => {
    const item = link.parentElement;

    link.addEventListener('click', function () {
      if (prevItem) {
        prevItem.classList.remove('is-hidden');
      }
      item.classList.add('is-hidden');
      button.querySelector('span').textContent = link.textContent;
      prevItem = item;
    });
  });
}

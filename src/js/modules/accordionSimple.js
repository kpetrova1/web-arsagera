'use strict';

export function accordionSimple(container, btn) {
  const accordionBlock = document.querySelectorAll(container);

  if (!accordionBlock.length > 0) {
    return;
  }

  accordionBlock.forEach((el) => {
    const accordionBtn = el.querySelector(btn);

    accordionBtn.addEventListener('click', function (e) {
      el.classList.toggle('is-open');
    });
  });
}

'use strict';

import { ScrollLock } from './scrollLock.js';

export function modal() {
  const scrollLock = new ScrollLock();
  let prevModal = null;
  const modalForms = document.querySelectorAll('[data-modal-form]');

  document.addEventListener('click', function (e) {
    const button = e.target.closest('[data-modal-button]');
    if (!button) return;

    const form = button.closest('form');
    if (form) {
      e.preventDefault();
    }

    const id = button.getAttribute('data-modal-button');

    const modal = document.querySelector(`#${id}`);
    if (!modal) return;

    if (prevModal && prevModal !== modal) {
      prevModal.classList.add('is-hidden');
    }

    const isHidden = modal.classList.toggle('is-hidden');
    isHidden ? scrollLock.enable() : scrollLock.disable();
    prevModal = isHidden ? null : modal;
  });

  modalForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.nextElementSibling;
      form.classList.add('is-hidden');
      feedback.classList.remove('is-hidden');
    });
  });
}

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

    if (!modal.classList.contains('is-hidden')) {
      cleanupModal(modal);
    }

    if (prevModal && prevModal !== modal) {
      prevModal.classList.add('is-hidden');
      cleanupModal(prevModal);
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

function cleanupModal(modal) {
  const form = modal.querySelector('form');
  if (!form) return;

  const feedback = form.nextElementSibling;

  form.reset();

  form.querySelectorAll('.field-error, .field_error').forEach((el) => {
    el.classList.remove('field-error', 'field_error');
  });
  form.querySelectorAll('.field__error-message').forEach((el) => el.remove());
  const globalMsg = form.querySelector('.form-global-message');
  if (globalMsg) globalMsg.remove();

  form.classList.remove('is-hidden');

  if (feedback) {
    feedback.remove();
  }
}

'use strict';

export function poll() {
  const form = document.querySelector('[data-poll-form]');
  const button = document.querySelector('[data-poll-submit]');
  const result = document.querySelector('[data-poll-result]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.classList.add('is-voted');
    button.setAttribute('hidden', '');
    result.removeAttribute('hidden');
  });
}

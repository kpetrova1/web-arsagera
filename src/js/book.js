// Styles
import '/src/css/book.scss';

// Slider
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';

// Page scripts
import { tabs } from './modules/tabs.js';
import { accordionSimple } from './modules/accordionSimple.js';
import { autoResizeTextareas } from './modules/autoResizeTextareas.js';
import { commentAnswer } from './modules/commentAnswer.js';
import { commentEdit } from './modules/commentEdit.js';
import { createTooltip } from './modules/createTooltip.js';

document.addEventListener('DOMContentLoaded', function () {
  tabs();
  autoResizeTextareas();
  accordionSimple('[data-accordion-container]', '[data-accordion-button]', '[data-accordion-content]');

  const slider = document.querySelector('#slider');

  if (slider) {
    new Splide('#slider', {
      type: 'loop',
      gap: 8,
      speed: 300,
      fixedWidth: '195px',
      perPage: 4,
      arrows: true,
      pagination: false,
      padding: 16,
      breakpoints: {
        1000: { perPage: 3 },
        768: { perPage: 2 },
      },
    }).mount();
  }

  const commentSection = document.querySelector('[data-comments-section]');

  if (commentSection.classList.contains('is-auth')) {
    commentAnswer();
    commentEdit();
  }

  const authTooltipInner = `<div>Для того, чтобы оставить комментарий, необходимо <button type="button" class="link link_orange link_size-small" data-modal-button="modal-auth">авторизоваться</button> или <button type="button" class="link link_orange link_size-small" data-modal-button="modal-registration">зарегистрироваться на сайте.</button></div>`;

  if (!commentSection.classList.contains('is-auth')) {
    createTooltip('data-auth-tooltip', authTooltipInner);
  }
});

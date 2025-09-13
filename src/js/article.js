// Styles
import '/src/css/article.scss';

// Page scripts
import { poll } from './modules/poll.js';
import { autoResizeTextareas } from './modules/autoResizeTextareas.js';
import { accordionSimple } from './modules/accordionSimple.js';
import { commentAnswer } from './modules/commentAnswer.js';
import { commentEdit } from './modules/commentEdit.js';
import { createTooltip } from './modules/createTooltip.js';

document.addEventListener('DOMContentLoaded', function () {
  poll();
  autoResizeTextareas();
  accordionSimple('[data-accordion-container]', '[data-accordion-button]', '[data-accordion-content]');

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

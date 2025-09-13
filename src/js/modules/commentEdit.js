'use strict';

import { autoResizeTextareas } from './autoResizeTextareas.js';

export function commentEdit() {
  document.body.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-comment-edit') && !event.target.hasAttribute('data-form-added')) {
      const parentComment = event.target.closest('[data-comment]');
      console.log(parentComment);
      if (parentComment) {
        const commentTextElement = parentComment.querySelector('[data-comment-text]');
        if (commentTextElement) {
          const contentClone = commentTextElement.cloneNode(true).innerHTML;

          const templateElement = document.querySelector('[data-comment-template]');
          if (templateElement) {
            const formClone = templateElement.content.cloneNode(true);
            const textarea = formClone.querySelector('textarea');
            if (textarea) {
              const formattedContent = contentClone.replace(/\n/g, ' ').replace(/\s+/g, ' ');
              textarea.value = formattedContent;
            }
            parentComment.appendChild(formClone);
            autoResizeTextareas();
            event.target.setAttribute('data-form-added', 'true');
          }
        }
      }
    }
  });
}

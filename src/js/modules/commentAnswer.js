'use strict';

import { autoResizeTextareas } from './autoResizeTextareas.js';

export function commentAnswer() {
  document.body.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-comment-answer') && !event.target.hasAttribute('data-form-added')) {
      const parentComment = event.target.closest('[data-comment]');
      if (parentComment) {
        const commentTextElement = parentComment.querySelector('[data-comment-text]');
        if (commentTextElement) {
          const contentClone = commentTextElement.cloneNode(true);
          const blockquote = contentClone.querySelector('blockquote');
          if (blockquote) {
            blockquote.remove();
          }
          const newBlockquote = document.createElement('blockquote');
          newBlockquote.innerHTML = contentClone.innerHTML;

          const templateElement = document.querySelector('[data-comment-template]');
          if (templateElement) {
            const formClone = templateElement.content.cloneNode(true);
            const textarea = formClone.querySelector('textarea');
            if (textarea) {
              const formattedContent = newBlockquote.outerHTML.replace(/\n/g, ' ').replace(/\s+/g, ' ');
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

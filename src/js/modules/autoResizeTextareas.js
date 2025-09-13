'use strict';

export function autoResizeTextareas() {
  // Находим все элементы textarea с атрибутом data-comment-textarea
  const textareas = document.querySelectorAll('textarea[data-comment-textarea]');

  // Функция для изменения высоты textarea
  function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

    // Проверяем, превышает ли высота 600px и устанавливаем overflow: auto при необходимости
    if (this.scrollHeight > 600) {
      this.style.overflowY = 'auto';
    } else {
      this.style.overflowY = 'hidden'; // Возвращаем к стандартному поведению, если высота меньше 600px
    }
  }

  // Применяем функцию autoResize ко всем найденным textarea
  textareas.forEach((textarea) => {
    textarea.addEventListener('input', autoResize);
    // Инициализация высоты при загрузке страницы, если textarea уже содержит текст
    autoResize.call(textarea);
  });
}

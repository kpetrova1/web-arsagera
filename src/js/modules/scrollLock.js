'use strict';

export class ScrollLock {
  constructor() {
    this.scrollY = 0;
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  getScrollbarWidth() {
    // Создаем временный элемент для измерения ширины скроллбара
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  disable() {
    this.scrollY = window.scrollY;

    // Добавляем класс для скрытия скролла
    document.body.classList.add('body-locked');

    // Компенсируем ширину скроллбара чтобы контент не дергался
    document.body.style.paddingRight = `${this.scrollbarWidth}px`;

    // Фиксируем позицию скролла
    document.body.style.top = `-${this.scrollY}px`;
  }

  enable() {
    // Убираем все стили
    document.body.classList.remove('body-locked');
    document.body.style.paddingRight = '';

    // Восстанавливаем позицию скролла
    const scrollY = parseInt(document.body.style.top || '0');
    document.body.style.top = '';
    window.scrollTo(0, Math.abs(scrollY));
  }
}

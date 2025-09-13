'use strict';

export function countdown() {
  const hoursElements = document.querySelectorAll('[data-hours]');
  const minutesElements = document.querySelectorAll('[data-minutes]');
  const secondsElements = document.querySelectorAll('[data-seconds]');
  const wrapper = document.querySelector('[data-limit]');
  const hoursLimit = parseInt(wrapper.getAttribute('data-limit'));

  let totalMilliseconds = hoursLimit * 60 * 1000;

  function updateCountdown() {
    if (totalMilliseconds <= 0) {
      clearInterval(timer);
      return;
    }

    totalMilliseconds -= 1000;

    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

    // Форматируем значения для отображения
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Обновляем часы
    hoursElements[0].textContent = formattedHours[0];
    hoursElements[1].textContent = formattedHours[1];

    // Обновляем минуты
    minutesElements[0].textContent = formattedMinutes[0];
    minutesElements[1].textContent = formattedMinutes[1];

    // Обновляем секунды
    secondsElements[0].textContent = formattedSeconds[0];
    secondsElements[1].textContent = formattedSeconds[1];
  }

  // Запускаем таймер сразу и обновляем каждую секунду
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

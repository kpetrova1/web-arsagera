'use strict';

export function createTooltip(dataAttribute, html) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('custom-tooltip');
  tooltip.innerHTML = html;
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  const elements = document.querySelectorAll(`[${dataAttribute}]`);

  elements.forEach((element) => {
    element.addEventListener('click', function (event) {
      const rect = event.target.getBoundingClientRect();
      tooltip.style.position = 'absolute';
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
      tooltip.style.display = 'block';

      document.addEventListener('click', function closeTooltip(e) {
        if (!tooltip.contains(e.target) && e.target !== element) {
          tooltip.style.display = 'none';
          document.removeEventListener('click', closeTooltip);
        }
      });
    });
  });

  window.addEventListener('resize', function () {
    tooltip.style.display = 'none';
  });
}

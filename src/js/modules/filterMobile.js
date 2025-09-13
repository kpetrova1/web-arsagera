'use strict';

export function filterMobile() {
  const selectedFilterList = document.querySelector('[data-filter-selected]');

  document.querySelectorAll('[data-all-checkbox]').forEach((allCheckbox) => {
    allCheckbox.addEventListener('change', function () {
      const groupName = this.getAttribute('name');
      const checkboxes = document.querySelectorAll(`[name="${groupName}"][data-checkbox]`);

      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });

      updateSelectedFilters();
    });
  });

  document.querySelectorAll('[data-checkbox]').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const groupName = this.getAttribute('name');
      const allCheckbox = document.querySelector(`[name="${groupName}"][data-all-checkbox]`);
      const checkboxes = document.querySelectorAll(`[name="${groupName}"][data-checkbox]`);

      const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
      const noneChecked = Array.from(checkboxes).every((cb) => !cb.checked);

      if (allChecked) {
        allCheckbox.checked = true;
      } else if (noneChecked) {
        allCheckbox.checked = false;
      } else {
        allCheckbox.indeterminate = true;
      }

      updateSelectedFilters();
    });
  });

  function updateSelectedFilters() {
    selectedFilterList.innerHTML = '';

    const checkedItems = document.querySelectorAll('[data-checkbox]:checked');

    checkedItems.forEach((item) => {
      const label = item.nextElementSibling.textContent;
      const group = item.getAttribute('name');

      const li = document.createElement('li');
      li.className = 'selected-filter__item';
      li.innerHTML = `
        <span>${label}</span>
        <button class="selected-filter__remove-button" type="button" aria-label="Удалить фильтр" data-remove-filter="${group}:${label}">
          <svg viewBox="0 0 22 22" width="22" height="22">
            <use href="/sprite.svg#cross-icon-2" x="0" y="0"></use>
          </svg>
        </button>
      `;

      selectedFilterList.appendChild(li);
    });

    const badge = document.querySelector('[data-counter]');
    if (checkedItems.length > 0) {
      badge.textContent = checkedItems.length;
      badge.classList.remove('is-hidden');
    } else {
      badge.classList.add('is-hidden');
    }
  }

  selectedFilterList.addEventListener('click', function (e) {
    if (e.target.closest('[data-remove-filter]')) {
      const filterData = e.target.closest('[data-remove-filter]').getAttribute('data-remove-filter');
      const [group, label] = filterData.split(':');

      const checkboxes = document.querySelectorAll(`[name="${group}"][data-checkbox]`);
      checkboxes.forEach((checkbox) => {
        if (checkbox.nextElementSibling.textContent === label) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    }
  });
}

const form = document.querySelector('[data-modal-faq-form]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    clearErrors(form); // удаляем старые ошибки

    const formData = new FormData(form);

    try {
        const response = await fetch('/faq/store-test', {
            method: 'POST',
            body: formData,
        });

        // 202 — успех
        if (response.status === 202) {
            showSuccess(form, 'Ваш вопрос отправлен!');
            form.reset();
            return;
        }

        // 422 — ошибки валидации
        if (response.status === 422) {
            const data = await response.json();
            applyValidationErrors(form, data.errors);
            return;
        }

        // 500
        if (response.status >= 500) {
            showGlobalError(form, 'Что-то пошло не так. Попробуйте чуть позже.');
        }

    } catch (e) {
        showGlobalError(form, 'Ошибка сети. Попробуйте позже.');
    }
});

// Подписываем ошибки
function applyValidationErrors(form, errors) {
    Object.keys(errors).forEach((key) => {
        const messages = errors[key]; // массив строк
        const field = findFieldByName(form, key);
        if (field) showFieldError(field, messages[0]);
    });
}

function findFieldByName(form, name) {
    return form.querySelector(`[name="${name}"]`);
}

function showFieldError(input, message) {
    input.classList.add('field_error');

    const errorEl = document.createElement('div');
    errorEl.className = 'field__error-message';
    errorEl.textContent = message;

    input.insertAdjacentElement('afterend', errorEl);
}

// Очистка старых ошибок
function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
    form.querySelectorAll('.field-error-message').forEach((el) => el.remove());
    const globalMessage = form.querySelector('.form-global-message');
    if (globalMessage) globalMessage.remove();
}

// Глобальное сообщение (успех/ошибка)
function showSuccess(form, message) {
    form.innerHTML = `
    <div class="form-success">
      <p>${message}</p>
    </div>
  `;
}

function showGlobalError(form, message) {
    const msg = document.createElement('div');
    msg.className = 'form-global-message';
    msg.textContent = message;
    form.prepend(msg);
}

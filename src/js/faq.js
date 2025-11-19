// Styles
import '/src/css/faq.scss';

// Page scripts
import { accordion } from './modules/accordion.js';
import { tabs } from './modules/tabs.js';
import './modules/faq-form.js';

document.addEventListener('DOMContentLoaded', function () {
  tabs();
  accordion();
});

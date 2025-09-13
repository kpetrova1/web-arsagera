// Styles
import '/src/css/calculation.scss';

// Page scripts
import { accordion } from './modules/accordion.js';
import { tabs } from './modules/tabs.js';

document.addEventListener('DOMContentLoaded', function () {
  tabs();
  accordion();
});

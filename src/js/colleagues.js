// Styles
import '/src/css/colleagues.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { accordion } from './modules/accordion.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  accordion();
});

// Styles
import '/src/css/account-management.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { tabs } from './modules/tabs.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  tabs();
});

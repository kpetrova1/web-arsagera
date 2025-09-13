// Styles
import '/src/css/news-article.scss';

// Page scripts
import { checkTableScroll } from './modules/checkTableScroll.js';
import { tableDrag } from './modules/tableDrag.js';

document.addEventListener('DOMContentLoaded', function () {
  checkTableScroll();
  tableDrag();
});

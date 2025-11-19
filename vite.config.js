import { resolve } from 'path';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, 'src/pages/404.html'),
        500: resolve(__dirname, 'src/pages/500.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        'account-management': resolve(__dirname, 'src/pages/account-management.html'),
        'account-promo': resolve(__dirname, 'src/pages/account-promo.html'),
        'account-settings': resolve(__dirname, 'src/pages/account-settings.html'),
        article: resolve(__dirname, 'src/pages/article.html'),
        articles: resolve(__dirname, 'src/pages/articles.html'),
        book: resolve(__dirname, 'src/pages/book.html'),
        calculation: resolve(__dirname, 'src/pages/calculation.html'),
        colleagues: resolve(__dirname, 'src/pages/colleagues.html'),
        faq: resolve(__dirname, 'src/pages/faq.html'),
        main: resolve(__dirname, 'src/pages/index.html'),
        lecture: resolve(__dirname, 'src/pages/lecture.html'),
        lectures: resolve(__dirname, 'src/pages/lectures.html'),
        log: resolve(__dirname, 'src/pages/log.html'),
        news: resolve(__dirname, 'src/pages/news.html'),
        'news-article': resolve(__dirname, 'src/pages/news-article.html'),
        'news-message': resolve(__dirname, 'src/pages/news-message.html'),
        product: resolve(__dirname, 'src/pages/product.html'),
        reports: resolve(__dirname, 'src/pages/reports.html'),
        search: resolve(__dirname, 'src/pages/search.html'),
        shareholders: resolve(__dirname, 'src/pages/shareholders.html'),
        stock: resolve(__dirname, 'src/pages/stock.html'),
        test: resolve(__dirname, 'src/pages/test.html'),
        'test-info': resolve(__dirname, 'src/pages/test-info.html'),
        'test-result': resolve(__dirname, 'src/pages/test-result.html'),
      },
    },
  },
  server: {
    proxy: {
      '/faq/store-test': {
        target: 'https://webhook.site/9077b924-317b-47a5-b7f3-f40c48f6de40',
        changeOrigin: true,
        rewrite: (path) => path.replace('/faq/store-test', '')
      }
    }
  }
});

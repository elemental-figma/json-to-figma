import { createRoot } from 'react-dom/client';
import { createElement } from 'react';

import App from './components/App';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-page');
  const root = createRoot(container);
  root.render(createElement(App, {}, null));
});
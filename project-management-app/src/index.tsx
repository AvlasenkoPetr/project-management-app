import App from './App';
import './assets/styles/styles.scss';
import { createRoot } from 'react-dom/client';
import Store from './store/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import './utilits/i18n';

const container = document.getElementById('app') as HTMLDivElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={Store()}>
    <Suspense fallback="LOADING">
      <App />
    </Suspense>
  </Provider>
);

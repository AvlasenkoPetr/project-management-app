import App from './App';
import './assets/styles/styles.scss';
import { createRoot } from 'react-dom/client';
import Store from './store/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import './utilits/i18n';
import { Loader } from './components/Loader/Loader';

const container = document.getElementById('app') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <Provider store={Store()}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>
);

import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import Store from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('app') as HTMLDivElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={Store()}>
    <App />
  </Provider>
);

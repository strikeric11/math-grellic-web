import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './features/app';
import 'overlayscrollbars/overlayscrollbars.css';
import 'cropperjs/dist/cropper.css';
import 'mathquill/build/mathquill.css';
import './assets/fonts/fonts.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

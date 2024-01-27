import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/main.css';
import { Providers } from '@/providers.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense>
      <BrowserRouter>
        <Providers>
          <App />
        </Providers>

        <Analytics />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);

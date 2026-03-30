import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </BrowserRouter>
)

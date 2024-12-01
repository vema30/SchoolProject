import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import UserProvider from './component/UseContext';
createRoot(document.getElementById('root')).render(
   <UserProvider>
   <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
</BrowserRouter>
   </UserProvider>
  


);

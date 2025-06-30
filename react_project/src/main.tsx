import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import RouteL from './routes';
import { RouterProvider } from 'react-router';
import { router } from './data-routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   {/* { <RouteL></RouteL> } */}
   { <RouterProvider router = {router}></RouterProvider> }
  </StrictMode>,
)

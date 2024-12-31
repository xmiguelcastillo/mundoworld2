import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Airport from './Airport.jsx';
import Results from './Results.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Test from './Test.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Ensure this is the root route
  },
  {
    path: "/airport",
    element: <Airport />, // Ensure this is the root route
  },
  {
    path: "/results",
    element: <Results />, // Ensure this is the root route
  },
  {
    path: "/register",
    element: <Register />, // Ensure this is the root route
  },
  {
    path: "/login",
    element: <Login />, // Ensure this is the root route
  },
  {
    path: "/test",
    element: <Test />, // Ensure this is the root route
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

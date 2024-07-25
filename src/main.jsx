import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MergeMultiplePDFs from './pages/MergeMultiplePDFs.jsx';
import MainPage from './pages/MainPage.jsx';
import PdfToWord from './pages/PdfToWord.jsx';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<MainPage />} />
    <Route path='Merge PDF' element={<MergeMultiplePDFs />} />
    <Route path='PDF to Word' element={<PdfToWord />} />



  </Route>
));

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

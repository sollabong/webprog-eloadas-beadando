import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Movies from './components/movies/movies.jsx';
import '../../../style/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Movies />
  </StrictMode>
);

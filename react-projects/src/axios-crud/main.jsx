import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MoviesAdvanced from './components/movies-advanced/movies-advanced.jsx';
import Header from '../shared-components/header/header.jsx';
import Footer from '../shared-components/footer/footer.jsx';
import '../../../style/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <main>
      <MoviesAdvanced />
    </main>
    <Footer />
  </StrictMode>
);

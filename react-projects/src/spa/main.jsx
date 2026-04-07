import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '../shared-components/header/header.jsx';
import Footer from '../shared-components/footer/footer.jsx';
import '../../../style/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <main>
      {/* <SpaContainer /> */}
    </main>
    <Footer />
  </StrictMode>
);

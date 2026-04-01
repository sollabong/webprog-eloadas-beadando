const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-names">
          <span className="footer-name">
            Sipos Gábor János <span className="footer-neptun"> RUG70U</span>
          </span>
          <span className="footer-name">
            Soltész-Kéri Gábor <span className="footer-neptun"> D0345Y</span>
          </span>
          <span className="footer-name">
            Takács Dániel Zoltán <span className="footer-neptun"> F5MJUS</span>
          </span>
        </div>

        <div className="footer-copyright">
          © {currentYear} Web programozás-1 Előadás Beadandó projektmunka - MInden jog fenntartva.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
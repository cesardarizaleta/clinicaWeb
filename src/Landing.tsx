
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Landing.css';
import ChatbotWidget from './ChatbotWidget';
import Home from './pages/Home';
import Terminos from './pages/Terminos';
import Propiedades from './pages/Propiedades';
import SobreNosotros from './pages/SobreNosotros';
import Servicios from './pages/Servicios';
import EquipoMedico from './pages/EquipoMedico';
import Contacto from './pages/Contacto';


const Landing: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú hamburguesa al navegar
  React.useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <div className="landing-container">
      {/* NAVBAR FIJO */}
      <nav className="navbar-fixed">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">Clínica San Rafael</Link>
          <button className="navbar-hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen(m => !m)}>
            ☰
          </button>
          <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
            <Link to="/" className="navbar-link">Inicio</Link>
            <Link to="/terminos" className="navbar-link">Términos</Link>
            <Link to="/propiedades" className="navbar-link">Propiedades</Link>
            <Link to="/sobre-nosotros" className="navbar-link">Sobre Nosotros</Link>
            <Link to="/servicios" className="navbar-link">Servicios</Link>
            <Link to="/equipo-medico" className="navbar-link">Equipo Médico</Link>
            <Link to="/contacto" className="navbar-link">Contacto</Link>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer" />
      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/equipo-medico" element={<EquipoMedico />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      {/* FAB y MODAL CHATBOT */}
      <button className="chatbot-fab" onClick={() => setShowChatbot(!showChatbot)} aria-label="Abrir chatbot">
        <span role="img" aria-label="chat">💬</span>
      </button>
      {showChatbot && (
        <div className="chatbot-modal chatbot-modal-clean">
          <div className="chatbot-modal-inner">
            <ChatbotWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

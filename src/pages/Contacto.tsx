// src/components/Contacto.tsx
import React from 'react';
import './Contacto.css';

// Datos de ejemplo para la sección de Contacto
const contactoData = {
  address: 'Avenida Bolivar Norte, Urbanización El Viñedo, Valencia, Carabobo, Venezuela.',
  phone: '+582418501111',
  whatsapp: '+584144141414',
  email: 'contacto@clinicasanrafael.com',
  socials: [
    { name: 'Instagram', url: 'https://instagram.com/clinicasanrafael', icon: '📸' },
    { name: 'Facebook', url: 'https://facebook.com/clinicasanrafael', icon: '👍' },
    { name: 'Twitter', url: 'https://twitter.com/sanrafael_ve', icon: '🐦' },
  ],
};

const Contacto: React.FC = () => {
  return (
    <div className="contacto-page-container">
      <header className="contacto-header">
        <h1 className="contacto-title">Contáctanos</h1>
        <p className="contacto-subtitle">
          Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros a través de los siguientes canales.
        </p>
      </header>

      <div className="contacto-main-content">
        <div className="contacto-info-section">
          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <div className="contact-details">
              <strong>Dirección</strong>
              <p>{contactoData.address}</p>
            </div>
          </div>
          <div className="contact-card">
            <span className="contact-icon">☎️</span>
            <div className="contact-details">
              <strong>Teléfono</strong>
              <a href={`tel:${contactoData.phone}`}>{contactoData.phone}</a>
            </div>
          </div>
          <div className="contact-card">
            <span className="contact-icon">💬</span>
            <div className="contact-details">
              <strong>WhatsApp</strong>
              <a href={`https://wa.me/${contactoData.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                {contactoData.whatsapp}
              </a>
            </div>
          </div>
          <div className="contact-card">
            <span className="contact-icon">✉️</span>
            <div className="contact-details">
              <strong>Email</strong>
              <a href={`mailto:${contactoData.email}`}>{contactoData.email}</a>
            </div>
          </div>
        </div>

        <div className="contacto-map-section">
          {/* Aquí puedes integrar un mapa de Google Maps u otro servicio */}
          <div className="map-placeholder">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4724.785072747541!2d-67.99507930000001!3d10.173007499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8067a143b25dd1%3A0x195b9496936d93ba!2sCentro%20Clinico%20San%20Rafael!5e1!3m2!1ses-419!2sve!4v1754675327649!5m2!1ses-419!2sve" width="600" height="450" style={{border:0}} loading="lazy"></iframe>
            
          </div>
        </div>
      </div>

      <div className="social-media-section">
        <p className="social-text">Síguenos en nuestras redes sociales para estar al tanto de todas nuestras novedades:</p>
        <div className="social-links-grid">
          {contactoData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
            >
              <span className="social-icon">{social.icon}</span>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacto;
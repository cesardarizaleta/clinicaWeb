// src/components/SobreNosotros.tsx
import React from 'react';
import './SobreNosotros.css';

interface AboutContent {
  description: string;
  mission: string;
  vision: string;
  values: string[];
  imageUrl: string;
}

const aboutContent: AboutContent = {
  description: 'En la Clínica San Rafael Valencia, nos dedicamos a ofrecer atención médica de excelencia con un enfoque humano y tecnológico. Nuestra historia se ha construido sobre los pilares de la dedicación, el profesionalismo y el compromiso inquebrantable con el bienestar de nuestros pacientes y la comunidad.',
  mission: 'Proveer servicios de salud integrales y de alta calidad, utilizando tecnología de vanguardia y un equipo humano altamente calificado, para mejorar la calidad de vida de nuestros pacientes.',
  vision: 'Ser la clínica de referencia en Valencia y el país, reconocida por nuestra excelencia médica, innovación continua y un servicio centrado en la empatía y el respeto por cada individuo.',
  values: [
    'Empatía y Humanismo',
    'Excelencia Médica',
    'Innovación',
    'Integridad',
  ],
  imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr-9-Y5v09X0iLF9_kHVSh6W5bHlrvo8T6ol3EprbrjzAoerADfMBWclFveGTUGv06cmZFBHOK4AVu_HFjC_yCfq8z2K4Dr3b4_H25LTw7UzZQ3w3dFbBhVP-p95cV1-qReRGV1=s680-w680-h510-rw',
};

const SobreNosotros: React.FC = () => {
  return (
    <div className="sobre-nosotros-page">
      <header className="page-header">
        <h1 className="page-title">Sobre Nosotros</h1>
        <p className="page-subtitle">Nuestra Historia, Compromiso y Futuro.</p>
      </header>

      <section className="about-main-section">
        <div className="about-text-content">
          <p className="about-description">
            {aboutContent.description}
          </p>
        </div>
          <img 
            src={aboutContent.imageUrl} 
            alt="Fachada de la Clínica San Rafael Valencia" 
            className="about-image"
          />
      </section>

      <section className="values-section">
        <div className="value-card-container">
          <div className="value-card mission-card">
            <span className="value-icon">🎯</span>
            <h3 className="value-title">Misión</h3>
            <p className="value-description">{aboutContent.mission}</p>
          </div>
          <div className="value-card vision-card">
            <span className="value-icon">🚀</span>
            <h3 className="value-title">Visión</h3>
            <p className="value-description">{aboutContent.vision}</p>
          </div>
        </div>

        <div className="values-grid">
          {aboutContent.values.map((value, index) => (
            <div key={index} className="value-item">
              <span className="value-item-icon">⭐</span>
              <p className="value-item-text">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
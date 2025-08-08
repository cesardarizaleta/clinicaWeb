// src/components/Servicios.tsx
import React from 'react';
import './Servicios.css';

const serviciosData = [
  { icon: '👨‍⚕️', title: 'Consultas Médicas Especializadas', desc: 'Accede a la experiencia de especialistas en diversas áreas de la salud, con un trato personalizado y profesional.' },
  { icon: '🚨', title: 'Emergencias 24/7', desc: 'Servicio de atención inmediata y profesional disponible las 24 horas del día, los 7 días de la semana, para cualquier urgencia médica.' },
  { icon: '🧪', title: 'Laboratorio Clínico y de Imágenes', desc: 'Diagnósticos precisos y confiables gracias a nuestra tecnología de vanguardia en análisis clínicos y estudios de imagen.' },
  { icon: '🏥', title: 'Hospitalización y Cirugía', desc: 'Instalaciones modernas y seguras para tu recuperación postoperatoria o tratamiento médico, con el máximo confort.' },
  { icon: '💊', title: 'Farmacia Interna', desc: 'Dispensación ágil de medicamentos y productos farmacéuticos, asegurando la disponibilidad de los tratamientos necesarios para tu salud.' },
  { icon: '👶👴', title: 'Atención Pediátrica y Geriátrica', desc: 'Cuidado especializado y dedicado para las necesidades médicas de los más jóvenes y los adultos mayores, con un enfoque integral.' },
  { icon: '🩻', title: 'Chequeos Preventivos', desc: 'Programas de salud diseñados para la prevención de enfermedades, promoción del bienestar y detección temprana de cualquier afección.' },
  { icon: '❤️', title: 'Cardiología Intervencionista', desc: 'Procedimientos avanzados para el diagnóstico y tratamiento de enfermedades del corazón, realizados por un equipo de expertos.' },
];

const Servicios: React.FC = () => {
  return (
    <div className="servicios-page-container">
      <header className="servicios-header">
        <h1 className="servicios-title">Nuestros Servicios</h1>
        <p className="servicios-subtitle">
          Descubre la gama completa de servicios médicos que ofrecemos, diseñados para cuidar de tu salud y la de tu familia.
        </p>
      </header>

      <div className="servicios-grid">
        {serviciosData.map((servicio, index) => (
          <div key={index} className="servicio-card">
            <span className="servicio-card-icon" aria-hidden>{servicio.icon}</span>
            <div className="servicio-card-content">
              <h3 className="servicio-card-title">{servicio.title}</h3>
              <p className="servicio-card-desc">{servicio.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
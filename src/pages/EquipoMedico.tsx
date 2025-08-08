// src/components/EquipoMedico.tsx
import React from 'react';
import './EquipoMedico.css';

interface TeamMember {
  name: string;
  role: string;
  icon?: string;
  image?: string;
}

const teamData: TeamMember[] = [
  {
    name: 'Dra. Ana López',
    role: 'Cardióloga',
    image: 'https://vithas.es/wp-content/uploads/2021/08/Ana-Lopez-375x416.jpeg',
  },
  {
    name: 'Dr. Carlos Hernández',
    role: 'Pediatra',
    image: 'https://www.revistacentromedico.org/ediciones/2015/2/art-2/1.jpg',
  },
  {
    name: 'Dra. Sofía Martínez',
    role: 'Dermatóloga',
    image: 'https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/53389dab/53389dab-6926-4ffa-9791-17686b50fbc5_large.jpg',
  },
  {
    name: 'Dr. Javier Vargas',
    role: 'Cirujano General',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtov1KNGQDPTgipI9lcdS_tTT_5S_iCxB4ZQ&s',
  },
  {
    name: 'Lic. María García',
    role: 'Fisioterapeuta',
    image: 'https://mariagarciadefleury.com/wp-content/uploads/2023/03/Diseno-sin-titulo-4-e1714184290956.png',
  },
  {
    name: 'Dra. Elena Ramos',
    role: 'Neuróloga',
    image: 'https://www.uanl.mx/wp-content/uploads/2018/08/DRA-MA-ELENA-RAMOS.jpg',
  },
];

const EquipoMedico: React.FC = () => {
  return (
    <div className="equipo-medico-container">
      <header className="equipo-medico-header">
        <h1 className="equipo-medico-title">Nuestro Equipo Médico</h1>
        <p className="equipo-medico-subtitle">
          Conoce a los profesionales que hacen posible nuestro compromiso con la excelencia y el cuidado de tu salud.
        </p>
      </header>

      <div className="medicos-grid">
        {teamData.map((member, index) => (
          <div key={index} className="medico-card">
            <div className="medico-image-wrapper">
              <img src={member.image} alt={member.name} className="medico-image" />
            </div>
            <div className="medico-info">
              <h3 className="medico-name">{member.name}</h3>
              <p className="medico-role">{member.role}</p>
            </div>
          </div>
        ))}
        {/* Tarjeta para más profesionales */}
        <div className="medico-card plus-card">
          <span className="plus-icon">➕</span>
          <div className="plus-info">
            <h3 className="plus-title">+40 Profesionales</h3>
            <p className="plus-text">en diversas especialidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipoMedico;
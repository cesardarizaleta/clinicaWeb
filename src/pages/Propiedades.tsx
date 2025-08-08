// src/components/Propiedades.tsx
import React from 'react';
import './Propiedades.css'; // Importa los estilos

interface PropertyItem {
  name: string;
  type: string;
  status: 'Implantado' | 'En proceso';
  icon: string;
}

const propiedadesData: PropertyItem[] = [
  {
    name: 'Hospital Principal',
    type: 'Infraestructura',
    status: 'Implantado',
    icon: '🏢',
  },
  {
    name: 'Unidad de Cirugía Mayor',
    type: 'Servicio',
    status: 'Implantado',
    icon: '🔪',
  },
  {
    name: 'Laboratorio de Diagnóstico',
    type: 'Servicio',
    status: 'Implantado',
    icon: '🔬',
  },
  {
    name: 'Almacén de Equipos Médicos',
    type: 'Logística',
    status: 'En proceso',
    icon: '📦',
  },
  {
    name: 'Unidad de Resonancia Magnética',
    type: 'Tecnología',
    status: 'En proceso',
    icon: '⚙️',
  },
  {
    name: 'Centro de Rehabilitación Física',
    type: 'Servicio',
    status: 'Implantado',
    icon: '💪',
  },
  {
    name: 'Farmacia Hospitalaria',
    type: 'Servicio',
    status: 'Implantado',
    icon: '💊',
  },
  {
    name: 'Unidad de Cuidados Intensivos',
    type: 'Servicio',
    status: 'Implantado',
    icon: '❤️‍🩹',
  },
  {
    name: 'Auditorio para Conferencias',
    type: 'Infraestructura',
    status: 'En proceso',
    icon: '📢',
  },
];

const ClinicaPropiedades: React.FC = () => {
  return (
    <div className="propiedades-scroll-container">
      <div className="propiedades-header-section">
        <h1 className="main-title">Propiedades de la Clínica San Rafael</h1>
        <p className="main-subtitle">
          Un recorrido visual por la infraestructura, tecnología y servicios que nos permiten ofrecer una atención de excelencia.
        </p>
      </div>

      <div className="propiedades-grid-scroll">
        {propiedadesData.map((prop, index) => (
          <div key={index} className="modern-card">
            <div className="card-icon-wrapper">
              <span className="card-icon">{prop.icon}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{prop.name}</h3>
              <p className="card-type">{prop.type}</p>
              <span
                className={`card-status ${prop.status === 'Implantado' ? 'status-implantado' : 'status-en-proceso'}`}
              >
                {prop.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicaPropiedades;
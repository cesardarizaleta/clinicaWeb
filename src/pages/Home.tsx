// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import chatbotResponsesData from '../responses.json';
import type { ChatResponsesData, SiteContent } from '../types';

const responses: ChatResponsesData = chatbotResponsesData as ChatResponsesData;
const site: SiteContent | undefined = responses.site;

// Función para procesar Markdown simple (negritas)
const renderMarkdown = (text: string) => {
  if (!text) return null;
  const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// Datos de ejemplo para las secciones
const aboutData = {
  description: site?.about?.description || 'En la Clínica San Rafael Valencia, nos dedicamos a ofrecer atención médica de excelencia con un enfoque humano y tecnológico. Nuestra historia se ha construido sobre los pilares de la dedicación, el profesionalismo y el compromiso inquebrantable con el bienestar de nuestros pacientes y la comunidad.',
  mission: site?.about?.mission || 'Proveer servicios de salud integrales y de alta calidad, utilizando tecnología de vanguardia y un equipo humano altamente calificado, para mejorar la calidad de vida de nuestros pacientes.',
  vision: site?.about?.vision || 'Ser la clínica de referencia en Valencia, reconocida por nuestra excelencia médica, innovación continua y un servicio centrado en la empatía y el respeto por cada individuo.',
  imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noo5DCl_kO6FbRSa5oSm4kbro6Qk7B78KG2wOus5EebKHEJWFfseVvPF9M9umSj9xuEzlzc56u1KE2s27gbGIICx-FVSl653gGRqKqwmvFkeLZce4MkWqFXED4GFEj6ip1zl9r2=s680-w680-h510-rw', // Imagen de ejemplo
};

const Home: React.FC = () => {
  const serviciosGenerales = responses.respuestas.slice(2, 11) as { respuesta: string }[];
  const especialidadesDestacadas = responses.respuestas.slice(11) as { respuesta: string }[];

  return (
    <div className="home-container">
      {/* HERO SECTION - Más profesional y llamativo */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{site?.hero?.title ?? 'Clínica San Rafael Valencia'}</h1>
          <p className="hero-subtitle">{site?.hero?.subtitle ?? 'Tu salud, nuestra prioridad en Valencia, Carabobo, Venezuela.'}</p>
          <a href="#about" className="hero-cta-button">Conocer más</a>
        </div>
      </section>

      {/* ABOUT SECTION - BENTO GRID */}
      <section className="landing-section-bento about-section-bento" id="about">
        <h2 className="section-title">¿Quiénes somos?</h2>
        <div className="bento-grid-container">
          <div className="bento-card large-card large-card--gradient">
            <h3 className="bento-title">Nuestra Historia</h3>
            <p>{renderMarkdown(aboutData.description)}</p>
          </div>

          <div className="bento-card small-card">
            <h3 className="bento-title">Misión</h3>
            <p>{renderMarkdown(aboutData.mission)}</p>
          </div>

          <div className="bento-card small-card">
            <h3 className="bento-title">Visión</h3>
            <p>{renderMarkdown(aboutData.vision)}</p>
          </div>
          
          <div className="bento-card small-card image-card">
            <img src={aboutData.imageUrl} alt="Fachada de la clínica" className="bento-image" />
          </div>

          <div className="bento-card large-card text-center highlight-card">
            <h3 className="bento-title">Especialidades y Atención</h3>
            <p>Contamos con más de **40 profesionales** en diversas especialidades para tu bienestar.</p>
            <Link to="/equipo-medico" className="bento-cta">Conoce a nuestro equipo →</Link>
          </div>
        </div>
      </section>

      {/* SERVICIOS Y ESPECIALIDADES - BENTO GRID */}
      <section className="landing-section-bento servicios-section-bento" id="servicios">
        <h2 className="section-title">Servicios y Especialidades</h2>
        <div className="bento-grid-container">
          {/* Card para Servicios Generales */}
          <div className="bento-card large-card large-card--gradient">
            <h3 className="bento-title">Servicios Generales</h3>
            <ul className="bento-list">
              {serviciosGenerales.slice(0, 5).map((r, i) => {
                const lines = r.respuesta.split('\n').filter(Boolean);
                const title = lines[0].replace(/^[^a-zA-ZáéíóúÁÉÍÓÚ]+/u, '');
                return <li key={i}>{renderMarkdown(title)}</li>;
              })}
            </ul>
            <Link to="/servicios" className="bento-cta">Ver todos los servicios →</Link>
          </div>

          {/* Card para Emergencias */}
          <div className="bento-card small-card accent-card">
            <span className="bento-icon">🚑</span>
            <h3 className="bento-title">Emergencias 24/7</h3>
            <p>Atención inmediata y profesional en cualquier momento, siempre a tu disposición.</p>
          </div>

          {/* Card para Especialidades Destacadas */}
          <div className="bento-card small-card">
            <h3 className="bento-title">Especialidades Destacadas</h3>
            <ul className="bento-list">
              {especialidadesDestacadas.slice(0, 3).map((r, i) => {
                const lines = r.respuesta.split('\n').filter(Boolean);
                const title = lines[0].replace(/^[^a-zA-ZáéíóúÁÉÍÓÚ]+/u, '');
                return <li key={i}>{renderMarkdown(title)}</li>;
              })}
            </ul>
          </div>
          
          {/* Card para la tecnología */}
          <div className="bento-card small-card image-card">
             <img src="https://access-one.us/wp-content/uploads/2021/12/biopsia_liquida_a-1.jpg" alt="Tecnología médica" className="bento-image" />
          </div>

          {/* Detalles adicionales */}
          <div className="bento-card large-card-details">
            <h3 className="bento-title">¿Por qué elegirnos?</h3>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-icon">🤝</span>
                <p>{renderMarkdown('Atención personalizada y humana')}</p>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🩺</span>
                <p>{renderMarkdown('Tecnología médica avanzada')}</p>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🚑</span>
                <p>{renderMarkdown('Emergencias 24/7')}</p>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <p>{renderMarkdown('Ubicación céntrica y fácil acceso')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
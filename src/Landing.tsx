
import React, { useState } from 'react';
import './Landing.css';
import chatbotResponsesData from './responses.json';
import type { ChatResponsesData } from './types';
import ChatbotWidget from './ChatbotWidget';

const responses: ChatResponsesData = chatbotResponsesData as ChatResponsesData;

const Landing: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Clínica San Rafael Valencia</h1>
          <p className="hero-subtitle">Tu salud, nuestra prioridad en Valencia, Carabobo, Venezuela.</p>
          <a href="#servicios" className="hero-cta">Ver servicios</a>
        </div>
        <div className="hero-bg-shape" />
      </section>

      {/* ABOUT SECTION */}
      <section className="landing-section about-section" id="about">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos una clínica médica moderna ubicada en Valencia, Carabobo, Venezuela, dedicada a brindar atención integral y de calidad a nuestros pacientes. Contamos con un equipo de profesionales altamente calificados y tecnología de punta para ofrecerte el mejor servicio.
        </p>
        <div className="about-details">
          <div>
            <h3>Misión</h3>
            <p>Brindar atención médica de excelencia, humana y personalizada, promoviendo la salud y el bienestar de la comunidad.</p>
          </div>
          <div>
            <h3>Visión</h3>
            <p>Ser la clínica líder en servicios de salud en la región, reconocida por su innovación, calidad y compromiso social.</p>
          </div>
        </div>
      </section>

      {/* SERVICIOS PRINCIPALES */}
      <section className="landing-section servicios-section" id="servicios">
        <h2>Especialidades y Servicios</h2>
        <div className="servicios-grid">
          {/* Especialidades */}
          {responses.respuestas.slice(0, 1).map((r, i) => {
            const lines = r.respuesta.split('\n').filter(Boolean);
            const title = lines[0];
            const items = lines.slice(2).map(line => line.replace(/^• /, ''));
            return (
              <div className="servicio-card" key={i}>
                <h3>{title.replace('🏥 ', '')}</h3>
                <ul className="servicio-list">
                  {items.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            );
          })}
          {/* Médicos */}
          {responses.respuestas.slice(1, 2).map((r, i) => {
            const lines = r.respuesta.split('\n').filter(Boolean);
            const title = lines[0];
            const items = lines.slice(2, lines.length - 1).map(line => line.replace(/^• /, ''));
            return (
              <div className="servicio-card" key={i+100}>
                <h3>{title.replace('👨‍⚕️ ', '')}</h3>
                <ul className="servicio-list">
                  {items.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                <div className="servicio-desc">{lines[lines.length - 1]}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICIOS GENERALES */}
      <section className="landing-section servicios-generales-section">
        <h2>Servicios Generales</h2>
        <div className="servicios-grid">
          {responses.respuestas.slice(2, 11).map((r, i) => {
            const lines = r.respuesta.split('\n').filter(Boolean);
            const title = lines[0].replace(/^[^a-zA-ZáéíóúÁÉÍÓÚ]+/, '');
            // Agrupar bloques de lista y bloques de texto
            const blocks: Array<{type: 'ul'|'p', content: string[]}> = [];
            let currentBlock: {type: 'ul'|'p', content: string[]} | null = null;
            for (let j = 1; j < lines.length; j++) {
              const line = lines[j];
              if (line.startsWith('• ')) {
                if (!currentBlock || currentBlock.type !== 'ul') {
                  if (currentBlock) blocks.push(currentBlock);
                  currentBlock = {type: 'ul', content: []};
                }
                currentBlock.content.push(line.replace(/^• /, ''));
              } else {
                if (!currentBlock || currentBlock.type !== 'p') {
                  if (currentBlock) blocks.push(currentBlock);
                  currentBlock = {type: 'p', content: []};
                }
                currentBlock.content.push(line);
              }
            }
            if (currentBlock) blocks.push(currentBlock);
            return (
              <div className="servicio-card" key={i}>
                <h3>{title}</h3>
                {blocks.map((block, idx) =>
                  block.type === 'ul' ? (
                    <ul className="servicio-list" key={idx}>
                      {block.content.map((item, k) => <li key={k}>{item}</li>)}
                    </ul>
                  ) : (
                    block.content.map((txt, k) => (
                      <p className="servicio-desc" key={k} dangerouslySetInnerHTML={{
                        __html: txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }} />
                    ))
                  )
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ESPECIALIDADES DESTACADAS */}
      <section className="landing-section especialidades-section">
        <h2>Especialidades Destacadas</h2>
        <div className="servicios-grid">
          {responses.respuestas.slice(11).map((r, i) => {
            const lines = r.respuesta.split('\n').filter(Boolean);
            const title = lines[0].replace(/^[^a-zA-ZáéíóúÁÉÍÓÚ]+/, '');
            const blocks: Array<{type: 'ul'|'p', content: string[]}> = [];
            let currentBlock: {type: 'ul'|'p', content: string[]} | null = null;
            for (let j = 1; j < lines.length; j++) {
              const line = lines[j];
              if (line.startsWith('• ')) {
                if (!currentBlock || currentBlock.type !== 'ul') {
                  if (currentBlock) blocks.push(currentBlock);
                  currentBlock = {type: 'ul', content: []};
                }
                currentBlock.content.push(line.replace(/^• /, ''));
              } else {
                if (!currentBlock || currentBlock.type !== 'p') {
                  if (currentBlock) blocks.push(currentBlock);
                  currentBlock = {type: 'p', content: []};
                }
                currentBlock.content.push(line);
              }
            }
            if (currentBlock) blocks.push(currentBlock);
            return (
              <div className="servicio-card" key={i}>
                <h3>{title}</h3>
                {blocks.map((block, idx) =>
                  block.type === 'ul' ? (
                    <ul className="servicio-list" key={idx}>
                      {block.content.map((item, k) => (
                        <li key={k} dangerouslySetInnerHTML={{
                          __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />
                      ))}
                    </ul>
                  ) : (
                    block.content.map((txt, k) => (
                      <p className="servicio-desc" key={k} dangerouslySetInnerHTML={{
                        __html: txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }} />
                    ))
                  )
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DETALLES EXTRA */}
      <section className="landing-section detalles-section">
        <h2>¿Por qué elegirnos?</h2>
        <ul className="detalles-list">
          <li>✔️ Atención personalizada y humana</li>
          <li>✔️ Tecnología médica avanzada</li>
          <li>✔️ Amplia variedad de especialidades</li>
          <li>✔️ Emergencias 24/7</li>
          <li>✔️ Laboratorio y farmacia en sitio</li>
          <li>✔️ Aceptamos múltiples seguros y formas de pago</li>
          <li>✔️ Ubicación céntrica y fácil acceso</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            <h4>Contacto</h4>
            <p>Av. Salud 1234, San Isidro, Lima</p>
            <p>Teléfono: (01) 234-5678</p>
            <p>WhatsApp: +51 987-654-321</p>
            <p>Email: info@clinicasaludvalencia.com</p>
          </div>
          <div>
            <h4>Horarios</h4>
            <p>Lun-Vie: 8:00 AM - 6:00 PM</p>
            <p>Sáb: 8:00 AM - 2:00 PM</p>
            <p>Emergencias: 24/7</p>
          </div>
          <div>
            <h4>Síguenos</h4>
            <p>
              <a href="#" aria-label="Facebook">Facebook</a> | <a href="#" aria-label="Instagram">Instagram</a> | <a href="#" aria-label="Twitter">Twitter</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Clínica Salud Valencia. Todos los derechos reservados.</p>
        </div>
      </footer>

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

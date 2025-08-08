import React from 'react';
import chatbotResponsesData from '../responses.json';
import type { ChatResponsesData, TermsData } from '../types';

const responses: ChatResponsesData = chatbotResponsesData as ChatResponsesData;

const Terminos: React.FC = () => {
  const terms: TermsData | undefined = responses.terminos as TermsData | undefined;
  if (!terms) {
    return (
      <div className="page-content terminos-view">
        <h2>Términos y Condiciones</h2>
        <p>La información de términos no está disponible en este momento.</p>
      </div>
    );
  }
  return (
    <div className="terminos-page">
      <section className="terminos-hero">
        <div className="terminos-hero-inner">
          <span className="icono-hero" aria-hidden>📜</span>
          <h1 className="terminos-title">Términos y Condiciones</h1>
          <p className="terminos-sub">{terms.intro}</p>
          <p className="terminos-updated">Última actualización: <strong>{terms.lastUpdated}</strong></p>
          <div className="chips-nav" aria-label="Navegación por secciones de términos">
            {terms.sections.map(s => (
              <a key={s.id} className="chip" href={`#${s.id}`}>{s.icon ?? '📌'} {s.title}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="terminos-content">
        <div className="terminos-grid">
          {terms.sections.map((sec) => (
            <article key={sec.id} id={sec.id} className="termino-card-creative animated-card">
              <div className="termino-icon-circle" style={{ background: sec.highlightColor || '#eaf6fb' }}>
                <span>{sec.icon || '📌'}</span>
              </div>
              <div className="termino-body">
                <h3>{sec.title}</h3>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                {sec.id === 'privacidad' && (
                  <p className="termino-cta"><a className="link-privacidad" href="#privacidad">Ver Política de Privacidad</a></p>
                )}
                {sec.id === 'contacto' && terms.contactEmail && (
                  <p className="termino-cta">¿Dudas? Escríbenos a <a className="link-mail" href={`mailto:${terms.contactEmail}`}>{terms.contactEmail}</a></p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="terminos-footer-note">
        <span>✨ Tu confianza y seguridad son nuestra prioridad. ¡Gracias por elegirnos!</span>
      </section>
    </div>
  );
};

export default Terminos;



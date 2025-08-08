import React, { useState, useEffect, useRef, type FormEvent, type ChangeEvent, type JSX } from 'react';
import './App.css'; 
import chatbotResponsesData from './responses.json'; 
import type { Message, ChatResponse, ChatResponsesData } from './types';
import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY; 

let model: GenerativeModel | null; 
let genAI: GoogleGenerativeAI;

try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-06-17" }); 
  console.log("Modelo Gemini inicializado con 'gemini-2.5-flash-lite-preview-06-17'.");
} catch (error) {
  console.error("Error al inicializar GoogleGenerativeAI o el modelo:", error);
  model = null; 
}


const chatbotResponses: ChatResponse[] = (chatbotResponsesData as ChatResponsesData).respuestas;

const buildGeminiPrompt = (userMessage: string, responsesData: ChatResponse[]): string => {
  const clinicContext = `
    Eres un asistente virtual profesional de la Clínica San Rafael Valencia.
    Tu objetivo es ayudar a los usuarios con información clara, útil y visualmente atractiva sobre los servicios y secciones de la clínica.
    Si consideras que el usuario debe ser redirigido a una sección o ruta específica, responde de forma profesional y elabora una breve descripción atractiva de la sección antes del @ruta, usando nombres amigables y visuales para cada ruta. Ejemplo:
    "🌟 Nuestra sección <b>Sobre Nosotros</b> te permitirá conocer la historia, valores y el equipo humano que hace posible nuestra atención de excelencia. @ruta:/sobre-nosotros"
    SOLO puedes usar los siguientes nombres de sección/ruta y sus rutas asociadas:
    - <b>Inicio</b> (/inicio): Página principal con información general y acceso rápido a todos los servicios.
    - <b>Términos</b> (/terminos): Consulta los términos y condiciones de nuestros servicios médicos.
    - <b>Propiedades</b> (/propiedades): Descubre la infraestructura, equipos y recursos de la clínica.
    - <b>Sobre Nosotros</b> (/sobre-nosotros): Conoce nuestra historia, misión, visión y valores.
    - <b>Servicios</b> (/servicios): Explora todas las especialidades y servicios médicos que ofrecemos.
    - <b>Equipo Médico</b> (/equipo-medico): Información sobre nuestros doctores y especialistas.
    - <b>Contacto</b> (/contacto): Formas de contacto, ubicación y canales de atención.
    No inventes rutas como terminos-y-condiciones, terminos-de-uso, ni variantes. Usa únicamente los nombres y rutas reales indicados arriba.
    Si usas @section o @ruta, hazlo al final de tu respuesta y no expliques el comando. Si la respuesta incluye ambos, prioriza @ruta.
    Sé siempre profesional, cálido, breve y visualmente atractivo en tus respuestas, resaltando los beneficios o información relevante de cada sección antes de redirigir. Puedes usar emojis o negritas para hacer la respuesta más visual.
    Aquí hay información estructurada sobre los servicios de la clínica que puedes usar como referencia, aunque no siempre es necesario responder solo con esto, sino para guiar tu comprensión:
    `;

  const jsonContext = responsesData.map(res => 
    `Palabras clave: ${res.palabras_clave.join(', ')}\nRespuesta: ${res.respuesta}`
  ).join('\n\n');

  const finalPrompt = `
    ${clinicContext}
    ---
    Información de la Clínica (JSON context):
    ${jsonContext}
    ---
    Considerando el contexto de la clínica y la información proporcionada, por favor responde a la siguiente pregunta del usuario. Si la pregunta es específica de un servicio de clínica, puedes usar la información de referencia. Si es una pregunta general de salud o algo que va más allá de los servicios directos de la clínica, responde de manera informativa y útil, como lo haría un asistente de IA, pero siempre manteniendo un tono profesional y relacionado con el sector salud. Evita mencionar que tienes un JSON o que tu respuesta proviene de una base de datos.
    
    Pregunta del usuario: "${userMessage}"
    `.trim();

  return finalPrompt;
};



function App(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [smartMode, setSmartMode] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const initialMessage: Message = {
    text: "👋 ¡Hola! Soy tu asistente virtual de la clínica. ¿En qué puedo ayudarte hoy? Puedes activar el **Modo Inteligente** para una conversación más abierta.",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString(),
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const handleSendMessage = (e: FormEvent): void => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    handleBotResponse(input);
    setInput('');
  };

  const validSections = [
    'inicio',
    'terminos',
    'propiedades',
    'sobre-nosotros',
    'servicios',
    'equipo-medico',
    'contacto',
  ];

  const handleBotResponse = async (userMessage: string): Promise<void> => {
    let botReplyText: string;
    let sectionToScroll: string | null = null;
    let routeToNavigate: string | null = null;

    if (smartMode && model) {
      try {
        const geminiPrompt = buildGeminiPrompt(userMessage, chatbotResponses); 
        const result = await model.generateContent(geminiPrompt);
        const response = await result.response;
        botReplyText = response.text();
      } catch (error) {
        console.error("Error al comunicarse con Gemini:", error);
        botReplyText = "Lo siento, tengo problemas para conectarme con mi cerebro inteligente en este momento. Esto podría deberse a un problema de conexión, a que el modelo de IA no está disponible o a la complejidad de la solicitud. Por favor, inténtalo de nuevo más tarde o desactiva el Modo Inteligente.";
      }
    } else {
      const normalizedUserMessage: string = userMessage.toLowerCase().normalize("NFD").replace(/[^a-z0-9 ]/g, "");
      const foundResponse: ChatResponse | undefined = chatbotResponses.find((response) =>
        response.palabras_clave.some((keyword) =>
          normalizedUserMessage.includes(keyword.toLowerCase().normalize("NFD").replace(/[^a-z0-9 ]/g, ""))
        )
      );

      if (foundResponse) {
        botReplyText = foundResponse.respuesta;
      } else {
        botReplyText = "Lo siento, no entendí tu pregunta. ¿Podrías reformularla o preguntar sobre otro tema? Puedes preguntar sobre: **especialidades, doctores, citas, horarios, ubicación, emergencias, seguros, laboratorio, farmacia, precios o COVID.** Si quieres una conversación más abierta, activa el **Modo Inteligente**.";
      }
    }

    // Detecta @ruta, @section:NAME y también @NAME (ej: @contacto)
    const routeMatch = botReplyText.match(/@ruta:([/a-zA-Z0-9-]+)/);
    const sectionMatch = botReplyText.match(/@section:([a-zA-Z0-9-]+)/);
    const atSectionMatch = botReplyText.match(/@([a-zA-Z0-9-]+)/);

    if (routeMatch) {
      routeToNavigate = routeMatch[1];
      botReplyText = botReplyText.replace(/@ruta:[/a-zA-Z0-9-]+/, '').trim();
    } else if (sectionMatch && validSections.includes(sectionMatch[1])) {
      sectionToScroll = sectionMatch[1];
      botReplyText = botReplyText.replace(/@section:([a-zA-Z0-9-]+)/, '').trim();
    } else if (atSectionMatch && validSections.includes(atSectionMatch[1])) {
      sectionToScroll = atSectionMatch[1];
      botReplyText = botReplyText.replace(/@([a-zA-Z0-9-]+)/, '').trim();
    }

    const botReply: Message = {
      text: botReplyText,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    };

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botReply]);
      if (routeToNavigate) {
        navigate(routeToNavigate);
      } else if (sectionToScroll) {
        navigate(`/${sectionToScroll}`);
      }
    }, 500);
  };

  const handleSmartModeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    setSmartMode(isChecked);

    if (!model && isChecked) {
        const noModelMessage: Message = {
            text: "⚠️ No se pudo cargar el Modo Inteligente. Asegúrate de que tu clave API sea válida y el modelo esté disponible.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, noModelMessage]);
        return; 
    }

    const modeMessage: Message = {
      text: isChecked
        ? "🧠 ¡Modo Inteligente activado! Ahora puedes preguntarme cualquier cosa. Ten en cuenta que mis respuestas serán más generales y generadas por IA."
        : "📚 Modo por defecto activado. Solo responderé a preguntas relacionadas con los servicios de la clínica basados en mi conocimiento predefinido.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, modeMessage]);
    }, 300);
  };

  const renderMessageContent = (text: string): JSX.Element[] => {
    return text.split('\n').map((item, key) => (
      <React.Fragment key={key}>
        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <h1>Asistente Médico Virtual</h1>
        <div className="smart-mode-toggle">
          <label htmlFor="smart-mode-switch">Modo Inteligente</label>
          <input
            type="checkbox"
            id="smart-mode-switch"
            checked={smartMode}
            onChange={handleSmartModeChange}
            disabled={!model} 
          />
        </div>
      </header>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender}`}>
            <div className="message-content">
              {renderMessageContent(msg.text)}
            </div>
            <span className="message-timestamp">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={smartMode ? "Pregúntame cualquier cosa..." : "Escribe tu mensaje sobre la clínica..."}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
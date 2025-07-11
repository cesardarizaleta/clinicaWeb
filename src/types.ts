// src/types.ts
export type Sender = 'user' | 'bot';

export interface Message {
  text: string;
  sender: Sender;
  timestamp: string;
}

export interface ChatResponse {
  id: number;
  palabras_clave: string[];
  respuesta: string;
}

export interface ChatResponsesData {
  respuestas: ChatResponse[];
}
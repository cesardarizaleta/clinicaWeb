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
  terminos?: TermsData;
  site?: SiteContent;
}

export interface TermsData {
  lastUpdated: string;
  intro: string;
  sections: TermsSection[];
  contactEmail?: string;
}

export interface TermsSection {
  id: string;
  title: string;
  icon?: string;
  highlightColor?: string;
  paragraphs: string[];
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    description: string;
    mission: string;
    vision: string;
    values: string[];
    imageUrl?: string;
  };
  contacto: ContactInfo;
  equipoMedico: TeamMember[];
  propiedades: PropertyItem[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  socials?: Array<{ name: string; url: string; icon?: string }>;
}

export interface TeamMember {
  name: string;
  role: string;
  icon?: string;
}

export interface PropertyItem {
  name: string;
  type: string;
  icon?: string;
  status: 'Implantado' | 'No implantado';
}
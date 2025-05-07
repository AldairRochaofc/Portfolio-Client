"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "pt" | "en"

type Translations = {
  [key: string]: {
    pt: string
    en: string
  }
}

// Traduções do site
const translations: Translations = {
  // Hero Section
  "hero.title": {
    pt: "Galeria de Arte",
    en: "Art Gallery",
  },
  "hero.subtitle": {
    pt: "Explorando a criatividade através de cores, formas e emoções",
    en: "Exploring creativity through colors, shapes, and emotions",
  },
  "hero.button": {
    pt: "Ver Catálogo",
    en: "View Catalog",
  },

  // Gallery Section
  "gallery.title": {
    pt: "Catálogo de Artes",
    en: "Art Catalog",
  },
  "gallery.description": {
    pt: "Explore nossa coleção de obras únicas que expressam emoção e criatividade",
    en: "Explore our collection of unique works that express emotion and creativity",
  },
  "gallery.requestInfo": {
    pt: "Solicitar Informações",
    en: "Request Information",
  },

  // Categories
  "category.all": {
    pt: "Todos",
    en: "All",
  },
  "category.myStyle": {
    pt: "My Style",
    en: "My Style",
  },
  "category.cartoon": {
    pt: "Cartoon",
    en: "Cartoon",
  },
  "category.chibi": {
    pt: "Chibi",
    en: "Chibi",
  },
  "category.stickers": {
    pt: "Stickers",
    en: "Stickers",
  },
  "category.furrys": {
    pt: "Furrys",
    en: "Furrys",
  },

  // About Section
  "about.title": {
    pt: "Sobre o Artista",
    en: "About the Artist",
  },
  "about.paragraph1": {
    pt: "Apaixonado por explorar novas formas de expressão, nosso trabalho busca conectar emoções e experiências através da arte visual.",
    en: "Passionate about exploring new forms of expression, our work seeks to connect emotions and experiences through visual art.",
  },
  "about.paragraph2": {
    pt: "Cada obra é criada com atenção aos detalhes e uma profunda conexão com as emoções humanas, resultando em peças que ressoam com o observador em um nível pessoal.",
    en: "Each work is created with attention to detail and a deep connection to human emotions, resulting in pieces that resonate with the viewer on a personal level.",
  },
  "about.button": {
    pt: "Mais Sobre Mim",
    en: "More About Me",
  },

  // Contact Section
  "contact.title": {
    pt: "Entre em Contato",
    en: "Contact Us",
  },
  "contact.description": {
    pt: "Interessado em adquirir uma obra ou colaborar em um projeto? Envie uma mensagem!",
    en: "Interested in acquiring a work or collaborating on a project? Send a message!",
  },
  "contact.name": {
    pt: "Nome",
    en: "Name",
  },
  "contact.email": {
    pt: "Email",
    en: "Email",
  },
  "contact.subject": {
    pt: "Assunto",
    en: "Subject",
  },
  "contact.message": {
    pt: "Mensagem",
    en: "Message",
  },
  "contact.send": {
    pt: "Enviar Mensagem",
    en: "Send Message",
  },
  "contact.sending": {
    pt: "Enviando...",
    en: "Sending...",
  },
  "contact.namePlaceholder": {
    pt: "Seu nome completo",
    en: "Your full name",
  },
  "contact.emailPlaceholder": {
    pt: "seu@email.com",
    en: "your@email.com",
  },
  "contact.subjectPlaceholder": {
    pt: "Motivo do contato",
    en: "Reason for contact",
  },
  "contact.messagePlaceholder": {
    pt: "Sua mensagem detalhada...",
    en: "Your detailed message...",
  },

  // Success Modal
  "success.title": {
    pt: "Mensagem Enviada!",
    en: "Message Sent!",
  },
  "success.message": {
    pt: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!",
    en: "Your message has been sent successfully. We'll get back to you soon!",
  },
  "success.close": {
    pt: "Fechar",
    en: "Close",
  },

  // Footer
  "footer.rights": {
    pt: "Todos os direitos reservados.",
    en: "All rights reserved.",
  },

  // Theme Toggle
  "theme.light": {
    pt: "Modo Claro",
    en: "Light Mode",
  },
  "theme.dark": {
    pt: "Modo Escuro",
    en: "Dark Mode",
  },

  // Language Toggle
  "language.switch": {
    pt: "English",
    en: "Português",
  },
}

type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"))
  }

  const t = (key: string) => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

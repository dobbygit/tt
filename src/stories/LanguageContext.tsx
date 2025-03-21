import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "contact.title": "Contact Us",
    "contact.submit": "Submit",
    "products.title": "Our Products",
    "home.welcome": "Welcome to Tendas Mozambique",
    // Add more translations as needed
  },
  pt: {
    "contact.title": "Contacte-nos",
    "contact.submit": "Enviar",
    "products.title": "Nossos Produtos",
    "home.welcome": "Bem-vindo à Tendas Moçambique",
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = "en",
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

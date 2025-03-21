import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.tents": "Tents",
    "nav.whyUs": "Why Choose Us",
    "nav.location": "Find Us",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "TENDAS DE MOZAMBIQUE",
    "hero.subtitle":
      "HIGH QUALITY TARPAULINS, TENTS AND MUCH MORE, MADE FOR THE AFRICAN SUN",
    "hero.cta": "Explore Tents",

    // Product Showcase
    "products.title": "Premium Outdoor Tents",
    "products.subtitle":
      "Explore our range of high-quality tents for camping, events, and outdoor adventures",
    "products.downloadCatalog": "Download Tent Catalog",
    "products.viewDetails": "View Details",
    "products.requestQuote": "Request Quote",

    // Statistics Section
    "stats.title": "Why Choose Our Tents",
    "stats.description":
      "We've been crafting premium outdoor tents for over 15 years, delivering quality and reliability.",
    "stats.tentsSold": "Tents Sold",
    "stats.yearsExperience": "Years Experience",
    "stats.tentModels": "Tent Models",
    "stats.satisfactionRate": "Satisfaction Rate",

    // Contact Section
    "contact.title": "Request a Tent Quote",
    "contact.subtitle":
      "Need a custom tent or have questions about our products? Send us a message and we'll get back to you within 24 hours.",
    "contact.emailUs": "Email Us",
    "contact.callUs": "Call Us",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.thankYou": "Thank You!",
    "contact.successMessage":
      "Your message has been sent successfully. We'll get back to you soon.",

    // Footer
    "footer.products": "Products",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.contactUs": "Contact Us",
    "footer.allRightsReserved": "All rights reserved.",

    // Why Us Page
    "whyUs.title": "Why Choose Us",
    "whyUs.subtitle":
      "Tendas de Mozambique - Your trusted partner for high-quality tents and PVC products",
    "whyUs.heading": "Crafting Excellence in Every Stitch",
    "whyUs.paragraph1":
      "A company based in Beira making tarpaulins, tents, carports, bakkie covers, truck frames and canopies, awnings, drop blinds and doing all general heavy duty canvas and PVC work.",
    "whyUs.paragraph2":
      "We make standard tents and custom tents – from the smallest dome tent to the largest party marquee or warehouse tent. Using only the best materials and designs, we are suppliers to many heavy duty users such as safari camps, long term construction camps, the military and the police.",
    "whyUs.paragraph3":
      "Tendas de Mozambique has a wide range of colours in material proven to stand up to the Moçambique sun.",
    "whyUs.contactUs": "Contact Us Today",
    "whyUs.challenge": "Give us a challenge…",
    "whyUs.challengeDescription":
      "Contact us with your requirement and our expert tent staff will guide you through our range.",
    "whyUs.expertiseTitle": "Our Expertise & Services",
    "whyUs.expertiseDescription":
      "With years of experience and dedication to quality, we provide comprehensive solutions for all your tent and PVC needs.",
    "whyUs.ctaTitle": "Give Us a Challenge",
    "whyUs.ctaDescription":
      "Contact us with your requirement and our expert tent staff will guide you through our range. We can come on site to advise on a new camp or to repair an existing tent.",

    // Rental Page
    "rental.title": "Equipment Rental",
    "rental.subtitle":
      "High-quality tents, shade structures, and equipment for your events, camping trips, or commercial needs",
    "rental.whyRentWithUs": "Why Rent With Us",
    "rental.catalog": "Rental Catalog",
    "rental.catalogDescription":
      "Browse our selection of high-quality rental equipment for any occasion",
    "rental.allItems": "All Items",
    "rental.tents": "Tents",
    "rental.shadeStructures": "Shade Structures",
    "rental.coversAndTarpaulins": "Covers & Tarpaulins",
    "rental.contactForPricing": "Contact us for pricing and availability",
    "rental.requestQuote": "Request Quote",
    "rental.retry": "Retry",

    // Rental Request Section
    "rentalRequest.title": "Rent Premium Outdoor Equipment",
    "rentalRequest.subtitle":
      "High-quality tents, shade structures, and equipment for your events, camping trips, or commercial needs",
    "rentalRequest.whyRentWithUs": "Why Rent With Us",
    "rentalRequest.premiumQuality": "Premium quality equipment",
    "rentalRequest.flexiblePeriods": "Flexible rental periods",
    "rentalRequest.professionalSetup": "Professional setup and takedown",
    "rentalRequest.competitivePricing": "Competitive pricing",
    "rentalRequest.viewCatalog": "View Full Rental Catalog",
    "rentalRequest.requestReceived": "Request Received!",
    "rentalRequest.contactShortly":
      "We'll contact you shortly with rental information and availability.",
    "rentalRequest.quickInquiry": "Quick Rental Inquiry",
    "rentalRequest.equipmentType": "EQUIPMENT TYPE",
    "rentalRequest.selectEquipment": "Select equipment type",
    "rentalRequest.tent": "Tent",
    "rentalRequest.carport": "Car Shade Port",
    "rentalRequest.tarpaulin": "Tarpaulin",
    "rentalRequest.awning": "Awning",
    "rentalRequest.other": "Other",
    "rentalRequest.rentalDuration": "RENTAL DURATION",
    "rentalRequest.selectDuration": "Select duration",
    "rentalRequest.oneDay": "1 Day",
    "rentalRequest.weekend": "Weekend (2-3 days)",
    "rentalRequest.oneWeek": "1 Week",
    "rentalRequest.oneMonth": "1 Month",
    "rentalRequest.customPeriod": "Custom Period",
    "rentalRequest.phoneNumber": "PHONE NUMBER",
    "rentalRequest.yourPhoneNumber": "Your phone number",
    "rentalRequest.processing": "Processing...",
    "rentalRequest.requestInfo": "Request Rental Information",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.tents": "Tendas",
    "nav.whyUs": "Porquê Escolher-nos",
    "nav.location": "Encontre-nos",
    "nav.contact": "Contacto",

    // Hero Section
    "hero.title": "TENDAS DE MOÇAMBIQUE",
    "hero.subtitle":
      "LONAS, TENDAS E MUITO MAIS DE ALTA QUALIDADE, FEITAS PARA O SOL AFRICANO",
    "hero.cta": "Explorar Tendas",

    // Product Showcase
    "products.title": "Tendas Premium para Exterior",
    "products.subtitle":
      "Explore a nossa gama de tendas de alta qualidade para camping, eventos e aventuras ao ar livre",
    "products.downloadCatalog": "Baixar Catálogo de Tendas",
    "products.viewDetails": "Ver Detalhes",
    "products.requestQuote": "Solicitar Orçamento",

    // Statistics Section
    "stats.title": "Por Que Escolher as Nossas Tendas",
    "stats.description":
      "Fabricamos tendas premium para exterior há mais de 15 anos, entregando qualidade e confiabilidade.",
    "stats.tentsSold": "Tendas Vendidas",
    "stats.yearsExperience": "Anos de Experiência",
    "stats.tentModels": "Modelos de Tendas",
    "stats.satisfactionRate": "Taxa de Satisfação",

    // Contact Section
    "contact.title": "Solicitar Orçamento de Tenda",
    "contact.subtitle":
      "Precisa de uma tenda personalizada ou tem perguntas sobre os nossos produtos? Envie-nos uma mensagem e responderemos em 24 horas.",
    "contact.emailUs": "O Nosso Email",
    "contact.callUs": "Ligue para Nós",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.thankYou": "Obrigado!",
    "contact.successMessage":
      "A sua mensagem foi enviada com sucesso. Entraremos em contacto em breve.",

    // Footer
    "footer.products": "Produtos",
    "footer.company": "Empresa",
    "footer.support": "Suporte",
    "footer.contactUs": "Contacte-nos",
    "footer.allRightsReserved": "Todos os direitos reservados.",

    // Why Us Page
    "whyUs.title": "Porquê Escolher-nos",
    "whyUs.subtitle":
      "Tendas de Moçambique - O seu parceiro de confiança para tendas e produtos de PVC de alta qualidade",
    "whyUs.heading": "Excelência em Cada Costura",
    "whyUs.paragraph1":
      "Uma empresa sediada na Beira que fabrica lonas, tendas, telheiros para carros, coberturas para carrinhas, estruturas e capotas para camiões, toldos, cortinas e realiza todos os trabalhos gerais de lona e PVC de alta resistência.",
    "whyUs.paragraph2":
      "Fabricamos tendas padrão e tendas personalizadas – desde a menor tenda de cúpula até à maior tenda de festa ou armazém. Utilizando apenas os melhores materiais e designs, somos fornecedores de muitos utilizadores de alta resistência, como acampamentos de safari, acampamentos de construção de longo prazo, militares e polícia.",
    "whyUs.paragraph3":
      "A Tendas de Moçambique tem uma ampla gama de cores em material comprovado para resistir ao sol de Moçambique.",
    "whyUs.contactUs": "Contacte-nos Hoje",
    "whyUs.challenge": "Dê-nos um desafio…",
    "whyUs.challengeDescription":
      "Contacte-nos com o seu requisito e a nossa equipa especializada em tendas irá orientá-lo através da nossa gama.",
    "whyUs.expertiseTitle": "Nossa Experiência e Serviços",
    "whyUs.expertiseDescription":
      "Com anos de experiência e dedicação à qualidade, fornecemos soluções abrangentes para todas as suas necessidades de tendas e PVC.",
    "whyUs.ctaTitle": "Dê-nos um Desafio",
    "whyUs.ctaDescription":
      "Contacte-nos com o seu requisito e a nossa equipa especializada em tendas irá orientá-lo através da nossa gama. Podemos ir ao local para aconselhar sobre um novo acampamento ou para reparar uma tenda existente.",

    // Rental Page
    "rental.title": "Aluguer de Equipamento",
    "rental.subtitle":
      "Tendas, estruturas de sombra e equipamentos de alta qualidade para os seus eventos, acampamentos ou necessidades comerciais",
    "rental.whyRentWithUs": "Porquê Alugar Connosco",
    "rental.catalog": "Catálogo de Aluguer",
    "rental.catalogDescription":
      "Explore a nossa seleção de equipamentos de aluguer de alta qualidade para qualquer ocasião",
    "rental.allItems": "Todos os Itens",
    "rental.tents": "Tendas",
    "rental.shadeStructures": "Estruturas de Sombra",
    "rental.coversAndTarpaulins": "Coberturas e Lonas",
    "rental.contactForPricing": "Contacte-nos para preços e disponibilidade",
    "rental.requestQuote": "Solicitar Orçamento",
    "rental.retry": "Tentar Novamente",

    // Rental Request Section
    "rentalRequest.title": "Alugue Equipamento Premium para Exterior",
    "rentalRequest.subtitle":
      "Tendas, estruturas de sombra e equipamentos de alta qualidade para os seus eventos, acampamentos ou necessidades comerciais",
    "rentalRequest.whyRentWithUs": "Porquê Alugar Connosco",
    "rentalRequest.premiumQuality": "Equipamento de qualidade premium",
    "rentalRequest.flexiblePeriods": "Períodos de aluguer flexíveis",
    "rentalRequest.professionalSetup": "Montagem e desmontagem profissional",
    "rentalRequest.competitivePricing": "Preços competitivos",
    "rentalRequest.viewCatalog": "Ver Catálogo Completo de Aluguer",
    "rentalRequest.requestReceived": "Pedido Recebido!",
    "rentalRequest.contactShortly":
      "Entraremos em contacto em breve com informações de aluguer e disponibilidade.",
    "rentalRequest.quickInquiry": "Consulta Rápida de Aluguer",
    "rentalRequest.equipmentType": "TIPO DE EQUIPAMENTO",
    "rentalRequest.selectEquipment": "Selecione o tipo de equipamento",
    "rentalRequest.tent": "Tenda",
    "rentalRequest.carport": "Telheiro para Carro",
    "rentalRequest.tarpaulin": "Lona",
    "rentalRequest.awning": "Toldo",
    "rentalRequest.other": "Outro",
    "rentalRequest.rentalDuration": "DURAÇÃO DO ALUGUER",
    "rentalRequest.selectDuration": "Selecione a duração",
    "rentalRequest.oneDay": "1 Dia",
    "rentalRequest.weekend": "Fim de Semana (2-3 dias)",
    "rentalRequest.oneWeek": "1 Semana",
    "rentalRequest.oneMonth": "1 Mês",
    "rentalRequest.customPeriod": "Período Personalizado",
    "rentalRequest.phoneNumber": "NÚMERO DE TELEFONE",
    "rentalRequest.yourPhoneNumber": "O seu número de telefone",
    "rentalRequest.processing": "A processar...",
    "rentalRequest.requestInfo": "Solicitar Informações de Aluguer",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LanguageProviderComponent = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguageHook = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = LanguageProviderComponent;
export const useLanguage = useLanguageHook;

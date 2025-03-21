import { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { Button } from "../components/ui/button";

// Mock the language context
const mockT = (key: string) => {
  const translations: Record<string, string> = {
    "hero.title": "Premium Outdoor Tents & Shelters",
    "hero.subtitle":
      "Durable, weather-resistant tents for camping, events, and outdoor adventures",
    "hero.cta": "Explore Tents",
  };
  return translations[key] || key;
};

// Mock the BackgroundTrees component
const MockBackgroundTrees = () => {
  return <div className="absolute inset-0 z-0 opacity-20" />;
};

// Mock the HeroSection component to use our mocks
const MockedHeroSection = ({
  title,
  subtitle,
  ctaText,
  backgroundImage,
  onCtaClick = () => {},
}) => {
  // Create a mock t function that returns our props
  const t = (key: string) => {
    if (key === "hero.title") return title;
    if (key === "hero.subtitle") return subtitle;
    if (key === "hero.cta") return ctaText;
    return key;
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      <MockBackgroundTrees />
      <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 text-gray-200 uppercase font-light tracking-widest max-w-3xl font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="bg-white text-[#1b5e20] hover:bg-gray-100 px-12 py-7 text-xl rounded-md shadow-xl flex items-center font-semibold"
            onClick={onCtaClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            {t("hero.cta")}
          </Button>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </motion.div>
        <div className="w-[401px] h-[189px]"></div>
      </div>
    </section>
  );
};

const meta = {
  title: "Components/HeroSection",
  component: MockedHeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    ctaText: { control: "text" },
    backgroundImage: { control: "text" },
    onCtaClick: { action: "clicked" },
  },
};

export default meta;

export const Default = {
  args: {
    title: "Premium Outdoor Tents & Shelters",
    subtitle:
      "Durable, weather-resistant tents for camping, events, and outdoor adventures",
    ctaText: "Explore Tents",
    backgroundImage:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
};

export const CustomContent = {
  args: {
    title: "Adventure Awaits",
    subtitle:
      "Discover our collection of premium outdoor gear for your next expedition",
    ctaText: "Shop Now",
    backgroundImage:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
};

export const MountainTheme = {
  args: {
    title: "Conquer New Heights",
    subtitle:
      "Equipment designed for serious mountaineers and alpine explorers",
    ctaText: "View Collection",
    backgroundImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
};

export const BeachTheme = {
  args: {
    title: "Beach Camping Essentials",
    subtitle:
      "Lightweight, sand-resistant shelters perfect for coastal adventures",
    ctaText: "Discover Beach Gear",
    backgroundImage:
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
};

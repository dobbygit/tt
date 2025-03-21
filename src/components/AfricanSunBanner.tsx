import React from "react";
import { motion } from "framer-motion";
import { Sun, Shield, Droplets } from "lucide-react";

interface AfricanSunBannerProps {
  className?: string;
}

const AfricanSunBanner: React.FC<AfricanSunBannerProps> = ({
  className = "",
}) => {
  return <div className={`w-full overflow-hidden ${className}`}></div>;
};

export default AfricanSunBanner;

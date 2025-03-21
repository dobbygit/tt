import React from "react";

interface BackgroundTreesProps {
  color?: string;
  opacity?: number;
  height?: string;
}

const BackgroundTrees: React.FC<BackgroundTreesProps> = ({
  color = "#2d3748",
  opacity = 0.1,
  height = "200px",
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
      style={{ height }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full"
        style={{ opacity }}
      >
        <path
          fill={color}
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full absolute bottom-0"
        style={{ opacity: opacity * 0.7 }}
      >
        <path
          fill={color}
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default BackgroundTrees;

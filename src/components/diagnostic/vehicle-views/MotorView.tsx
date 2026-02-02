import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface MotorViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const MotorView = ({ highlightZoneId, onZoneClick }: MotorViewProps) => {
  const getZoneClasses = (zoneId: HighlightZoneId) => {
    const isHighlighted = highlightZoneId === zoneId;
    return cn(
      "transition-all duration-300 cursor-pointer",
      isHighlighted 
        ? "fill-warning stroke-warning animate-pulse" 
        : "fill-primary/20 stroke-primary/60 hover:fill-primary/40 hover:stroke-primary"
    );
  };

  return (
    <motion.svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ filter: 'drop-shadow(0 0 20px hsl(187 92% 44% / 0.2))' }}
    >
      <defs>
        <filter id="motorGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 92% 44% / 0.3)" />
          <stop offset="100%" stopColor="hsl(187 92% 44% / 0.1)" />
        </linearGradient>
      </defs>

      {/* Engine Bay Background */}
      <rect x="50" y="50" width="700" height="400" rx="20" 
        className="fill-secondary/10 stroke-border/50" strokeWidth="2" />

      {/* Engine Block */}
      <g 
        onClick={() => onZoneClick?.('zone_engine_block')}
        className={getZoneClasses('zone_engine_block')}
        filter={highlightZoneId === 'zone_engine_block' ? 'url(#motorGlow)' : undefined}
      >
        <rect x="250" y="150" width="300" height="200" rx="10" strokeWidth="2" fillOpacity="0.4" />
        <rect x="270" y="170" width="260" height="160" rx="5" className="fill-none stroke-current" strokeWidth="1" />
        {/* Cylinder heads */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={310 + i * 60} cy="230" r="20" className="fill-current" fillOpacity="0.3" />
        ))}
        <text x="400" y="310" textAnchor="middle" className="fill-current text-xs font-bold">BLOCO DO MOTOR</text>
      </g>

      {/* Radiator */}
      <g 
        onClick={() => onZoneClick?.('zone_radiator')}
        className={getZoneClasses('zone_radiator')}
        filter={highlightZoneId === 'zone_radiator' ? 'url(#motorGlow)' : undefined}
      >
        <rect x="80" y="120" width="120" height="180" rx="8" strokeWidth="2" fillOpacity="0.3" />
        {/* Cooling fins */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="95" y1={140 + i * 20} x2="185" y2={140 + i * 20} className="stroke-current" strokeWidth="1" />
        ))}
        <text x="140" y="330" textAnchor="middle" className="fill-current text-xs font-medium">RADIADOR</text>
      </g>

      {/* Battery */}
      <g 
        onClick={() => onZoneClick?.('zone_battery')}
        className={getZoneClasses('zone_battery')}
        filter={highlightZoneId === 'zone_battery' ? 'url(#motorGlow)' : undefined}
      >
        <rect x="600" y="100" width="100" height="80" rx="5" strokeWidth="2" fillOpacity="0.4" />
        {/* Terminals */}
        <circle cx="620" cy="105" r="8" className="fill-destructive/50 stroke-destructive" strokeWidth="2" />
        <circle cx="680" cy="105" r="8" className="fill-primary/50 stroke-primary" strokeWidth="2" />
        <text x="650" y="150" textAnchor="middle" className="fill-current text-xs font-medium">BATERIA</text>
      </g>

      {/* Alternator */}
      <g 
        onClick={() => onZoneClick?.('zone_alternator')}
        className={getZoneClasses('zone_alternator')}
        filter={highlightZoneId === 'zone_alternator' ? 'url(#motorGlow)' : undefined}
      >
        <circle cx="600" cy="280" r="45" strokeWidth="2" fillOpacity="0.3" />
        <circle cx="600" cy="280" r="25" className="fill-none stroke-current" strokeWidth="1" />
        {/* Pulley spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line 
            key={angle}
            x1={600 + 15 * Math.cos(angle * Math.PI / 180)} 
            y1={280 + 15 * Math.sin(angle * Math.PI / 180)}
            x2={600 + 40 * Math.cos(angle * Math.PI / 180)} 
            y2={280 + 40 * Math.sin(angle * Math.PI / 180)}
            className="stroke-current"
            strokeWidth="1"
          />
        ))}
        <text x="600" y="345" textAnchor="middle" className="fill-current text-xs font-medium">ALTERNADOR</text>
      </g>

      {/* Air Filter */}
      <g 
        onClick={() => onZoneClick?.('zone_air_filter')}
        className={getZoneClasses('zone_air_filter')}
        filter={highlightZoneId === 'zone_air_filter' ? 'url(#motorGlow)' : undefined}
      >
        <ellipse cx="400" cy="100" rx="80" ry="35" strokeWidth="2" fillOpacity="0.3" />
        <ellipse cx="400" cy="100" rx="50" ry="20" className="fill-none stroke-current" strokeWidth="1" />
        <text x="400" y="155" textAnchor="middle" className="fill-current text-xs font-medium">FILTRO DE AR</text>
      </g>

      {/* Spark Plugs */}
      <g 
        onClick={() => onZoneClick?.('zone_spark_plugs')}
        className={getZoneClasses('zone_spark_plugs')}
        filter={highlightZoneId === 'zone_spark_plugs' ? 'url(#motorGlow)' : undefined}
      >
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={295 + i * 60} y="180" width="12" height="30" rx="2" strokeWidth="1.5" fillOpacity="0.5" />
            <line x1={301 + i * 60} y1="180" x2={301 + i * 60} y2="165" className="stroke-current" strokeWidth="2" />
          </g>
        ))}
        <text x="400" y="165" textAnchor="middle" className="fill-current text-[10px] font-medium">VELAS</text>
      </g>

      {/* Oil Pan indicator */}
      <g 
        onClick={() => onZoneClick?.('zone_oil_pan')}
        className={getZoneClasses('zone_oil_pan')}
        filter={highlightZoneId === 'zone_oil_pan' ? 'url(#motorGlow)' : undefined}
      >
        <rect x="280" y="360" width="240" height="40" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <text x="400" y="385" textAnchor="middle" className="fill-current text-xs font-medium">CÁRTER / ÓLEO</text>
      </g>

      {/* Transmission */}
      <g 
        onClick={() => onZoneClick?.('zone_transmission')}
        className={getZoneClasses('zone_transmission')}
        filter={highlightZoneId === 'zone_transmission' ? 'url(#motorGlow)' : undefined}
      >
        <rect x="560" y="200" width="80" height="60" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <text x="600" y="235" textAnchor="middle" className="fill-current text-[10px] font-medium">CÂMBIO</text>
      </g>

      {/* Belts */}
      <path 
        d="M 250 250 Q 200 220 140 250 Q 200 280 250 250" 
        className="fill-none stroke-muted-foreground/50" 
        strokeWidth="3"
        strokeDasharray="5 3"
      />
      <path 
        d="M 550 280 Q 500 250 450 280" 
        className="fill-none stroke-muted-foreground/50" 
        strokeWidth="3"
        strokeDasharray="5 3"
      />

      {/* Title */}
      <text x="400" y="35" textAnchor="middle" className="fill-primary text-sm font-bold">
        VISTA DO COMPARTIMENTO DO MOTOR
      </text>
    </motion.svg>
  );
};

export default MotorView;

import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface InferiorViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const InferiorView = ({ highlightZoneId, onZoneClick }: InferiorViewProps) => {
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
        <filter id="underGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Car underside outline */}
      <path
        d="M 150 80 
           L 650 80 
           Q 700 90 720 120
           L 720 380
           Q 700 410 650 420
           L 150 420
           Q 100 410 80 380
           L 80 120
           Q 100 90 150 80
           Z"
        className="fill-secondary/20 stroke-primary/40"
        strokeWidth="2"
      />

      {/* Front Axle */}
      <line x1="150" y1="130" x2="650" y2="130" className="stroke-muted-foreground/50" strokeWidth="4" />
      
      {/* Rear Axle */}
      <line x1="150" y1="370" x2="650" y2="370" className="stroke-muted-foreground/50" strokeWidth="4" />

      {/* Drive Shaft */}
      <rect x="390" y="130" width="20" height="240" rx="5" className="fill-muted-foreground/30 stroke-muted-foreground/50" strokeWidth="1" />

      {/* Oil Pan / Engine Block */}
      <g 
        onClick={() => onZoneClick?.('zone_oil_pan')}
        className={getZoneClasses('zone_oil_pan')}
        filter={highlightZoneId === 'zone_oil_pan' ? 'url(#underGlow)' : undefined}
      >
        <rect x="300" y="90" width="200" height="80" rx="10" strokeWidth="2" fillOpacity="0.4" />
        <text x="400" y="135" textAnchor="middle" className="fill-current text-xs font-medium">CÁRTER DO MOTOR</text>
        {/* Drain plug */}
        <circle cx="400" cy="155" r="8" className="fill-current" fillOpacity="0.5" />
      </g>

      {/* Transmission */}
      <g 
        onClick={() => onZoneClick?.('zone_transmission')}
        className={getZoneClasses('zone_transmission')}
        filter={highlightZoneId === 'zone_transmission' ? 'url(#underGlow)' : undefined}
      >
        <rect x="360" y="175" width="80" height="60" rx="8" strokeWidth="2" fillOpacity="0.4" />
        <text x="400" y="210" textAnchor="middle" className="fill-current text-[10px] font-medium">CÂMBIO</text>
      </g>

      {/* Exhaust System */}
      <g 
        onClick={() => onZoneClick?.('zone_exhaust')}
        className={getZoneClasses('zone_exhaust')}
        filter={highlightZoneId === 'zone_exhaust' ? 'url(#underGlow)' : undefined}
      >
        {/* Exhaust pipe path */}
        <path 
          d="M 500 130 L 500 180 Q 480 200 460 220 L 460 350 Q 450 370 430 380 L 200 380"
          className="fill-none stroke-current"
          strokeWidth="8"
          strokeLinecap="round"
          fillOpacity="0.3"
        />
        <text x="330" y="360" textAnchor="middle" className="fill-current text-xs font-medium">ESCAPAMENTO</text>
      </g>

      {/* Catalytic Converter */}
      <g 
        onClick={() => onZoneClick?.('zone_catalytic')}
        className={getZoneClasses('zone_catalytic')}
        filter={highlightZoneId === 'zone_catalytic' ? 'url(#underGlow)' : undefined}
      >
        <ellipse cx="460" cy="280" rx="25" ry="40" strokeWidth="2" fillOpacity="0.4" />
        <text x="460" y="340" textAnchor="middle" className="fill-current text-[10px] font-medium">CATALISADOR</text>
      </g>

      {/* Muffler */}
      <g 
        onClick={() => onZoneClick?.('zone_muffler')}
        className={getZoneClasses('zone_muffler')}
        filter={highlightZoneId === 'zone_muffler' ? 'url(#underGlow)' : undefined}
      >
        <rect x="180" y="360" width="80" height="40" rx="10" strokeWidth="2" fillOpacity="0.4" />
        <text x="220" y="420" textAnchor="middle" className="fill-current text-[10px] font-medium">SILENCIADOR</text>
      </g>

      {/* Fuel Tank */}
      <g 
        onClick={() => onZoneClick?.('zone_fuel_tank')}
        className={getZoneClasses('zone_fuel_tank')}
        filter={highlightZoneId === 'zone_fuel_tank' ? 'url(#underGlow)' : undefined}
      >
        <rect x="520" y="280" width="140" height="80" rx="10" strokeWidth="2" fillOpacity="0.4" />
        <text x="590" y="325" textAnchor="middle" className="fill-current text-xs font-medium">TANQUE</text>
      </g>

      {/* Front Left Wheel */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_front_left')}
        className={getZoneClasses('zone_wheel_front_left')}
        filter={highlightZoneId === 'zone_wheel_front_left' ? 'url(#underGlow)' : undefined}
      >
        <ellipse cx="130" cy="130" rx="40" ry="30" strokeWidth="2" fillOpacity="0.3" />
        <ellipse cx="130" cy="130" rx="20" ry="15" className="fill-none stroke-current" strokeWidth="1" />
      </g>

      {/* Front Right Wheel */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_front_right')}
        className={getZoneClasses('zone_wheel_front_right')}
        filter={highlightZoneId === 'zone_wheel_front_right' ? 'url(#underGlow)' : undefined}
      >
        <ellipse cx="670" cy="130" rx="40" ry="30" strokeWidth="2" fillOpacity="0.3" />
        <ellipse cx="670" cy="130" rx="20" ry="15" className="fill-none stroke-current" strokeWidth="1" />
      </g>

      {/* Rear Left Wheel */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_rear_left')}
        className={getZoneClasses('zone_wheel_rear_left')}
        filter={highlightZoneId === 'zone_wheel_rear_left' ? 'url(#underGlow)' : undefined}
      >
        <ellipse cx="130" cy="370" rx="40" ry="30" strokeWidth="2" fillOpacity="0.3" />
        <ellipse cx="130" cy="370" rx="20" ry="15" className="fill-none stroke-current" strokeWidth="1" />
      </g>

      {/* Rear Right Wheel */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_rear_right')}
        className={getZoneClasses('zone_wheel_rear_right')}
        filter={highlightZoneId === 'zone_wheel_rear_right' ? 'url(#underGlow)' : undefined}
      >
        <ellipse cx="670" cy="370" rx="40" ry="30" strokeWidth="2" fillOpacity="0.3" />
        <ellipse cx="670" cy="370" rx="20" ry="15" className="fill-none stroke-current" strokeWidth="1" />
      </g>

      {/* Front Suspension */}
      <g 
        onClick={() => onZoneClick?.('zone_suspension_front')}
        className={getZoneClasses('zone_suspension_front')}
        filter={highlightZoneId === 'zone_suspension_front' ? 'url(#underGlow)' : undefined}
      >
        <rect x="180" y="110" width="100" height="40" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <rect x="520" y="110" width="100" height="40" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <text x="400" y="80" textAnchor="middle" className="fill-current text-xs font-medium">SUSPENSÃO DIANTEIRA</text>
      </g>

      {/* Rear Suspension */}
      <g 
        onClick={() => onZoneClick?.('zone_suspension_rear')}
        className={getZoneClasses('zone_suspension_rear')}
        filter={highlightZoneId === 'zone_suspension_rear' ? 'url(#underGlow)' : undefined}
      >
        <rect x="180" y="350" width="100" height="40" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <rect x="520" y="350" width="100" height="40" rx="5" strokeWidth="2" fillOpacity="0.3" />
        <text x="400" y="440" textAnchor="middle" className="fill-current text-xs font-medium">SUSPENSÃO TRASEIRA</text>
      </g>

      {/* Brake Lines */}
      <path 
        d="M 200 130 L 200 200 L 300 200 M 600 130 L 600 200 L 500 200"
        className="stroke-destructive/30"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
      />
      <path 
        d="M 200 370 L 200 300 L 300 300 M 600 370 L 600 300 L 500 300"
        className="stroke-destructive/30"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
      />

      {/* Title */}
      <text x="400" y="35" textAnchor="middle" className="fill-primary text-sm font-bold">
        VISTA INFERIOR (CHASSIS)
      </text>

      {/* Direction indicator */}
      <g className="fill-muted-foreground">
        <polygon points="400,460 390,475 410,475" />
        <text x="400" y="490" textAnchor="middle" className="text-[10px]">FRENTE</text>
      </g>
    </motion.svg>
  );
};

export default InferiorView;

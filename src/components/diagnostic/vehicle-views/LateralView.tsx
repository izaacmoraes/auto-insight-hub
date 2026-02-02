import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface LateralViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const LateralView = ({ highlightZoneId, onZoneClick }: LateralViewProps) => {
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
      viewBox="0 0 800 400"
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ filter: 'drop-shadow(0 0 20px hsl(187 92% 44% / 0.2))' }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="warningGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Car body outline */}
      <g filter="url(#glow)">
        <path
          d="M 120 280 
             L 120 220 
             Q 130 180 180 170
             L 280 160
             Q 320 120 380 110
             L 480 110
             Q 540 115 580 150
             L 650 170
             Q 700 175 710 220
             L 710 280
             Q 700 290 680 290
             L 640 290
             Q 620 290 610 280
             L 230 280
             Q 220 290 200 290
             L 160 290
             Q 140 290 120 280
             Z"
          className="fill-secondary/30 stroke-primary"
          strokeWidth="2"
        />
        
        {/* Roof line */}
        <path
          d="M 280 160 Q 320 120 380 110 L 480 110 Q 540 115 580 150"
          className="fill-none stroke-primary"
          strokeWidth="1.5"
        />
        
        {/* Windows */}
        <path
          d="M 290 158 Q 325 125 380 118 L 420 118 L 420 155 L 290 158 Z"
          className="fill-primary/10 stroke-primary/60"
          strokeWidth="1"
        />
        <path
          d="M 430 118 L 475 118 Q 530 122 565 152 L 430 155 Z"
          className="fill-primary/10 stroke-primary/60"
          strokeWidth="1"
        />
        
        {/* Door lines */}
        <line x1="420" y1="155" x2="420" y2="270" className="stroke-primary/40" strokeWidth="1" />
        
        {/* Hood lines */}
        <path
          d="M 650 170 L 690 180 Q 700 185 705 200"
          className="fill-none stroke-primary/60"
          strokeWidth="1"
        />
        
        {/* Trunk lines */}
        <path
          d="M 180 170 L 140 185 Q 125 195 125 210"
          className="fill-none stroke-primary/60"
          strokeWidth="1"
        />
      </g>

      {/* Headlights */}
      <g
        onClick={() => onZoneClick?.('zone_headlight')}
        className={getZoneClasses('zone_headlight')}
        filter={highlightZoneId === 'zone_headlight' ? 'url(#warningGlow)' : undefined}
      >
        <ellipse cx="700" cy="215" rx="12" ry="18" strokeWidth="1.5" fillOpacity="0.4" />
      </g>
      
      {/* Taillights */}
      <g
        onClick={() => onZoneClick?.('zone_taillight')}
        className={getZoneClasses('zone_taillight')}
        filter={highlightZoneId === 'zone_taillight' ? 'url(#warningGlow)' : undefined}
      >
        <ellipse cx="130" cy="215" rx="10" ry="15" strokeWidth="1.5" fillOpacity="0.4" />
      </g>

      {/* Engine Zone */}
      <g 
        onClick={() => onZoneClick?.('zone_engine_block')}
        className={getZoneClasses('zone_engine_block')}
        filter={highlightZoneId === 'zone_engine_block' ? 'url(#warningGlow)' : undefined}
      >
        <rect x="600" y="165" width="100" height="80" rx="8" strokeWidth="2" fillOpacity="0.3" />
        <text x="650" y="210" textAnchor="middle" className="fill-current text-xs font-medium">MOTOR</text>
      </g>

      {/* Front Wheel - Left */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_front_right')}
        className={getZoneClasses('zone_wheel_front_right')}
        filter={highlightZoneId === 'zone_wheel_front_right' ? 'url(#warningGlow)' : undefined}
      >
        <circle cx="620" cy="290" r="45" strokeWidth="2" fillOpacity="0.3" />
        <circle cx="620" cy="290" r="35" className="fill-none stroke-current" strokeWidth="1" />
        <circle cx="620" cy="290" r="15" className="fill-none stroke-current" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line 
            key={angle}
            x1={620 + 15 * Math.cos(angle * Math.PI / 180)} 
            y1={290 + 15 * Math.sin(angle * Math.PI / 180)}
            x2={620 + 35 * Math.cos(angle * Math.PI / 180)} 
            y2={290 + 35 * Math.sin(angle * Math.PI / 180)}
            className="stroke-current"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Front Brake Zone */}
      <g 
        onClick={() => onZoneClick?.('zone_brake_front')}
        className={getZoneClasses('zone_brake_front')}
        filter={highlightZoneId === 'zone_brake_front' ? 'url(#warningGlow)' : undefined}
      >
        <circle cx="620" cy="290" r="25" strokeWidth="3" fillOpacity="0.2" strokeDasharray="5 3" />
      </g>

      {/* Rear Wheel */}
      <g 
        onClick={() => onZoneClick?.('zone_wheel_rear_left')}
        className={getZoneClasses('zone_wheel_rear_left')}
        filter={highlightZoneId === 'zone_wheel_rear_left' ? 'url(#warningGlow)' : undefined}
      >
        <circle cx="210" cy="290" r="45" strokeWidth="2" fillOpacity="0.3" />
        <circle cx="210" cy="290" r="35" className="fill-none stroke-current" strokeWidth="1" />
        <circle cx="210" cy="290" r="15" className="fill-none stroke-current" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line 
            key={angle}
            x1={210 + 15 * Math.cos(angle * Math.PI / 180)} 
            y1={290 + 15 * Math.sin(angle * Math.PI / 180)}
            x2={210 + 35 * Math.cos(angle * Math.PI / 180)} 
            y2={290 + 35 * Math.sin(angle * Math.PI / 180)}
            className="stroke-current"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Rear Brake Zone */}
      <g 
        onClick={() => onZoneClick?.('zone_brake_rear')}
        className={getZoneClasses('zone_brake_rear')}
        filter={highlightZoneId === 'zone_brake_rear' ? 'url(#warningGlow)' : undefined}
      >
        <circle cx="210" cy="290" r="25" strokeWidth="3" fillOpacity="0.2" strokeDasharray="5 3" />
      </g>

      {/* Exhaust Zone */}
      <g 
        onClick={() => onZoneClick?.('zone_exhaust')}
        className={getZoneClasses('zone_exhaust')}
        filter={highlightZoneId === 'zone_exhaust' ? 'url(#warningGlow)' : undefined}
      >
        <rect x="100" y="255" width="60" height="25" rx="4" strokeWidth="2" fillOpacity="0.3" />
        <rect x="90" y="262" width="15" height="10" rx="2" className="fill-current" fillOpacity="0.5" />
        <text x="130" y="272" textAnchor="middle" className="fill-current text-[10px]">ESCAPE</text>
      </g>

      {/* Internal structure lines */}
      <g className="stroke-primary/20" strokeWidth="0.5">
        <rect x="610" y="175" width="80" height="55" rx="4" className="fill-none" />
        <rect x="530" y="220" width="70" height="35" rx="4" className="fill-none" />
        <line x1="530" y1="240" x2="280" y2="260" />
        <line x1="620" y1="260" x2="620" y2="245" />
        <line x1="590" y1="260" x2="570" y2="240" />
        <line x1="210" y1="260" x2="210" y2="245" />
        <line x1="240" y1="260" x2="280" y2="240" />
        <path d="M 600 265 L 400 270 Q 300 272 200 270 L 105 267" className="fill-none" />
      </g>

      {/* Zone Labels */}
      <g className="fill-muted-foreground text-xs">
        <text x="650" y="145" textAnchor="middle" className={highlightZoneId === 'zone_engine_block' ? 'fill-warning font-bold' : ''}>
          Motor
        </text>
        <text x="620" y="355" textAnchor="middle" className={highlightZoneId?.includes('front') ? 'fill-warning font-bold' : ''}>
          Suspensão/Freios
        </text>
        <text x="210" y="355" textAnchor="middle" className={highlightZoneId?.includes('rear') ? 'fill-warning font-bold' : ''}>
          Suspensão Traseira
        </text>
        <text x="130" y="300" textAnchor="middle" className={highlightZoneId === 'zone_exhaust' ? 'fill-warning font-bold' : ''}>
          Escapamento
        </text>
      </g>

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="fill-primary text-sm font-bold">
        VISTA LATERAL
      </text>
    </motion.svg>
  );
};

export default LateralView;

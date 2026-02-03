import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface InferiorViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const InferiorView = ({ highlightZoneId, onZoneClick }: InferiorViewProps) => {
  const isHighlighted = (zoneId: HighlightZoneId) => highlightZoneId === zoneId;

  const getZoneClasses = (zoneId: HighlightZoneId) => {
    return cn(
      "transition-all duration-500 cursor-pointer",
      isHighlighted(zoneId)
        ? "fill-[hsl(var(--warning))]/40 stroke-[hsl(var(--warning))]" 
        : "fill-[hsl(var(--primary))]/10 stroke-[hsl(var(--primary))]/60 hover:fill-[hsl(var(--primary))]/30 hover:stroke-[hsl(var(--primary))]"
    );
  };

  const getLabelClasses = (zoneId: HighlightZoneId) => {
    return cn(
      "text-[10px] font-medium transition-all duration-300",
      isHighlighted(zoneId) ? "fill-[hsl(var(--warning))]" : "fill-[hsl(var(--muted-foreground))]"
    );
  };

  return (
    <motion.div
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <svg
        viewBox="0 0 900 550"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px hsl(187 92% 44% / 0.15))' }}
      >
        <defs>
          <pattern id="gridPatternInferior" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(187 92% 44% / 0.08)" strokeWidth="0.5" />
          </pattern>
          
          <filter id="cyanGlowInferior" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="warningGlowInferior" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="chassisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 92% 44% / 0.08)" />
            <stop offset="100%" stopColor="hsl(220 14% 10% / 0.95)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#gridPatternInferior)" />

        {/* Car underside outline */}
        <path
          d="M 180 80 
             L 720 80 
             Q 780 95 800 140
             L 800 410
             Q 780 455 720 470
             L 180 470
             Q 120 455 100 410
             L 100 140
             Q 120 95 180 80
             Z"
          fill="url(#chassisGradient)"
          className="stroke-[hsl(var(--primary))]/30"
          strokeWidth="2"
        />

        {/* Front Axle */}
        <line x1="140" y1="140" x2="760" y2="140" className="stroke-[hsl(var(--muted-foreground))]/40" strokeWidth="6" />
        
        {/* Rear Axle */}
        <line x1="140" y1="410" x2="760" y2="410" className="stroke-[hsl(var(--muted-foreground))]/40" strokeWidth="6" />

        {/* Drive Shaft */}
        <rect x="435" y="145" width="30" height="260" rx="8" className="fill-[hsl(var(--muted-foreground))]/20 stroke-[hsl(var(--muted-foreground))]/40" strokeWidth="1.5" />

        {/* Oil Pan */}
        <g 
          onClick={() => onZoneClick?.('zone_oil_pan')}
          className={getZoneClasses('zone_oil_pan')}
          filter={isHighlighted('zone_oil_pan') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="330" y="95" width="240" height="90" rx="12" strokeWidth="2" fillOpacity="0.4" />
          {/* Drain plug */}
          <circle cx="450" cy="165" r="12" className="fill-current" fillOpacity="0.5" />
          <circle cx="450" cy="165" r="6" className="fill-none stroke-current" strokeWidth="1" />
          {/* Oil pan ribbing */}
          <line x1="350" y1="120" x2="550" y2="120" className="stroke-current" strokeWidth="0.75" opacity="0.4" />
          <line x1="350" y1="145" x2="550" y2="145" className="stroke-current" strokeWidth="0.75" opacity="0.4" />
          {isHighlighted('zone_oil_pan') && (
            <g className="animate-pulse">
              <circle cx="570" cy="100" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="570" y="105" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="205" textAnchor="middle" className={getLabelClasses('zone_oil_pan')}>CÁRTER DO MOTOR</text>

        {/* Transmission */}
        <g 
          onClick={() => onZoneClick?.('zone_transmission')}
          className={getZoneClasses('zone_transmission')}
          filter={isHighlighted('zone_transmission') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="395" y="195" width="110" height="75" rx="10" strokeWidth="2" fillOpacity="0.4" />
          {/* Gear pattern */}
          <circle cx="450" cy="232" r="20" className="fill-none stroke-current" strokeWidth="1" opacity="0.5" />
          {isHighlighted('zone_transmission') && (
            <g className="animate-pulse">
              <circle cx="505" cy="195" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="505" y="199" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="290" textAnchor="middle" className={getLabelClasses('zone_transmission')}>CÂMBIO</text>

        {/* Exhaust System */}
        <g 
          onClick={() => onZoneClick?.('zone_exhaust')}
          className={getZoneClasses('zone_exhaust')}
          filter={isHighlighted('zone_exhaust') ? 'url(#warningGlowInferior)' : undefined}
        >
          {/* Exhaust pipe path */}
          <path 
            d="M 570 140 L 570 200 Q 550 230 520 260 L 520 380 Q 510 410 480 420 L 220 420"
            className="fill-none stroke-current"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {isHighlighted('zone_exhaust') && (
            <g className="animate-pulse">
              <circle cx="520" cy="320" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="520" y="325" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="370" y="395" textAnchor="middle" className={getLabelClasses('zone_exhaust')}>ESCAPAMENTO</text>

        {/* Catalytic Converter */}
        <g 
          onClick={() => onZoneClick?.('zone_catalytic')}
          className={getZoneClasses('zone_catalytic')}
          filter={isHighlighted('zone_catalytic') ? 'url(#warningGlowInferior)' : undefined}
        >
          <ellipse cx="520" cy="310" rx="30" ry="50" strokeWidth="2" fillOpacity="0.4" />
          {/* Honeycomb pattern hint */}
          <ellipse cx="520" cy="310" rx="18" ry="35" className="fill-none stroke-current" strokeWidth="0.75" opacity="0.5" />
          {isHighlighted('zone_catalytic') && (
            <g className="animate-pulse">
              <circle cx="550" cy="265" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="550" y="269" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="520" y="375" textAnchor="middle" className={getLabelClasses('zone_catalytic')}>CATALISADOR</text>

        {/* Muffler */}
        <g 
          onClick={() => onZoneClick?.('zone_muffler')}
          className={getZoneClasses('zone_muffler')}
          filter={isHighlighted('zone_muffler') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="180" y="395" width="100" height="55" rx="12" strokeWidth="2" fillOpacity="0.4" />
          {/* Muffler exit pipe */}
          <ellipse cx="165" cy="422" rx="10" ry="15" className="fill-current" fillOpacity="0.5" />
          {isHighlighted('zone_muffler') && (
            <g className="animate-pulse">
              <circle cx="280" cy="395" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="280" y="399" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="230" y="470" textAnchor="middle" className={getLabelClasses('zone_muffler')}>SILENCIADOR</text>

        {/* Fuel Tank */}
        <g 
          onClick={() => onZoneClick?.('zone_fuel_tank')}
          className={getZoneClasses('zone_fuel_tank')}
          filter={isHighlighted('zone_fuel_tank') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="590" y="300" width="160" height="100" rx="12" strokeWidth="2" fillOpacity="0.4" />
          {/* Fuel pump */}
          <circle cx="670" cy="350" r="20" className="fill-current" fillOpacity="0.3" />
          {/* Fuel lines */}
          <path d="M 650 300 L 650 280 Q 650 270 640 270 L 580 270" className="fill-none stroke-current" strokeWidth="2" />
          {isHighlighted('zone_fuel_tank') && (
            <g className="animate-pulse">
              <circle cx="750" cy="295" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="750" y="300" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="670" y="420" textAnchor="middle" className={getLabelClasses('zone_fuel_tank')}>TANQUE</text>

        {/* Front Left Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_front_left')}
          className={getZoneClasses('zone_wheel_front_left')}
          filter={isHighlighted('zone_wheel_front_left') ? 'url(#warningGlowInferior)' : undefined}
        >
          <ellipse cx="140" cy="140" rx="50" ry="38" strokeWidth="2" fillOpacity="0.25" />
          <ellipse cx="140" cy="140" rx="30" ry="22" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="140" cy="140" rx="10" ry="8" className="fill-current" fillOpacity="0.5" />
        </g>

        {/* Front Right Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_front_right')}
          className={getZoneClasses('zone_wheel_front_right')}
          filter={isHighlighted('zone_wheel_front_right') ? 'url(#warningGlowInferior)' : undefined}
        >
          <ellipse cx="760" cy="140" rx="50" ry="38" strokeWidth="2" fillOpacity="0.25" />
          <ellipse cx="760" cy="140" rx="30" ry="22" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="760" cy="140" rx="10" ry="8" className="fill-current" fillOpacity="0.5" />
        </g>

        {/* Rear Left Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_rear_left')}
          className={getZoneClasses('zone_wheel_rear_left')}
          filter={isHighlighted('zone_wheel_rear_left') ? 'url(#warningGlowInferior)' : undefined}
        >
          <ellipse cx="140" cy="410" rx="50" ry="38" strokeWidth="2" fillOpacity="0.25" />
          <ellipse cx="140" cy="410" rx="30" ry="22" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="140" cy="410" rx="10" ry="8" className="fill-current" fillOpacity="0.5" />
        </g>

        {/* Rear Right Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_rear_right')}
          className={getZoneClasses('zone_wheel_rear_right')}
          filter={isHighlighted('zone_wheel_rear_right') ? 'url(#warningGlowInferior)' : undefined}
        >
          <ellipse cx="760" cy="410" rx="50" ry="38" strokeWidth="2" fillOpacity="0.25" />
          <ellipse cx="760" cy="410" rx="30" ry="22" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="760" cy="410" rx="10" ry="8" className="fill-current" fillOpacity="0.5" />
        </g>

        {/* Front Suspension */}
        <g 
          onClick={() => onZoneClick?.('zone_suspension_front')}
          className={getZoneClasses('zone_suspension_front')}
          filter={isHighlighted('zone_suspension_front') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="200" y="115" width="120" height="50" rx="8" strokeWidth="2" fillOpacity="0.3" />
          <rect x="580" y="115" width="120" height="50" rx="8" strokeWidth="2" fillOpacity="0.3" />
          {/* Control arms */}
          <line x1="200" y1="140" x2="140" y2="140" className="stroke-current" strokeWidth="3" />
          <line x1="700" y1="140" x2="760" y2="140" className="stroke-current" strokeWidth="3" />
          {isHighlighted('zone_suspension_front') && (
            <g className="animate-pulse">
              <circle cx="260" cy="100" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="260" y="104" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="75" textAnchor="middle" className={getLabelClasses('zone_suspension_front')}>SUSPENSÃO DIANTEIRA</text>

        {/* Rear Suspension */}
        <g 
          onClick={() => onZoneClick?.('zone_suspension_rear')}
          className={getZoneClasses('zone_suspension_rear')}
          filter={isHighlighted('zone_suspension_rear') ? 'url(#warningGlowInferior)' : undefined}
        >
          <rect x="200" y="385" width="120" height="50" rx="8" strokeWidth="2" fillOpacity="0.3" />
          <rect x="580" y="385" width="120" height="50" rx="8" strokeWidth="2" fillOpacity="0.3" />
          {/* Control arms */}
          <line x1="200" y1="410" x2="140" y2="410" className="stroke-current" strokeWidth="3" />
          <line x1="700" y1="410" x2="760" y2="410" className="stroke-current" strokeWidth="3" />
          {isHighlighted('zone_suspension_rear') && (
            <g className="animate-pulse">
              <circle cx="640" cy="455" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="640" y="459" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="485" textAnchor="middle" className={getLabelClasses('zone_suspension_rear')}>SUSPENSÃO TRASEIRA</text>

        {/* Brake Lines */}
        <g className="stroke-destructive/25" strokeWidth="2" fill="none" strokeDasharray="6 3">
          <path d="M 200 140 L 200 220 Q 200 240 220 240 L 380 240" />
          <path d="M 700 140 L 700 220 Q 700 240 680 240 L 520 240" />
          <path d="M 200 410 L 200 330 Q 200 310 220 310 L 380 310" />
          <path d="M 700 410 L 700 330 Q 700 310 680 310 L 520 310" />
        </g>

        {/* View Title */}
        <text x="450" y="40" textAnchor="middle" className="fill-[hsl(var(--primary))] text-sm font-bold tracking-widest">
          VISTA INFERIOR (CHASSIS)
        </text>

        {/* Direction indicator */}
        <g className="fill-[hsl(var(--muted-foreground))]">
          <polygon points="450,510 440,525 460,525" />
          <text x="450" y="540" textAnchor="middle" className="text-[10px]">FRENTE</text>
        </g>

        {/* Technical corner markers */}
        <g className="stroke-[hsl(var(--primary))]/40" strokeWidth="1">
          <path d="M 30 30 L 30 60 M 30 30 L 60 30" />
          <path d="M 870 30 L 870 60 M 870 30 L 840 30" />
          <path d="M 30 520 L 30 490 M 30 520 L 60 520" />
          <path d="M 870 520 L 870 490 M 870 520 L 840 520" />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/30 border border-primary" />
          <span className="text-muted-foreground">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning/50 border border-warning animate-pulse" />
          <span className="text-muted-foreground">Problema</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InferiorView;

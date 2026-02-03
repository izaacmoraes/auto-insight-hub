import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface FrontalViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const FrontalView = ({ highlightZoneId, onZoneClick }: FrontalViewProps) => {
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
        viewBox="0 0 800 500"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px hsl(187 92% 44% / 0.15))' }}
      >
        <defs>
          <pattern id="gridPatternFront" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(187 92% 44% / 0.08)" strokeWidth="0.5" />
          </pattern>
          
          <filter id="cyanGlowFront" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="warningGlowFront" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="bodyGradientFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 92% 44% / 0.15)" />
            <stop offset="100%" stopColor="hsl(187 92% 44% / 0.05)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#gridPatternFront)" />

        {/* Car Body - Front View */}
        <g filter="url(#cyanGlowFront)">
          {/* Main body outline */}
          <path
            d="M 200 380 
               L 200 280 
               Q 200 240 230 220
               L 270 180
               Q 300 140 400 130
               Q 500 140 530 180
               L 570 220
               Q 600 240 600 280
               L 600 380
               Q 580 400 550 400
               L 250 400
               Q 220 400 200 380
               Z"
            fill="url(#bodyGradientFront)"
            className="stroke-[hsl(var(--primary))]"
            strokeWidth="2"
          />
          
          {/* Windshield */}
          <path
            d="M 280 200 Q 340 160 400 155 Q 460 160 520 200 L 520 250 L 280 250 Z"
            className="fill-[hsl(var(--primary))]/5 stroke-[hsl(var(--primary))]/40"
            strokeWidth="1"
          />
          
          {/* Hood line */}
          <path
            d="M 250 265 Q 320 250 400 245 Q 480 250 550 265"
            className="fill-none stroke-[hsl(var(--primary))]/40"
            strokeWidth="1"
          />
          
          {/* Grille */}
          <rect x="320" y="280" width="160" height="50" rx="5" className="fill-[hsl(var(--primary))]/10 stroke-[hsl(var(--primary))]/50" strokeWidth="1" />
          {/* Grille lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="330" y1={290 + i * 10} x2="470" y2={290 + i * 10} className="stroke-[hsl(var(--primary))]/30" strokeWidth="0.5" />
          ))}
          
          {/* Side mirrors */}
          <ellipse cx="180" cy="220" rx="15" ry="25" className="fill-[hsl(var(--primary))]/10 stroke-[hsl(var(--primary))]/60" strokeWidth="1" />
          <ellipse cx="620" cy="220" rx="15" ry="25" className="fill-[hsl(var(--primary))]/10 stroke-[hsl(var(--primary))]/60" strokeWidth="1" />
        </g>

        {/* Headlights */}
        <g
          onClick={() => onZoneClick?.('zone_headlight')}
          className={getZoneClasses('zone_headlight')}
          filter={isHighlighted('zone_headlight') ? 'url(#warningGlowFront)' : undefined}
        >
          <ellipse cx="250" cy="290" rx="35" ry="25" strokeWidth="2" fillOpacity="0.4" />
          <ellipse cx="250" cy="290" rx="20" ry="15" className="fill-current" fillOpacity="0.3" />
          <ellipse cx="550" cy="290" rx="35" ry="25" strokeWidth="2" fillOpacity="0.4" />
          <ellipse cx="550" cy="290" rx="20" ry="15" className="fill-current" fillOpacity="0.3" />
          {isHighlighted('zone_headlight') && (
            <>
              <g className="animate-pulse">
                <circle cx="250" cy="255" r="12" className="fill-[hsl(var(--warning))]" />
                <text x="250" y="260" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
              </g>
              <g className="animate-pulse">
                <circle cx="550" cy="255" r="12" className="fill-[hsl(var(--warning))]" />
                <text x="550" y="260" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
              </g>
            </>
          )}
        </g>
        <text x="250" y="330" textAnchor="middle" className={getLabelClasses('zone_headlight')}>FAROL ESQ.</text>
        <text x="550" y="330" textAnchor="middle" className={getLabelClasses('zone_headlight')}>FAROL DIR.</text>

        {/* Radiator / Engine area */}
        <g 
          onClick={() => onZoneClick?.('zone_radiator')}
          className={getZoneClasses('zone_radiator')}
          filter={isHighlighted('zone_radiator') ? 'url(#warningGlowFront)' : undefined}
        >
          <rect x="340" y="340" width="120" height="50" rx="5" strokeWidth="2" fillOpacity="0.4" />
          {/* Radiator fins */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={350 + i * 15} y1="345" x2={350 + i * 15} y2="385" className="stroke-current" strokeWidth="1" opacity="0.5" />
          ))}
          {isHighlighted('zone_radiator') && (
            <g className="animate-pulse">
              <circle cx="400" cy="325" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="400" y="330" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="400" y="410" textAnchor="middle" className={getLabelClasses('zone_radiator')}>RADIADOR</text>

        {/* Front Left Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_front_left')}
          className={getZoneClasses('zone_wheel_front_left')}
          filter={isHighlighted('zone_wheel_front_left') ? 'url(#warningGlowFront)' : undefined}
        >
          <ellipse cx="150" cy="380" rx="45" ry="55" strokeWidth="2" fillOpacity="0.2" />
          <ellipse cx="150" cy="380" rx="30" ry="40" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="150" cy="380" rx="12" ry="18" className="fill-current" fillOpacity="0.4" />
          {isHighlighted('zone_wheel_front_left') && (
            <g className="animate-pulse">
              <circle cx="195" cy="340" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="195" y="345" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="150" y="455" textAnchor="middle" className={getLabelClasses('zone_wheel_front_left')}>RODA ESQ.</text>

        {/* Front Right Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_front_right')}
          className={getZoneClasses('zone_wheel_front_right')}
          filter={isHighlighted('zone_wheel_front_right') ? 'url(#warningGlowFront)' : undefined}
        >
          <ellipse cx="650" cy="380" rx="45" ry="55" strokeWidth="2" fillOpacity="0.2" />
          <ellipse cx="650" cy="380" rx="30" ry="40" className="fill-none stroke-current" strokeWidth="1.5" />
          <ellipse cx="650" cy="380" rx="12" ry="18" className="fill-current" fillOpacity="0.4" />
          {isHighlighted('zone_wheel_front_right') && (
            <g className="animate-pulse">
              <circle cx="605" cy="340" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="605" y="345" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="650" y="455" textAnchor="middle" className={getLabelClasses('zone_wheel_front_right')}>RODA DIR.</text>

        {/* Front Brakes */}
        <g 
          onClick={() => onZoneClick?.('zone_brake_front')}
          className={getZoneClasses('zone_brake_front')}
          filter={isHighlighted('zone_brake_front') ? 'url(#warningGlowFront)' : undefined}
        >
          <ellipse cx="150" cy="380" rx="20" ry="28" strokeWidth="3" fillOpacity="0.15" strokeDasharray="6 3" />
          <ellipse cx="650" cy="380" rx="20" ry="28" strokeWidth="3" fillOpacity="0.15" strokeDasharray="6 3" />
        </g>

        {/* Suspension - Front */}
        <g 
          onClick={() => onZoneClick?.('zone_suspension_front')}
          className={getZoneClasses('zone_suspension_front')}
          filter={isHighlighted('zone_suspension_front') ? 'url(#warningGlowFront)' : undefined}
        >
          {/* Left suspension strut */}
          <rect x="190" y="350" width="15" height="60" rx="3" strokeWidth="1.5" fillOpacity="0.4" />
          {/* Right suspension strut */}
          <rect x="595" y="350" width="15" height="60" rx="3" strokeWidth="1.5" fillOpacity="0.4" />
          {isHighlighted('zone_suspension_front') && (
            <g className="animate-pulse">
              <circle cx="197" cy="335" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="197" y="339" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>

        {/* View Title */}
        <text x="400" y="40" textAnchor="middle" className="fill-[hsl(var(--primary))] text-sm font-bold tracking-widest">
          VISTA FRONTAL
        </text>

        {/* Technical corner markers */}
        <g className="stroke-[hsl(var(--primary))]/40" strokeWidth="1">
          <path d="M 30 30 L 30 60 M 30 30 L 60 30" />
          <path d="M 770 30 L 770 60 M 770 30 L 740 30" />
          <path d="M 30 470 L 30 440 M 30 470 L 60 470" />
          <path d="M 770 470 L 770 440 M 770 470 L 740 470" />
        </g>

        {/* Center axis line */}
        <line x1="400" y1="60" x2="400" y2="120" className="stroke-[hsl(var(--primary))]/20" strokeWidth="1" strokeDasharray="4 2" />
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

export default FrontalView;

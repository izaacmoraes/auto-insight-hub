import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface LateralViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const LateralView = ({ highlightZoneId, onZoneClick }: LateralViewProps) => {
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
        viewBox="0 0 900 450"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px hsl(187 92% 44% / 0.15))' }}
      >
        <defs>
          {/* Grid pattern for blueprint effect */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(187 92% 44% / 0.08)" strokeWidth="0.5" />
          </pattern>
          
          {/* Glow filter for normal elements */}
          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Warning glow for highlighted elements */}
          <filter id="warningGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for car body */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 92% 44% / 0.15)" />
            <stop offset="100%" stopColor="hsl(187 92% 44% / 0.05)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Car Body Outline - Sleek sedan profile */}
        <g filter="url(#cyanGlow)">
          {/* Main body shell */}
          <path
            d="M 130 300 
               L 130 250 
               Q 140 210 200 195
               L 280 185
               Q 340 140 420 125
               L 540 125
               Q 610 135 660 175
               L 740 195
               Q 800 205 810 250
               L 810 300
               Q 795 315 770 315
               L 720 315
               Q 690 315 680 295
               L 280 295
               Q 270 315 240 315
               L 190 315
               Q 160 315 130 300
               Z"
            fill="url(#bodyGradient)"
            className="stroke-[hsl(var(--primary))]"
            strokeWidth="2"
          />
          
          {/* Roof line */}
          <path
            d="M 310 180 Q 360 135 420 125 L 540 125 Q 600 135 640 170"
            className="fill-none stroke-[hsl(var(--primary))]"
            strokeWidth="1.5"
          />
          
          {/* Front window */}
          <path
            d="M 320 178 Q 370 140 420 132 L 470 132 L 470 172 L 320 178 Z"
            className="fill-[hsl(var(--primary))]/5 stroke-[hsl(var(--primary))]/40"
            strokeWidth="1"
          />
          
          {/* Rear window */}
          <path
            d="M 485 132 L 540 132 Q 590 140 620 168 L 485 172 Z"
            className="fill-[hsl(var(--primary))]/5 stroke-[hsl(var(--primary))]/40"
            strokeWidth="1"
          />
          
          {/* Door line */}
          <line x1="480" y1="172" x2="480" y2="285" className="stroke-[hsl(var(--primary))]/30" strokeWidth="1" />
          
          {/* Door handle */}
          <rect x="380" y="210" width="30" height="8" rx="2" className="fill-[hsl(var(--primary))]/20 stroke-[hsl(var(--primary))]/40" strokeWidth="0.5" />
          
          {/* Hood lines */}
          <path d="M 740 195 L 790 210 Q 805 220 808 240" className="fill-none stroke-[hsl(var(--primary))]/40" strokeWidth="1" />
          
          {/* Trunk lines */}
          <path d="M 200 195 L 150 215 Q 135 230 132 250" className="fill-none stroke-[hsl(var(--primary))]/40" strokeWidth="1" />

          {/* Side skirt line */}
          <path d="M 190 290 L 750 290" className="fill-none stroke-[hsl(var(--primary))]/30" strokeWidth="0.5" />
        </g>

        {/* Engine Zone */}
        <g 
          onClick={() => onZoneClick?.('zone_engine_block')}
          className={getZoneClasses('zone_engine_block')}
          filter={isHighlighted('zone_engine_block') ? 'url(#warningGlow)' : undefined}
        >
          <rect x="700" y="185" width="95" height="85" rx="8" strokeWidth="2" fillOpacity="0.4" />
          {/* Engine internal lines */}
          <line x1="715" y1="200" x2="780" y2="200" className="stroke-current" strokeWidth="0.5" opacity="0.5" />
          <line x1="715" y1="220" x2="780" y2="220" className="stroke-current" strokeWidth="0.5" opacity="0.5" />
          <line x1="715" y1="240" x2="780" y2="240" className="stroke-current" strokeWidth="0.5" opacity="0.5" />
          {isHighlighted('zone_engine_block') && (
            <g className="animate-pulse">
              <circle cx="795" cy="180" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="795" y="185" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="747" y="290" textAnchor="middle" className={getLabelClasses('zone_engine_block')}>MOTOR</text>

        {/* Headlight */}
        <g
          onClick={() => onZoneClick?.('zone_headlight')}
          className={getZoneClasses('zone_headlight')}
          filter={isHighlighted('zone_headlight') ? 'url(#warningGlow)' : undefined}
        >
          <ellipse cx="800" cy="240" rx="14" ry="22" strokeWidth="1.5" fillOpacity="0.5" />
          <ellipse cx="800" cy="240" rx="8" ry="14" className="fill-current" fillOpacity="0.3" />
        </g>

        {/* Taillight */}
        <g
          onClick={() => onZoneClick?.('zone_taillight')}
          className={getZoneClasses('zone_taillight')}
          filter={isHighlighted('zone_taillight') ? 'url(#warningGlow)' : undefined}
        >
          <ellipse cx="142" cy="235" rx="12" ry="18" strokeWidth="1.5" fillOpacity="0.5" />
          <ellipse cx="142" cy="235" rx="6" ry="10" className="fill-current" fillOpacity="0.3" />
        </g>

        {/* Front Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_front_right')}
          className={getZoneClasses('zone_wheel_front_right')}
          filter={isHighlighted('zone_wheel_front_right') ? 'url(#warningGlow)' : undefined}
        >
          <circle cx="700" cy="310" r="52" strokeWidth="2.5" fillOpacity="0.2" />
          <circle cx="700" cy="310" r="40" className="fill-none stroke-current" strokeWidth="1.5" />
          <circle cx="700" cy="310" r="18" className="fill-none stroke-current" strokeWidth="1" />
          <circle cx="700" cy="310" r="8" className="fill-current" fillOpacity="0.4" />
          {/* Wheel spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line 
              key={angle}
              x1={700 + 18 * Math.cos(angle * Math.PI / 180)} 
              y1={310 + 18 * Math.sin(angle * Math.PI / 180)}
              x2={700 + 40 * Math.cos(angle * Math.PI / 180)} 
              y2={310 + 40 * Math.sin(angle * Math.PI / 180)}
              className="stroke-current"
              strokeWidth="2"
            />
          ))}
          {isHighlighted('zone_wheel_front_right') && (
            <g className="animate-pulse">
              <circle cx="750" cy="270" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="750" y="275" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="700" y="385" textAnchor="middle" className={getLabelClasses('zone_wheel_front_right')}>RODA DIANT.</text>

        {/* Front Brake */}
        <g 
          onClick={() => onZoneClick?.('zone_brake_front')}
          className={getZoneClasses('zone_brake_front')}
          filter={isHighlighted('zone_brake_front') ? 'url(#warningGlow)' : undefined}
        >
          <circle cx="700" cy="310" r="28" strokeWidth="4" fillOpacity="0.15" strokeDasharray="8 4" />
        </g>

        {/* Rear Wheel */}
        <g 
          onClick={() => onZoneClick?.('zone_wheel_rear_left')}
          className={getZoneClasses('zone_wheel_rear_left')}
          filter={isHighlighted('zone_wheel_rear_left') ? 'url(#warningGlow)' : undefined}
        >
          <circle cx="230" cy="310" r="52" strokeWidth="2.5" fillOpacity="0.2" />
          <circle cx="230" cy="310" r="40" className="fill-none stroke-current" strokeWidth="1.5" />
          <circle cx="230" cy="310" r="18" className="fill-none stroke-current" strokeWidth="1" />
          <circle cx="230" cy="310" r="8" className="fill-current" fillOpacity="0.4" />
          {/* Wheel spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line 
              key={angle}
              x1={230 + 18 * Math.cos(angle * Math.PI / 180)} 
              y1={310 + 18 * Math.sin(angle * Math.PI / 180)}
              x2={230 + 40 * Math.cos(angle * Math.PI / 180)} 
              y2={310 + 40 * Math.sin(angle * Math.PI / 180)}
              className="stroke-current"
              strokeWidth="2"
            />
          ))}
          {isHighlighted('zone_wheel_rear_left') && (
            <g className="animate-pulse">
              <circle cx="280" cy="270" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="280" y="275" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="230" y="385" textAnchor="middle" className={getLabelClasses('zone_wheel_rear_left')}>RODA TRAS.</text>

        {/* Rear Brake */}
        <g 
          onClick={() => onZoneClick?.('zone_brake_rear')}
          className={getZoneClasses('zone_brake_rear')}
          filter={isHighlighted('zone_brake_rear') ? 'url(#warningGlow)' : undefined}
        >
          <circle cx="230" cy="310" r="28" strokeWidth="4" fillOpacity="0.15" strokeDasharray="8 4" />
        </g>

        {/* Exhaust */}
        <g 
          onClick={() => onZoneClick?.('zone_exhaust')}
          className={getZoneClasses('zone_exhaust')}
          filter={isHighlighted('zone_exhaust') ? 'url(#warningGlow)' : undefined}
        >
          <path 
            d="M 100 280 L 170 280 Q 180 280 180 290 L 180 305 Q 180 315 170 315 L 100 315 Q 90 315 90 305 L 90 290 Q 90 280 100 280 Z"
            strokeWidth="2" 
            fillOpacity="0.4" 
          />
          {/* Exhaust pipes */}
          <ellipse cx="95" cy="290" rx="8" ry="6" className="fill-current" fillOpacity="0.6" />
          <ellipse cx="95" cy="305" rx="8" ry="6" className="fill-current" fillOpacity="0.6" />
          {isHighlighted('zone_exhaust') && (
            <g className="animate-pulse">
              <circle cx="140" cy="265" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="140" y="270" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="140" y="340" textAnchor="middle" className={getLabelClasses('zone_exhaust')}>ESCAPE</text>

        {/* Internal connection lines (chassis structure) */}
        <g className="stroke-[hsl(var(--primary))]/15" strokeWidth="0.75" fill="none">
          {/* Drivetrain line */}
          <path d="M 700 285 L 230 285" strokeDasharray="4 2" />
          {/* Suspension connection */}
          <path d="M 700 320 Q 650 340 600 340 L 330 340 Q 280 340 230 320" strokeDasharray="3 3" />
        </g>

        {/* View Title */}
        <text x="450" y="35" textAnchor="middle" className="fill-[hsl(var(--primary))] text-sm font-bold tracking-widest">
          VISTA LATERAL
        </text>

        {/* Technical corner markers */}
        <g className="stroke-[hsl(var(--primary))]/40" strokeWidth="1">
          <path d="M 30 30 L 30 60 M 30 30 L 60 30" />
          <path d="M 870 30 L 870 60 M 870 30 L 840 30" />
          <path d="M 30 420 L 30 390 M 30 420 L 60 420" />
          <path d="M 870 420 L 870 390 M 870 420 L 840 420" />
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

export default LateralView;

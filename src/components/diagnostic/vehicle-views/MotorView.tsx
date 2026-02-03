import { motion } from "framer-motion";
import { HighlightZoneId } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";

interface MotorViewProps {
  highlightZoneId: HighlightZoneId;
  onZoneClick?: (zoneId: HighlightZoneId) => void;
}

const MotorView = ({ highlightZoneId, onZoneClick }: MotorViewProps) => {
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
          <pattern id="gridPatternMotor" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(187 92% 44% / 0.08)" strokeWidth="0.5" />
          </pattern>
          
          <filter id="cyanGlowMotor" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="warningGlowMotor" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="engineBayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 92% 44% / 0.1)" />
            <stop offset="100%" stopColor="hsl(220 14% 10% / 0.9)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#gridPatternMotor)" />

        {/* Engine Bay Outline */}
        <rect x="60" y="60" width="780" height="430" rx="20" 
          fill="url(#engineBayGradient)" 
          className="stroke-[hsl(var(--primary))]/30" 
          strokeWidth="2" 
        />

        {/* Engine Block - Central Component */}
        <g 
          onClick={() => onZoneClick?.('zone_engine_block')}
          className={getZoneClasses('zone_engine_block')}
          filter={isHighlighted('zone_engine_block') ? 'url(#warningGlowMotor)' : undefined}
        >
          <rect x="280" y="180" width="340" height="220" rx="12" strokeWidth="2.5" fillOpacity="0.4" />
          <rect x="300" y="200" width="300" height="180" rx="8" className="fill-none stroke-current" strokeWidth="1" />
          {/* Cylinder heads */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={350 + i * 70} cy="280" r="28" className="fill-current" fillOpacity="0.25" />
              <circle cx={350 + i * 70} cy="280" r="18" className="fill-none stroke-current" strokeWidth="1" />
              <circle cx={350 + i * 70} cy="280" r="6" className="fill-current" fillOpacity="0.5" />
            </g>
          ))}
          {/* Valve cover lines */}
          <line x1="310" y1="235" x2="590" y2="235" className="stroke-current" strokeWidth="0.75" opacity="0.4" />
          <line x1="310" y1="325" x2="590" y2="325" className="stroke-current" strokeWidth="0.75" opacity="0.4" />
          {isHighlighted('zone_engine_block') && (
            <g className="animate-pulse">
              <circle cx="620" cy="170" r="14" className="fill-[hsl(var(--warning))]" />
              <text x="620" y="175" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[11px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="420" textAnchor="middle" className={getLabelClasses('zone_engine_block')}>BLOCO DO MOTOR</text>

        {/* Radiator */}
        <g 
          onClick={() => onZoneClick?.('zone_radiator')}
          className={getZoneClasses('zone_radiator')}
          filter={isHighlighted('zone_radiator') ? 'url(#warningGlowMotor)' : undefined}
        >
          <rect x="90" y="140" width="140" height="200" rx="10" strokeWidth="2" fillOpacity="0.35" />
          {/* Cooling fins */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="105" y1={155 + i * 15} x2="215" y2={155 + i * 15} className="stroke-current" strokeWidth="1.5" opacity="0.5" />
          ))}
          {/* Hose connections */}
          <circle cx="160" cy="135" r="8" className="fill-current" fillOpacity="0.6" />
          <circle cx="160" cy="345" r="8" className="fill-current" fillOpacity="0.6" />
          {isHighlighted('zone_radiator') && (
            <g className="animate-pulse">
              <circle cx="230" cy="130" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="230" y="135" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="160" y="365" textAnchor="middle" className={getLabelClasses('zone_radiator')}>RADIADOR</text>

        {/* Battery */}
        <g 
          onClick={() => onZoneClick?.('zone_battery')}
          className={getZoneClasses('zone_battery')}
          filter={isHighlighted('zone_battery') ? 'url(#warningGlowMotor)' : undefined}
        >
          <rect x="680" y="110" width="120" height="95" rx="8" strokeWidth="2" fillOpacity="0.4" />
          {/* Battery terminals */}
          <circle cx="705" cy="115" r="10" className="fill-destructive/40 stroke-destructive" strokeWidth="2" />
          <text x="705" y="119" textAnchor="middle" className="fill-destructive text-[8px] font-bold">+</text>
          <circle cx="775" cy="115" r="10" className="fill-[hsl(var(--primary))]/40 stroke-[hsl(var(--primary))]" strokeWidth="2" />
          <text x="775" y="119" textAnchor="middle" className="fill-[hsl(var(--primary))] text-[8px] font-bold">−</text>
          {/* Battery cells */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={695 + i * 35} y="135" width="25" height="50" rx="2" className="fill-none stroke-current" strokeWidth="0.75" opacity="0.5" />
          ))}
          {isHighlighted('zone_battery') && (
            <g className="animate-pulse">
              <circle cx="740" cy="95" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="740" y="100" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="740" y="225" textAnchor="middle" className={getLabelClasses('zone_battery')}>BATERIA</text>

        {/* Alternator */}
        <g 
          onClick={() => onZoneClick?.('zone_alternator')}
          className={getZoneClasses('zone_alternator')}
          filter={isHighlighted('zone_alternator') ? 'url(#warningGlowMotor)' : undefined}
        >
          <circle cx="700" cy="330" r="55" strokeWidth="2" fillOpacity="0.3" />
          <circle cx="700" cy="330" r="35" className="fill-none stroke-current" strokeWidth="1.5" />
          <circle cx="700" cy="330" r="12" className="fill-current" fillOpacity="0.5" />
          {/* Pulley slots */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line 
              key={angle}
              x1={700 + 20 * Math.cos(angle * Math.PI / 180)} 
              y1={330 + 20 * Math.sin(angle * Math.PI / 180)}
              x2={700 + 50 * Math.cos(angle * Math.PI / 180)} 
              y2={330 + 50 * Math.sin(angle * Math.PI / 180)}
              className="stroke-current"
              strokeWidth="2"
            />
          ))}
          {isHighlighted('zone_alternator') && (
            <g className="animate-pulse">
              <circle cx="755" cy="280" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="755" y="285" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="700" y="405" textAnchor="middle" className={getLabelClasses('zone_alternator')}>ALTERNADOR</text>

        {/* Air Filter */}
        <g 
          onClick={() => onZoneClick?.('zone_air_filter')}
          className={getZoneClasses('zone_air_filter')}
          filter={isHighlighted('zone_air_filter') ? 'url(#warningGlowMotor)' : undefined}
        >
          <ellipse cx="450" cy="110" rx="100" ry="45" strokeWidth="2" fillOpacity="0.35" />
          <ellipse cx="450" cy="110" rx="70" ry="30" className="fill-none stroke-current" strokeWidth="1" />
          <ellipse cx="450" cy="110" rx="40" ry="18" className="fill-none stroke-current" strokeWidth="0.75" opacity="0.6" />
          {/* Intake tube */}
          <path d="M 550 110 L 620 110 Q 640 110 640 130 L 640 180" className="fill-none stroke-current" strokeWidth="3" />
          {isHighlighted('zone_air_filter') && (
            <g className="animate-pulse">
              <circle cx="550" cy="75" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="550" y="80" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="175" textAnchor="middle" className={getLabelClasses('zone_air_filter')}>FILTRO DE AR</text>

        {/* Spark Plugs */}
        <g 
          onClick={() => onZoneClick?.('zone_spark_plugs')}
          className={getZoneClasses('zone_spark_plugs')}
          filter={isHighlighted('zone_spark_plugs') ? 'url(#warningGlowMotor)' : undefined}
        >
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={335 + i * 70} y="220" width="14" height="35" rx="3" strokeWidth="1.5" fillOpacity="0.5" />
              <line x1={342 + i * 70} y1="220" x2={342 + i * 70} y2="200" className="stroke-current" strokeWidth="2.5" />
              <circle cx={342 + i * 70} cy="197" r="4" className="fill-current" fillOpacity="0.7" />
            </g>
          ))}
          {isHighlighted('zone_spark_plugs') && (
            <g className="animate-pulse">
              <circle cx="410" cy="185" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="410" y="190" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="195" textAnchor="middle" className={getLabelClasses('zone_spark_plugs')}>VELAS</text>

        {/* Oil Pan */}
        <g 
          onClick={() => onZoneClick?.('zone_oil_pan')}
          className={getZoneClasses('zone_oil_pan')}
          filter={isHighlighted('zone_oil_pan') ? 'url(#warningGlowMotor)' : undefined}
        >
          <rect x="300" y="420" width="300" height="50" rx="8" strokeWidth="2" fillOpacity="0.35" />
          {/* Drain plug */}
          <circle cx="450" cy="455" r="10" className="fill-current" fillOpacity="0.5" />
          <circle cx="450" cy="455" r="5" className="fill-none stroke-current" strokeWidth="1" />
          {isHighlighted('zone_oil_pan') && (
            <g className="animate-pulse">
              <circle cx="600" cy="430" r="12" className="fill-[hsl(var(--warning))]" />
              <text x="600" y="435" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[10px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="450" y="490" textAnchor="middle" className={getLabelClasses('zone_oil_pan')}>CÁRTER / ÓLEO</text>

        {/* Transmission */}
        <g 
          onClick={() => onZoneClick?.('zone_transmission')}
          className={getZoneClasses('zone_transmission')}
          filter={isHighlighted('zone_transmission') ? 'url(#warningGlowMotor)' : undefined}
        >
          <rect x="630" y="230" width="95" height="70" rx="8" strokeWidth="2" fillOpacity="0.35" />
          {/* Gear indicator */}
          <circle cx="678" cy="265" r="15" className="fill-none stroke-current" strokeWidth="1" />
          {isHighlighted('zone_transmission') && (
            <g className="animate-pulse">
              <circle cx="725" cy="220" r="10" className="fill-[hsl(var(--warning))]" />
              <text x="725" y="224" textAnchor="middle" className="fill-[hsl(var(--warning-foreground))] text-[8px] font-bold">!</text>
            </g>
          )}
        </g>
        <text x="678" cy="320" textAnchor="middle" className={getLabelClasses('zone_transmission')}>CÂMBIO</text>

        {/* Belt paths */}
        <g className="stroke-[hsl(var(--muted-foreground))]/40" strokeWidth="4" fill="none" strokeDasharray="8 4">
          <path d="M 230 250 Q 260 200 320 220" />
          <path d="M 625 280 Q 660 250 700 275" />
        </g>

        {/* View Title */}
        <text x="450" y="40" textAnchor="middle" className="fill-[hsl(var(--primary))] text-sm font-bold tracking-widest">
          COMPARTIMENTO DO MOTOR
        </text>

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

export default MotorView;

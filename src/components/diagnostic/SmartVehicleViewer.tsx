import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VehicleZone, DiagnosticResult } from "@/data/diagnosticData";
import { CarView, HighlightZoneId, VisualContext, mapZoneIdToVehicleZone } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";
import { LateralView, MotorView, InferiorView } from "./vehicle-views";
import PartPopup from "./PartPopup";
import { Eye, Car, Wrench, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SmartVehicleViewerProps {
  highlightedZone: VehicleZone;
  highlightZoneId?: HighlightZoneId;
  carView?: CarView;
  onZoneClick?: (zone: VehicleZone) => void;
  onZoneIdClick?: (zoneId: HighlightZoneId) => void;
  result?: DiagnosticResult | null;
  visualContext?: VisualContext | null;
  className?: string;
}

const SmartVehicleViewer = ({ 
  highlightedZone, 
  highlightZoneId,
  carView = 'lateral',
  onZoneClick, 
  onZoneIdClick,
  result, 
  visualContext,
  className 
}: SmartVehicleViewerProps) => {
  const [showPartPopup, setShowPartPopup] = useState(false);
  const [currentView, setCurrentView] = useState<CarView>(carView);
  const [activeZoneId, setActiveZoneId] = useState<HighlightZoneId>(highlightZoneId || null);

  // Sync current view with prop
  useEffect(() => {
    if (carView) {
      setCurrentView(carView);
    }
  }, [carView]);

  // Sync zone highlight with prop
  useEffect(() => {
    if (highlightZoneId) {
      setActiveZoneId(highlightZoneId);
    }
  }, [highlightZoneId]);

  // Show popup when result arrives
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setShowPartPopup(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowPartPopup(false);
    }
  }, [result]);

  // Handle zone click from SVG views
  const handleZoneIdClick = (zoneId: HighlightZoneId) => {
    setActiveZoneId(zoneId);
    onZoneIdClick?.(zoneId);
    
    // Map to legacy zone for backward compatibility
    const legacyZone = mapZoneIdToVehicleZone(zoneId) as VehicleZone;
    if (legacyZone) {
      onZoneClick?.(legacyZone);
    }
  };

  // Get view button classes
  const getViewButtonClass = (view: CarView) => {
    return cn(
      "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
      currentView === view
        ? "bg-primary text-primary-foreground shadow-lg"
        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
    );
  };

  // Render the appropriate view
  const renderView = useMemo(() => {
    const viewProps = {
      highlightZoneId: activeZoneId,
      onZoneClick: handleZoneIdClick
    };

    switch (currentView) {
      case 'motor':
        return <MotorView {...viewProps} />;
      case 'inferior':
        return <InferiorView {...viewProps} />;
      case 'lateral':
      default:
        return <LateralView {...viewProps} />;
    }
  }, [currentView, activeZoneId]);

  return (
    <div className={cn("relative w-full h-full flex flex-col", className)}>
      {/* View Selector */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('lateral')}
          className={getViewButtonClass('lateral')}
        >
          <Car className="w-3.5 h-3.5" />
          Lateral
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('motor')}
          className={getViewButtonClass('motor')}
        >
          <Wrench className="w-3.5 h-3.5" />
          Motor
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('inferior')}
          className={getViewButtonClass('inferior')}
        >
          <ArrowDown className="w-3.5 h-3.5" />
          Inferior
        </Button>
      </div>

      {/* Current View Indicator */}
      {visualContext?.car_view_needed && visualContext.car_view_needed !== currentView && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 z-20"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView(visualContext.car_view_needed)}
            className="bg-warning/20 border-warning text-warning hover:bg-warning/30 text-xs"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Ver: {visualContext.car_view_needed}
          </Button>
        </motion.div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute inset-0 gradient-radial-cyan" />

      {/* Part Detail Popup */}
      {result && (
        <PartPopup 
          result={result}
          isOpen={showPartPopup}
          onClose={() => setShowPartPopup(false)}
        />
      )}
      
      {/* Main Vehicle View with Animation */}
      <div className="flex-1 flex items-center justify-center p-4 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            className="w-full h-full max-w-4xl"
            initial={{ opacity: 0, x: currentView === 'motor' ? 50 : currentView === 'inferior' ? 0 : -50, y: currentView === 'inferior' ? 50 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderView}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/40 border border-primary" />
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning border border-warning animate-pulse" />
          <span>Problema Detectado</span>
        </div>
      </div>

      {/* Active Zone Info */}
      {activeZoneId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2"
        >
          <p className="text-xs text-muted-foreground">
            Zona selecionada: <span className="text-warning font-medium">{activeZoneId.replace('zone_', '').replace(/_/g, ' ')}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SmartVehicleViewer;

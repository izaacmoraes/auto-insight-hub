import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VehicleZone, DiagnosticResult } from "@/data/diagnosticData";
import { CarView, HighlightZoneId, VisualContext, mapZoneIdToVehicleZone } from "@/data/partImagesMap";
import { cn } from "@/lib/utils";
import { LateralView, FrontalView, MotorView, InferiorView } from "./vehicle-views";
import PartPopup from "./PartPopup";
import { Car, Eye, Wrench, ArrowDown, Crosshair } from "lucide-react";
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

  // View configuration
  const views: { id: CarView; label: string; icon: React.ReactNode }[] = [
    { id: 'lateral', label: 'Lateral', icon: <Car className="w-4 h-4" /> },
    { id: 'frontal', label: 'Frontal', icon: <Crosshair className="w-4 h-4" /> },
    { id: 'motor', label: 'Motor', icon: <Wrench className="w-4 h-4" /> },
    { id: 'inferior', label: 'Inferior', icon: <ArrowDown className="w-4 h-4" /> },
  ];

  // Render the appropriate view
  const renderView = useMemo(() => {
    const viewProps = {
      highlightZoneId: activeZoneId,
      onZoneClick: handleZoneIdClick
    };

    switch (currentView) {
      case 'frontal':
        return <FrontalView {...viewProps} />;
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
    <div className={cn("relative w-full h-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950", className)}>
      {/* View Selector Tabs */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-primary/20 rounded-lg p-1">
          {views.map((view) => (
            <Button
              key={view.id}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView(view.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 h-8 text-xs font-medium transition-all duration-300 rounded-md",
                currentView === view.id
                  ? "bg-primary/20 text-primary shadow-[0_0_15px_hsl(187_92%_44%/0.3)] border border-primary/40"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-800/50"
              )}
            >
              {view.icon}
              <span className="hidden sm:inline">{view.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Suggested View Indicator */}
      {visualContext?.car_view_needed && visualContext.car_view_needed !== currentView && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-3 right-3 z-20"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView(visualContext.car_view_needed)}
            className="bg-warning/10 border-warning/50 text-warning hover:bg-warning/20 text-xs gap-1.5 h-8"
          >
            <Eye className="w-3.5 h-3.5" />
            Ver: {visualContext.car_view_needed}
          </Button>
        </motion.div>
      )}

      {/* Part Detail Popup */}
      {result && (
        <PartPopup 
          result={result}
          isOpen={showPartPopup}
          onClose={() => setShowPartPopup(false)}
        />
      )}
      
      {/* Main Vehicle View with Animation */}
      <div className="flex-1 flex items-center justify-center p-4 pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            className="w-full h-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderView}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Active Zone Info Badge */}
      {activeZoneId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm border border-warning/30 rounded-lg px-3 py-2 shadow-lg"
        >
          <p className="text-xs text-muted-foreground">
            Zona: <span className="text-warning font-semibold">{activeZoneId.replace('zone_', '').replace(/_/g, ' ').toUpperCase()}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SmartVehicleViewer;

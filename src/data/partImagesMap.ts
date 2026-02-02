// Mapping of specific part names to realistic images
// Using Unsplash for realistic automotive parts photography

export type CarView = 'lateral' | 'motor' | 'inferior' | 'frontal' | 'traseira';

export type HighlightZoneId = 
  | 'zone_engine_block'
  | 'zone_radiator'
  | 'zone_battery'
  | 'zone_alternator'
  | 'zone_air_filter'
  | 'zone_spark_plugs'
  | 'zone_wheel_front_left'
  | 'zone_wheel_front_right'
  | 'zone_wheel_rear_left'
  | 'zone_wheel_rear_right'
  | 'zone_brake_front'
  | 'zone_brake_rear'
  | 'zone_suspension_front'
  | 'zone_suspension_rear'
  | 'zone_exhaust'
  | 'zone_catalytic'
  | 'zone_muffler'
  | 'zone_oil_pan'
  | 'zone_transmission'
  | 'zone_fuel_tank'
  | 'zone_headlight'
  | 'zone_taillight'
  | null;

export interface VisualContext {
  specific_part_name: string;
  car_view_needed: CarView;
  highlight_zone_id: HighlightZoneId;
}

export interface PartImageInfo {
  url: string;
  alt: string;
  category: string;
}

// Map specific part names to their images
export const partImagesMap: Record<string, PartImageInfo> = {
  // Motor / Engine
  'radiador': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    alt: 'Radiador automotivo',
    category: 'Arrefecimento'
  },
  'bomba_dagua': {
    url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop',
    alt: 'Bomba d\'água do motor',
    category: 'Arrefecimento'
  },
  'bateria': {
    url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&h=300&fit=crop',
    alt: 'Bateria automotiva',
    category: 'Elétrica'
  },
  'alternador': {
    url: 'https://images.unsplash.com/photo-1558618047-f4b511986f76?w=400&h=300&fit=crop',
    alt: 'Alternador do veículo',
    category: 'Elétrica'
  },
  'vela_ignicao': {
    url: 'https://images.unsplash.com/photo-1631985185816-8cfbf3cfe81f?w=400&h=300&fit=crop',
    alt: 'Vela de ignição',
    category: 'Ignição'
  },
  'filtro_ar': {
    url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    alt: 'Filtro de ar do motor',
    category: 'Admissão'
  },
  'correia_dentada': {
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
    alt: 'Correia dentada',
    category: 'Motor'
  },
  'motor': {
    url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&h=300&fit=crop',
    alt: 'Motor do veículo',
    category: 'Motor'
  },
  
  // Freios / Brakes
  'pastilha_freio': {
    url: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    alt: 'Pastilha de freio',
    category: 'Freios'
  },
  'disco_freio': {
    url: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop',
    alt: 'Disco de freio ventilado',
    category: 'Freios'
  },
  'caliper': {
    url: 'https://images.unsplash.com/photo-1623861397233-f3c16d5c5c99?w=400&h=300&fit=crop',
    alt: 'Cáliper de freio',
    category: 'Freios'
  },
  'fluido_freio': {
    url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    alt: 'Fluido de freio',
    category: 'Freios'
  },
  
  // Suspensão / Suspension
  'amortecedor': {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    alt: 'Amortecedor automotivo',
    category: 'Suspensão'
  },
  'mola': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    alt: 'Mola de suspensão',
    category: 'Suspensão'
  },
  'bieleta': {
    url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop',
    alt: 'Bieleta da barra estabilizadora',
    category: 'Suspensão'
  },
  'terminal_direcao': {
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
    alt: 'Terminal de direção',
    category: 'Direção'
  },
  'bucha_suspensao': {
    url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    alt: 'Bucha de suspensão',
    category: 'Suspensão'
  },
  
  // Pneus / Tires
  'pneu': {
    url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&h=300&fit=crop',
    alt: 'Pneu automotivo',
    category: 'Rodas'
  },
  'roda': {
    url: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=400&h=300&fit=crop',
    alt: 'Roda de liga leve',
    category: 'Rodas'
  },
  
  // Escapamento / Exhaust
  'catalisador': {
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
    alt: 'Catalisador automotivo',
    category: 'Escapamento'
  },
  'silenciador': {
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
    alt: 'Silenciador de escape',
    category: 'Escapamento'
  },
  'escapamento': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    alt: 'Sistema de escapamento',
    category: 'Escapamento'
  },
  'sensor_oxigenio': {
    url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    alt: 'Sensor de oxigênio (sonda lambda)',
    category: 'Escapamento'
  },
  
  // Transmissão / Transmission
  'embreagem': {
    url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&h=300&fit=crop',
    alt: 'Kit de embreagem',
    category: 'Transmissão'
  },
  'cambio': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    alt: 'Câmbio manual/automático',
    category: 'Transmissão'
  },
  
  // Iluminação / Lights
  'farol': {
    url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
    alt: 'Farol dianteiro',
    category: 'Iluminação'
  },
  'lanterna': {
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    alt: 'Lanterna traseira',
    category: 'Iluminação'
  },
  
  // Fluidos / Fluids
  'oleo_motor': {
    url: 'https://images.unsplash.com/photo-1635784623083-0db6c7e3f927?w=400&h=300&fit=crop',
    alt: 'Óleo do motor',
    category: 'Lubrificação'
  },
  'liquido_arrefecimento': {
    url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    alt: 'Líquido de arrefecimento',
    category: 'Arrefecimento'
  }
};

// Default/fallback image for unknown parts
export const defaultPartImage: PartImageInfo = {
  url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
  alt: 'Peça automotiva genérica',
  category: 'Geral'
};

/**
 * Get image info for a specific part name
 * Falls back to default image if not found
 */
export function getPartImage(partName: string | null | undefined): PartImageInfo {
  if (!partName) return defaultPartImage;
  
  // Normalize the part name for lookup
  const normalized = partName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  
  // Try exact match first
  if (partImagesMap[normalized]) {
    return partImagesMap[normalized];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(partImagesMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  return defaultPartImage;
}

/**
 * Map highlight zone ID to vehicle zone for backward compatibility
 */
export function mapZoneIdToVehicleZone(zoneId: HighlightZoneId): string | null {
  if (!zoneId) return null;
  
  const mapping: Record<string, string> = {
    'zone_engine_block': 'motor',
    'zone_radiator': 'motor',
    'zone_battery': 'motor',
    'zone_alternator': 'motor',
    'zone_air_filter': 'motor',
    'zone_spark_plugs': 'motor',
    'zone_wheel_front_left': 'suspensao_dianteira',
    'zone_wheel_front_right': 'suspensao_dianteira',
    'zone_wheel_rear_left': 'suspensao_traseira',
    'zone_wheel_rear_right': 'suspensao_traseira',
    'zone_brake_front': 'freios',
    'zone_brake_rear': 'freios',
    'zone_suspension_front': 'suspensao_dianteira',
    'zone_suspension_rear': 'suspensao_traseira',
    'zone_exhaust': 'escapamento',
    'zone_catalytic': 'escapamento',
    'zone_muffler': 'escapamento',
    'zone_oil_pan': 'motor',
    'zone_transmission': 'motor',
    'zone_fuel_tank': 'escapamento',
    'zone_headlight': 'motor',
    'zone_taillight': 'escapamento'
  };
  
  return mapping[zoneId] || null;
}

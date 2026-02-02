import { VisualContext, CarView, HighlightZoneId } from "@/data/partImagesMap";

export interface AIResponseData {
  response: string;
  visual_context?: VisualContext;
  threadId?: string;
  messageId?: string;
}

/**
 * Attempts to extract JSON from a mixed text/JSON response from the AI
 * The AI might return pure JSON, JSON wrapped in markdown code blocks, or text mixed with JSON
 */
export function parseAIResponse(responseText: string): AIResponseData {
  console.log('[parseAIResponse] Parsing response:', responseText.substring(0, 200) + '...');
  
  // Initialize with the full response as fallback
  let result: AIResponseData = {
    response: responseText
  };

  try {
    // Strategy 1: Try to parse as pure JSON
    const parsed = JSON.parse(responseText);
    if (typeof parsed === 'object' && parsed !== null) {
      console.log('[parseAIResponse] Successfully parsed as pure JSON');
      return {
        response: parsed.response || parsed.text || parsed.message || responseText,
        visual_context: extractVisualContext(parsed)
      };
    }
  } catch {
    console.log('[parseAIResponse] Not pure JSON, trying other strategies...');
  }

  // Strategy 2: Look for JSON code block in markdown
  const jsonBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonBlockMatch) {
    try {
      const parsed = JSON.parse(jsonBlockMatch[1].trim());
      console.log('[parseAIResponse] Found JSON in code block');
      
      // Remove the JSON block from the response text
      const textWithoutJson = responseText.replace(/```(?:json)?\s*[\s\S]*?```/, '').trim();
      
      return {
        response: textWithoutJson || parsed.response || parsed.text || responseText,
        visual_context: extractVisualContext(parsed)
      };
    } catch {
      console.log('[parseAIResponse] Failed to parse JSON code block');
    }
  }

  // Strategy 3: Look for inline JSON object
  const jsonObjectMatch = responseText.match(/\{[\s\S]*"visual_context"[\s\S]*\}/);
  if (jsonObjectMatch) {
    try {
      const parsed = JSON.parse(jsonObjectMatch[0]);
      console.log('[parseAIResponse] Found inline JSON with visual_context');
      
      // Get the text before/after the JSON
      const jsonStart = responseText.indexOf(jsonObjectMatch[0]);
      const jsonEnd = jsonStart + jsonObjectMatch[0].length;
      const textBefore = responseText.substring(0, jsonStart).trim();
      const textAfter = responseText.substring(jsonEnd).trim();
      const combinedText = [textBefore, textAfter].filter(Boolean).join('\n\n');
      
      return {
        response: combinedText || parsed.response || responseText,
        visual_context: extractVisualContext(parsed)
      };
    } catch {
      console.log('[parseAIResponse] Failed to parse inline JSON');
    }
  }

  // Strategy 4: Look for specific visual_context fields in text
  const visualContextFromText = extractVisualContextFromText(responseText);
  if (visualContextFromText) {
    console.log('[parseAIResponse] Extracted visual_context from text patterns');
    result.visual_context = visualContextFromText;
  }

  console.log('[parseAIResponse] Final result:', result);
  return result;
}

/**
 * Extracts visual_context from a parsed JSON object
 */
function extractVisualContext(parsed: unknown): VisualContext | undefined {
  if (!parsed || typeof parsed !== 'object') return undefined;
  
  const obj = parsed as Record<string, unknown>;
  
  // Direct visual_context field
  if (obj.visual_context && typeof obj.visual_context === 'object') {
    const vc = obj.visual_context as Record<string, unknown>;
    return {
      specific_part_name: (vc.specific_part_name as string) || '',
      car_view_needed: (vc.car_view_needed as CarView) || 'lateral',
      highlight_zone_id: (vc.highlight_zone_id as HighlightZoneId) || null
    };
  }
  
  // Flat structure with individual fields
  if (obj.specific_part_name || obj.car_view_needed || obj.highlight_zone_id) {
    return {
      specific_part_name: (obj.specific_part_name as string) || '',
      car_view_needed: (obj.car_view_needed as CarView) || 'lateral',
      highlight_zone_id: (obj.highlight_zone_id as HighlightZoneId) || null
    };
  }
  
  return undefined;
}

/**
 * Attempts to extract visual context from text patterns
 * Useful when the AI returns structured info in natural language
 */
function extractVisualContextFromText(text: string): VisualContext | undefined {
  const lowerText = text.toLowerCase();
  
  let carView: CarView = 'lateral';
  let highlightZoneId: HighlightZoneId = null;
  let specificPartName = '';
  
  // Detect car view from keywords
  if (lowerText.includes('motor') || lowerText.includes('capô') || lowerText.includes('compartimento')) {
    carView = 'motor';
  } else if (lowerText.includes('inferior') || lowerText.includes('chassis') || lowerText.includes('embaixo')) {
    carView = 'inferior';
  }
  
  // Detect highlight zone from keywords
  const zonePatterns: { pattern: RegExp; zone: HighlightZoneId }[] = [
    { pattern: /radiador/i, zone: 'zone_radiator' },
    { pattern: /bateria/i, zone: 'zone_battery' },
    { pattern: /alternador/i, zone: 'zone_alternator' },
    { pattern: /filtro\s*(?:de\s*)?ar/i, zone: 'zone_air_filter' },
    { pattern: /vela|ignição/i, zone: 'zone_spark_plugs' },
    { pattern: /motor|bloco/i, zone: 'zone_engine_block' },
    { pattern: /freio\s*(?:dianteiro)?|pastilha/i, zone: 'zone_brake_front' },
    { pattern: /freio\s*traseiro/i, zone: 'zone_brake_rear' },
    { pattern: /roda\s*(?:dianteira)?(?:\s*esquerda)?|pneu\s*(?:dianteiro)?/i, zone: 'zone_wheel_front_left' },
    { pattern: /roda\s*(?:dianteira)?(?:\s*direita)?/i, zone: 'zone_wheel_front_right' },
    { pattern: /roda\s*traseira\s*(?:esquerda)?|pneu\s*traseiro/i, zone: 'zone_wheel_rear_left' },
    { pattern: /suspensão\s*dianteira/i, zone: 'zone_suspension_front' },
    { pattern: /suspensão\s*traseira/i, zone: 'zone_suspension_rear' },
    { pattern: /escapamento|escape/i, zone: 'zone_exhaust' },
    { pattern: /catalisador/i, zone: 'zone_catalytic' },
    { pattern: /silenciador/i, zone: 'zone_muffler' },
    { pattern: /óleo|cárter/i, zone: 'zone_oil_pan' },
    { pattern: /câmbio|transmissão/i, zone: 'zone_transmission' },
    { pattern: /tanque|combustível/i, zone: 'zone_fuel_tank' },
    { pattern: /farol/i, zone: 'zone_headlight' },
    { pattern: /lanterna/i, zone: 'zone_taillight' }
  ];
  
  for (const { pattern, zone } of zonePatterns) {
    if (pattern.test(text)) {
      highlightZoneId = zone;
      // Extract the matched part name
      const match = text.match(pattern);
      if (match) {
        specificPartName = match[0];
      }
      break;
    }
  }
  
  // Only return if we found something meaningful
  if (highlightZoneId || carView !== 'lateral') {
    return {
      specific_part_name: specificPartName,
      car_view_needed: carView,
      highlight_zone_id: highlightZoneId
    };
  }
  
  return undefined;
}

/**
 * Maps zone ID to legacy vehicle zone for backward compatibility
 */
export function mapHighlightZoneToLegacy(zoneId: HighlightZoneId): string | null {
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

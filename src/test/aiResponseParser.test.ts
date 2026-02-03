import { describe, it, expect } from 'vitest';
import { parseAIResponse } from '../utils/aiResponseParser';

describe('aiResponseParser', () => {
  
  it('deve parsear um JSON puro corretamente', () => {
    const input = JSON.stringify({
      response: "O problema é no radiador.",
      visual_context: {
        specific_part_name: "Radiador",
        car_view_needed: "motor",
        highlight_zone_id: "zone_radiator"
      }
    });

    const result = parseAIResponse(input);
    expect(result.response).toBe("O problema é no radiador.");
    expect(result.visual_context?.highlight_zone_id).toBe("zone_radiator");
  });

  it('deve extrair JSON de dentro de blocos de código Markdown', () => {
    const input = "Aqui está a análise:\n```json\n{\"visual_context\": {\"highlight_zone_id\": \"zone_battery\"}}\n```";
    
    const result = parseAIResponse(input);
    expect(result.visual_context?.highlight_zone_id).toBe("zone_battery");
    expect(result.response).toContain("Aqui está a análise:");
  });

  it('deve identificar componentes através de palavras-chave no texto (Fallback)', () => {
    const input = "O alternador no motor do seu carro parece estar com defeito.";
    
    const result = parseAIResponse(input);
    // Testa a Strategy 4 do seu código (extração por RegExp)
    expect(result.visual_context?.highlight_zone_id).toBe("zone_alternator");
    expect(result.visual_context?.car_view_needed).toBe("motor");
  });

  it('deve retornar o texto original se não encontrar nenhum JSON ou padrão', () => {
    const input = "Olá, como posso ajudar hoje?";
    const result = parseAIResponse(input);
    
    expect(result.response).toBe(input);
    expect(result.visual_context).toBeUndefined();
  });
});
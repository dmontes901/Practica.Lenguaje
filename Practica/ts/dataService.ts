import Ajv from 'ajv';

interface GeoCoverage {
  id: string;
  name: {
    text: Array<{ value: string; lang: string }>;
  };
}

export interface ProcessedData {
  id: string;
  name: string;
  municipalities: GeoCoverage[];
}

const ajv = new Ajv();

export class DataService {
  static async loadAndValidateData(): Promise<ProcessedData> {
    const response = await fetch('/data.json');
    const rawData = await response.json();
    
    const schema = await import('../src/schema/dataSchema.json');
    const validate = ajv.compile(schema);
    
    if (!validate(rawData)) {
      throw new Error('Datos JSON no válidos');
    }

    return this.processData(rawData);
  }

  private static processData(rawData: any): ProcessedData {
    const nameObj = rawData.name.text.find((t: { lang: string }) => t.lang === 'es');
    
    const municipalities = rawData.geographicCoverages.resource
      .filter((loc: any) => loc.id.startsWith('ES70'))
      .map((loc: any) => ({
        id: loc.id,
        name: loc.name.text.find((t: { lang: string }) => t.lang === 'es')?.value
      }));

    return {
      id: rawData.id,
      name: nameObj?.value || 'Sin nombre',
      municipalities: municipalities.slice(0, 20) // Limitar a 20 resultados
    };
  }
}

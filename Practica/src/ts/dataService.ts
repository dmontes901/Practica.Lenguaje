import Ajv from 'ajv';

interface GeoCoverage {
  id: string;
  name: string;
}

export interface ProcessedData {
  id: string;
  name: string;
  municipalities: GeoCoverage[];
}

const ajv = new Ajv();

export class DataService {
  static async loadAndValidateData(): Promise<ProcessedData> {
    const response = await fetch('../src/public/data.json');
    const rawData = await response.json();

    const schema = await import('../schema/dataSchema.json');
    const validate = ajv.compile(schema);

    if (!validate(rawData)) {
      throw new Error('Datos JSON no válidos');
    }

    return this.processData(rawData);
  }

  private static processData(rawData: any): ProcessedData {
    // Extraer el nombre en español, si no hay, asignar 'Sin nombre'
    const nameObj = rawData.name.text.find((t: { lang: string }) => t.lang === 'es');
    const datasetName = nameObj?.value || 'Sin nombre';

    // Obtener municipios con nombres en español
    const municipalities = rawData.geographicCoverages.resource
      .filter((loc: any) => loc.id.startsWith('ES70')) // Filtrar solo Canarias
      .map((loc: any) => ({
        id: loc.id,
        name: loc.name.text.find((t: { lang: string }) => t.lang === 'es')?.value || 'Desconocido'
      }));

    return {
      id: rawData.id,
      name: datasetName,
      municipalities: municipalities.slice(0, 20) // Limitar a 20 resultados
    };
  }
}

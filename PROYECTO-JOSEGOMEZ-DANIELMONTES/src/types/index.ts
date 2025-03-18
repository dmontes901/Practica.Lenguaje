export interface Record {
    Data_Referencia: string;
    COGNOM: string;
    Valor: number;
    ORDRE_COGNOM: number;
}

export interface ValidationResult {
    valid: boolean;
    errors?: string[];
    data?: Record[];
}
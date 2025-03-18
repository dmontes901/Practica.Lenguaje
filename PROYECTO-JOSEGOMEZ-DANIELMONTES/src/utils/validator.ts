import Ajv, { ErrorObject } from 'ajv';

const ajv = new Ajv();

export function validateData(data: any, schema: object): { valid: boolean; errors?: string[] } {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        return { valid: true };
    } else {
        const errors = validate.errors?.map((error: ErrorObject) => error.message).filter((msg): msg is string => msg !== undefined);
        return { valid: false, errors };
    }
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
function validateData(data, schema) {
    var _a;
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) {
        return { valid: true };
    }
    else {
        const errors = (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map((error) => error.message).filter((msg) => msg !== undefined);
        return { valid: false, errors };
    }
}

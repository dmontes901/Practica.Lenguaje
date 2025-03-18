"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
var ajv_1 = require("ajv");
var ajv = new ajv_1.default();
function validateData(data, schema) {
    var _a;
    var validate = ajv.compile(schema);
    var valid = validate(data);
    if (valid) {
        return { valid: true };
    }
    else {
        var errors = (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map(function (error) { return error.message; }).filter(function (msg) { return msg !== undefined; });
        return { valid: false, errors: errors };
    }
}

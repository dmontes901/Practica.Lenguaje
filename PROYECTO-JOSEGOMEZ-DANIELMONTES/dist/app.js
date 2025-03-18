"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /c:/Users/jgo5301/Desktop/DAM/LENGUAJEMARCAS/M0373/M0373/ts/json-processing-app/src/app.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const validator_1 = require("./utils/validator");
const schema1_json_1 = __importDefault(require("./schemas/schema1.json"));
const schema2_json_1 = __importDefault(require("./schemas/schema2.json"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static(path.join(__dirname, 'views')));
app.get('/data', (req, res) => {
    const file1Path = path.join(__dirname, 'json', 'file1.json');
    const file2Path = path.join(__dirname, 'json', 'file2.json');
    const file1Data = JSON.parse(fs.readFileSync(file1Path, 'utf-8'));
    const file2Data = JSON.parse(fs.readFileSync(file2Path, 'utf-8'));
    const validFile1Data = (0, validator_1.validateData)(file1Data, schema1_json_1.default);
    const validFile2Data = (0, validator_1.validateData)(file2Data, schema2_json_1.default);
    res.json({
        file1: validFile1Data,
        file2: validFile2Data,
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

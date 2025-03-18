// filepath: /c:/Users/jgo5301/Desktop/DAM/LENGUAJEMARCAS/M0373/M0373/ts/json-processing-app/src/app.ts
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import { validateData } from './utils/validator';
import schema1 from './schemas/schema1.json';
import schema2 from './schemas/schema2.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views')));

app.get('/data', (req, res) => {
    const file1Path = path.join(__dirname, 'json', 'file1.json');
    const file2Path = path.join(__dirname, 'json', 'file2.json');

    const file1Data = JSON.parse(fs.readFileSync(file1Path, 'utf-8'));
    const file2Data = JSON.parse(fs.readFileSync(file2Path, 'utf-8'));

    const validFile1Data = validateData(file1Data, schema1);
    const validFile2Data = validateData(file2Data, schema2);

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
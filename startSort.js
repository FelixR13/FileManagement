import Tesseract from 'tesseract.js';
import fs from 'fs';
import * as filepix from 'filepix';
import { v4 as uuidv4 } from 'uuid';
import json2xls from 'json2xls';
import config from 'config';
import path from 'path';



export default function startSort() {
    const settings = config.get('Settings');
    const outputDir = settings.outputDir;
    const inputDir = settings.inputDir;
    const list = JSON.parse(fs.readFileSync('./sender/list.json', 'utf8'));
    const files = fs.readdirSync(inputDir);
    const dateRegex = /(\d{1,2}\.\d{1,2}\.\d{2,4}|\d{1,2}\.\d{1,2}\.\d{1,4}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}\/\d{1,2}\/\d{1,4})/g;

    if (!fs.existsSync(outputDir + 'index.json')) {
        fs.writeFileSync(outputDir + 'index.json', JSON.stringify([{ 'date': 'date', 'name': 'name', 'text': 'text', 'directory': 'directory' }]));
    }

    const indexJSON = JSON.parse(fs.readFileSync(outputDir + 'index.json'))

    files.forEach(file => {
        Tesseract.recognize(
            inputDir + file,
            settings.lang,
            'pdf'
        ).then(({ data: { text } }) => {

            let count = 0
            const date = text.match(dateRegex);
            console.log(date);
            for (let item in list) {
                count++
                let fileName = ""
                date ? fileName = date[0] + item + uuidv4() : fileName = item + uuidv4();
                if (text.match(item)) {
                    let fileOutputDir = outputDir + item + '/'
                    console.log(fileOutputDir)
                    fs.existsSync(fileOutputDir) ? true : fs.mkdirSync(fileOutputDir)
                    filepix.img2PDF([inputDir + file], fileOutputDir + fileName + '.pdf').then(() => { fs.unlinkSync(inputDir + file) })
                    indexJSON.push({ "date": date[0], "name": fileName, "text": text, "directory": path.resolve(fileOutputDir) })
                    fs.writeFileSync(outputDir + 'index.json', JSON.stringify(indexJSON))
                    break
                }
            }
        }).then(() => {
            fs.writeFileSync(outputDir + 'xlsIndex.xlsx', json2xls(JSON.parse(fs.readFileSync(outputDir + 'index.json'))), 'binary')
        }
        )
    })


};

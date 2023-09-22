import Tesseract from 'tesseract.js';
import fs from 'fs';
import * as filepix from 'filepix';
import { v4 as uuidv4 } from 'uuid';
import json2xls from 'json2xls';

const inputDir = './input/';
const list = JSON.parse(fs.readFileSync('./sender/list.json', 'utf8'));
const files = fs.readdirSync(inputDir);

if (!fs.existsSync('./output/index.json')) {
    fs.writeFileSync('./output/index.json', JSON.stringify([{ 'Bezeichnung': 'Bezeichnung', 'Text': 'Text', 'Ordner': 'Speicherort' }]));
}

const indexJSON = JSON.parse(fs.readFileSync('./output/index.json'))

files.forEach(file => {
    Tesseract.recognize(
        inputDir + file,
        'deu',
        'pdf'
    ).then(({ data: { text } }) => {
        let count = 0
        for (let item in list) {
            count++
            let fileName = item + uuidv4();
            if (text.match(item)) {
                let outputDir = './output/' + item + '/'
                fs.existsSync(outputDir) ? true : fs.mkdirSync(outputDir)
                filepix.img2PDF([inputDir + file], outputDir + fileName + '.pdf').then(() => { fs.unlinkSync(inputDir + file) })
                indexJSON.push({ "Bezeichnung": fileName, "Text": text, "Ordner": outputDir })
                fs.writeFileSync('./output/index.json', JSON.stringify(indexJSON))
                break
            }
        }
    }).then(() => {
        fs.writeFileSync('./output/xlsIndex.xlsx', json2xls(JSON.parse(fs.readFileSync('./output/index.json'))), 'binary')
    }
    )
})




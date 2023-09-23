import Tesseract from 'tesseract.js';
import fs from 'fs';
import * as filepix from 'filepix';
import { v4 as uuidv4 } from 'uuid';
import json2xls from 'json2xls';
import config from 'config';
import path from 'path';
import readlineSync from 'readline-sync';

export default function () {
    let senderList = JSON.parse(fs.readFileSync('./sender/list.json', 'utf8'));
    console.log(senderList);
    var senderMenu = ['Absender hinzufügen', 'Absender löschen', 'Absender aktualisien'];
    var senderMenu = readlineSync.keyInSelect(senderMenu, 'Was möchtest du tun?') + 1;


    switch (senderMenu) {
        case 1:
            var newSender = readlineSync.question('Name oder Bezeichnung des Absenders\n');
            senderList[newSender] = newSender;
            fs.writeFileSync('./sender/list.json', JSON.stringify(senderList));
            break;
        case 2:
            var senderName = readlineSync.question('Name des Absenders der gelöscht werden soll\n');
            delete senderList[senderName];
            fs.writeFileSync('./sender/list.json', JSON.stringify(senderList));
            break;
        case 3:
            var senderName = readlineSync.question('Name des Absenders der aktualisiert werden soll\n');
            senderList[senderName] = readlineSync.question('Neuer Name des Absenders\n');
            fs.writeFileSync('./sender/list.json', JSON.stringify(senderList));
            break;
    }
}
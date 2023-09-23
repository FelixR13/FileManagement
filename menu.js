import chalk from 'chalk';
import config from 'config';
import fs from 'fs';
import readlineSync from 'readline-sync';
import sender from './sender.js';
import settings from './settings.js';
import startSort from './startSort.js';
const log = console.log;


var mainMenu = ['Absender bearbeiten', 'Index anzeigen', 'Sortieren starten', 'Einstellungen bearbeiten'];

var mainMenu = readlineSync.keyInSelect(mainMenu, 'Was möchtest du tun?') + 1;


switch (mainMenu) {
    case 1:
        // Absender liste 
        if (!fs.existsSync('./sender/list.json')) { log(chalk.redBright('Keine Absenderliste angelegt')); break }
        sender();
        break;
    case 2:
        // Index anzeigen
        if (!fs.existsSync('./output/index.json')) { log(chalk.redBright('Kein index angelegt')); break }
        console.log(JSON.parse(fs.readFileSync('./output/index.json')))
        break;
    case 3:
        //Programm starten
        startSort();
        break;
    case 4:
        //Einstellungen bearbeiten
        settings()
        setTimeout(() => { console.log(config.get('Settings')) }, "500")
        break;
}




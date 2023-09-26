import chalk from 'chalk';
import config from 'config';
import fs from 'fs';
import readlineSync from 'readline-sync';
import sender from './sender.js';
import settings from './settings.js';
import startSort from './startSort.js';
const log = console.log;


var showMenu = (process.env.MENU === 'true');
var mainMenu = ['edit sender', 'show index', 'start sort ', 'edit settings'];
if (showMenu) {
    var mainMenu = readlineSync.keyInSelect(mainMenu, 'What do you want to do?') + 1;
    switch (mainMenu) {
        case 1:
            // edit sender
            if (!fs.existsSync('./sender/list.json')) { log(chalk.redBright('sender-list not found')); break }
            sender();
            break;
        case 2:
            // show index
            if (!fs.existsSync('./output/index.json')) { log(chalk.redBright('index not found')); break }
            console.log(JSON.parse(fs.readFileSync('./output/index.json')))
            break;
        case 3:
            // start sort
            startSort();
            break;
        case 4:
            // edit settings
            settings()
            break;
    }
} else {
    startSort();
}



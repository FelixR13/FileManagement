import chalk from 'chalk';
import readlineSync from 'readline-sync';

const log = console.log;


var options = ['Absender bearbeiten', 'Index anzeigen', 'Programm starten'];

var mainChoice = readlineSync.keyInSelect(options, 'Was möchtest du tun?') + 1;


switch (mainChoice) {
    case 1:
        log(mainChoice)
        break;
    case 2:
        log(mainChoice);
        break;
    case 3:
        log(mainChoice);
        break;
}




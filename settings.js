import config from 'config';
import fs from 'fs';
import readlineSync from 'readline-sync';

export default function () {
    console.log(config.get('Settings'));
    var settingsMenu = ['Input-Ordner anpassen', 'Output-Ordner anpassen', 'Einstellung zurücksetzen'];
    let configData = JSON.parse(fs.readFileSync('./config/default.json', 'utf8'));
    var settingsMenu = readlineSync.keyInSelect(settingsMenu, 'Was möchtest du tun?') + 1;
    switch (settingsMenu) {
        case 1:
            var newInputDir = readlineSync.question('Neuen Input-Ordner festlegen\n');
            configData.Settings.inputDir = newInputDir;
            fs.writeFileSync('./config/default.json', JSON.stringify(configData));
            break;
        case 2:
            var newOutputDir = readlineSync.question('Neuen Output-Ordner festlegen\n');
            configData.Settings.outputDir = newOutputDir;
            fs.writeFileSync('./config/default.json', JSON.stringify(configData));
            break;
        case 3:
            configData.Settings.outputDir = './output/';
            configData.Settings.inputDir = './input/';
            fs.writeFileSync('./config/default.json', JSON.stringify(configData));
            break;
    }

}
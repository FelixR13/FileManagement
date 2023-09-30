
# docs-management

A little programm to sort documents by there senders (via Keywords). 
The first date formated in dd.mm.yyyy is used to name the file and for the
excel-table.
Creates a excel dokument with following data: 

| date       | name              | text            | directory    |
| ---------- | ----------------- | --------------- | ------------ |
| dd.mm.yyyy | dd.mm.yyyysitamet | Lorem ipsum ... | path/to/file |


## Installation

Install docs-management with npm

```bash
  npm install docs-management
```
Add the senders to the list, with the menu or in the list.json

## Usage/Examples

```bash
npm start
```
If you just want to sort the files, use without cli ui: 
```bash
npm run sort
```




## Configdata

Configuration of the language, input- and output-directory is located in config\default.json 

`{"Settings":{"inputDir":"./input/","outputDir":"./output/","lang":"deu"}}`

## Keywordlist

located in sender\list.json

`{
    "Sender1": "Sender1",
    "Sender2": "Sender2",
    "Sender3": "Sender3"
}`


## 🦊 About Me
I'm a junior developer who likes to make things easier. 
  
## Badges


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## License

[MIT](https://choosealicense.com/licenses/mit/)


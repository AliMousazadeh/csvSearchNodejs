import { readCSV, findRows } from './myUtils.js';


const [filePath, columnNumber, query] = process.argv.slice(2);
console.log(filePath, columnNumber, query);

findRows(filePath, columnNumber, query);

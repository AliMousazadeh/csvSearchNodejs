import { readCSV, findRows } from './myUtils.js';

const [filePath, columnNumber, query] = process.argv.slice(2);
console.log(filePath, columnNumber, query);


readCSV(filePath)
  .then((csvFile) => findRows(csvFile, columnNumber, query))
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

import { readCSV, findRows } from './myUtils.js';

const [filePath, columnNumber, query] = process.argv.slice(2);

try {
  const csvFile = await readCSV(filePath);
  const rows = findRows(csvFile, columnNumber, query);
  console.log(rows);
} catch (error) {
  console.log(error.message);
}
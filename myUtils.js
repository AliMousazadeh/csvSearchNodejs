import { createReadStream } from 'fs';
import csv from 'csv-parser';
import fs from 'fs';


const readCSV = async (filePath) => {

  try {
    await fs.promises.access(filePath); // Check if the file exists
  } catch (error) {
    throw new Error(`Error: File '${filePath}' does not exist.`);
  }

  const csvFile = [];
  try {
    const stream = createReadStream(filePath)
      .pipe(csv({ headers: false }));

    for await (const data of stream) {
      csvFile.push(data);
    }

    return csvFile;
  } catch (error) {
    throw new Error(`Error reading CSV: ${error.message}`);
  }
}


const findRows = (csvFile, columnNumber, query) => {
  const selectedColumn = csvFile.map(row => row[columnNumber]);

  const indices = selectedColumn.reduce((accumulator, current, index) => {
    return current === query ? accumulator.concat(index) : accumulator;
  }, []);

  return indices.map(indices => Object.values(csvFile[indices]));
};


export { readCSV, findRows };
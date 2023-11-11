import { createReadStream } from 'fs';
import csv from 'csv-parser';


const readCSV = (filePath) => {
  const csvFile = [];

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on('data', (data) => {
        csvFile.push(data);
      })
      .on('end', () => {
        resolve(csvFile);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}


const findRows = (csvFile, columnNumber, query) => {
  const selectedColumn = csvFile.map(row => row[columnNumber]);

  const indices = selectedColumn.reduce((accumulator, current, index) => {
    return current === query? accumulator.concat(index) : accumulator;
  }, []);

  return indices.map(indices => Object.values(csvFile[indices]));
};


export {readCSV, findRows};
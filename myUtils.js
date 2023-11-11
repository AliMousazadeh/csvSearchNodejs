import { createReadStream } from 'fs';
import csv from 'csv-parser';


export const readCSV = function (filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}


export const findRows = function (filePath, columnNumber, query) {
  readCSV(filePath)
    .then((data) => {
      const selectedColumn = data.map(row => row[columnNumber]);
      const indices = selectedColumn.reduce((accumulator, current, index) => {
        if (current === query) {
          accumulator.push(index);
        }
        return accumulator;
      }, []);

      const results = indices.map(indices => Object.values(data[indices]));
      console.log(results);
    })
    .catch((error) => {
      console.error('Error reading CSV:', error);
    });
}
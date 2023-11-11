import { createReadStream } from 'fs';
import csv from 'csv-parser';


const [filePath, columnNumber, query] = process.argv.slice(2);
console.log(filePath, columnNumber, query);

console.log('hello');
console.log('hello again');


function readCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv({headers: false}))
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


readCSV(filePath)
  .then((data) => {
    //console.log('CSV Data:', data);

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






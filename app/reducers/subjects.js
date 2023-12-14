const fs = require('fs');

export const subjectsList = fs
  .readFileSync(`${__dirname}/elenco_pesci_2019.csv`, 'utf-8')
  .split(/\r?\n/)
  .filter(row => row.trim() !== "")
  .map(line => {
    const [number, commonName, scientificName, coefficient, ...tail] = line.split(';');

    return ({
      id: Number(number),
      name: commonName,
      sci_name: scientificName,
      coeff: Number(coefficient),
      version: tail[0] || null
    });
  }
  );

subjectsList.unshift({
  id: 0,
  name: 'Rimuovi specie',
  sci_name: '',
  coeff: null,
  version: null
});

export const subjects = subjectsList.reduce((map, subject) => {
  // eslint-disable-next-line no-param-reassign
  map[subject.id] = subject;
  return map;
}, {});

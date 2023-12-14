import stringify from 'csv-stringify';
import { remote } from 'electron';
import { ExcludedState, JuryState } from '../actions/slides';
import { subjects } from '../reducers/subjects';

const { dialog } = remote;

const ga = remote.getGlobal('ga');

const columns = ['file', 'jury', 'subj_id', 'subj_name', 'coeff', 'version'];

const exportToCSV = (slides, callback) => {
  ga.event('CSV', 'export').send();
  let csvData = [];
  const knownSpecies = [];
  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    if (slide.state > ExcludedState) {
      if (knownSpecies.indexOf(slide.subjectid) > -1) {
        dialog.showErrorBox(
          'Impossibile esportare la scheda concorrente',
          'Sono presenti specie doppie.'
        );
        csvData = null;
        break;
      }
      knownSpecies.push(slide.subjectid);
      if (!slide.subjectid || slide.subjectid === 0) {
        dialog.showErrorBox(
          'Impossibile esportare la scheda concorrente',
          'Non a tutte le slide è stata assegnata una specie.'
        );
        csvData = null;
        break;
      }
      const juryMark = slide.state === JuryState ? 'X' : '';
      const subject = subjects[slide.subjectid];
      csvData.push([
        slide.id.replace(/\.[^/.]+$/, ""),
        juryMark,
        subject.id,
        subject.name,
        subject.coeff,
        subject.version
      ]);
    }
  }

  if (csvData)
    stringify(
      csvData,
      {
        delimiter: ';',
        columns
      },
      callback
    );
};

export default exportToCSV;

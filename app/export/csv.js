import stringify from 'csv-stringify';
import { ExcludedState, JuryState } from '../actions/slides';
import { subjects } from '../reducers/subjects';

const columns = ['file', 'jury', 'subj_id', 'subj_name', 'coeff'];

const exportToCSV = (slides, callback) => {
  const csvData = slides.reduce((acc, slide) => {
    if (slide.state > ExcludedState) {
      const juryMark = slide.state === JuryState ? 'X' : '';
      const subject = subjects[slide.subjectid];
      return [
        ...acc,
        [slide.id, juryMark, subject.id, subject.name, subject.coeff]
      ];
    }
    return acc;
  }, []);

  stringify(
    csvData,
    {
      columns
    },
    callback
  );
};

export default exportToCSV;

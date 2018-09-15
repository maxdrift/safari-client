const initialState = {
  open: false,
  selectedSlides: [],
  selectedSubject: null
};

const subjectsModal = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SUBJECTS_MODAL':
      return {
        open: true,
        selectedSlides: action.slideIds,
        selectedSubject: action.subjectId
      };
    case 'CLOSE_SUBJECTS_MODAL':
      return {
        open: false,
        selectedSlides: [],
        selectedSubject: null
      };
    default:
      return state;
  }
};

export default subjectsModal;

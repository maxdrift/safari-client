// @flow
export const openSubjectsModal = (slideIds, subjectId) => ({
  type: 'OPEN_SUBJECTS_MODAL',
  slideIds,
  subjectId
});

export const closeSubjectsModal = () => ({
  type: 'CLOSE_SUBJECTS_MODAL'
});

// @flow
import React from 'react';
import SCNavBarContainer from '../containers/SCNavBarContainer';
import SCSlidesFilterTabs from '../containers/SCSlidesFilterTabs';
import SCHasSlidesContainer from '../containers/SCHasSlidesContainer';
import SCSubjectsModalContainer from '../containers/SCSubjectsModalContainer';

const HomePage = () => (
  <div>
    <SCNavBarContainer>
      <SCSlidesFilterTabs />
    </SCNavBarContainer>
    <SCHasSlidesContainer />
    <SCSubjectsModalContainer />
  </div>
);

export default HomePage;

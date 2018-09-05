// @flow
import React from 'react';
import SCNavBarContainer from '../containers/SCNavBarContainer';
import SCSlidesFilterTabs from '../containers/SCSlidesFilterTabs';
import SCHasSlidesContainer from '../containers/SCHasSlidesContainer';

const HomePage = () => (
  <div>
    <SCNavBarContainer>
      <SCSlidesFilterTabs />
    </SCNavBarContainer>
    <SCHasSlidesContainer />
  </div>
);

export default HomePage;

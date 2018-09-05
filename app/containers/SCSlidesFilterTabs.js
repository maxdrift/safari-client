import { connect } from 'react-redux';
import { ExcludedState, FixedState, JuryState } from '../actions/slides';
import {
  setVisibilityFilter,
  VisibilityFilters,
  AllLabel,
  ExcludedLabel,
  FixedLabel,
  JuryLabel
} from '../actions/visibilityFilter';
import SCTabBar from '../components/SCTabBar';

const getTabsData = slides => [
  {
    label: AllLabel,
    filter: VisibilityFilters.SHOW_ALL,
    counter: slides.length
  },
  {
    label: ExcludedLabel,
    filter: VisibilityFilters.SHOW_EXCLUDED,
    counter: slides.filter(slide => slide.state === ExcludedState).length
  },
  {
    label: FixedLabel,
    filter: VisibilityFilters.SHOW_FIXED,
    counter: slides.filter(slide => slide.state === FixedState).length
  },
  {
    label: JuryLabel,
    filter: VisibilityFilters.SHOW_JURY,
    counter: slides.filter(slide => slide.state === JuryState).length
  }
];

const mapStateToProps = state => ({
  currentFilter: state.visibilityFilter,
  tabsData: getTabsData(state.slides)
});

const mapDispatchToProps = dispatch => ({
  onChange: (event, filter) => dispatch(setVisibilityFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(SCTabBar);

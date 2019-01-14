import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {StyledPanelHeader} from 'components/common/styled-components';

//import * as Filters from 'components/filters';
import SingleSelectFilter from 'components/filters/single-select-filter'
import MultiSelectFilter from 'components/filters/multi-select-filter'
import { updateFilter } from '../../store/MapStore'
// import deepEqual from 'deep-equal'

const StyledFilterPanel = styled.div`
  margin-bottom: 12px;
  border-radius: 1px;
  .filter-panel__filter {
    margin-top: 24px;
  }
`;

const StyledFilterHeader = StyledPanelHeader.extend`
  cursor: pointer;
  padding: 10px 12px;
`;

const StyledFilterContent = styled.div`
  background-color: ${props => props.theme.panelBackground};
  padding: 12px;
`;

 class LayerFilterPanel extends Component {
  

  render() {
    const { layer, layerName, theme, filters } = this.props
   

    const renderFilter = (filterName, i) => {
      const filter = filters[filterName];

      const dispatchUpdateFilter = (value) => {
        this.props.updateFilter(layerName, filterName, value)  
      }

      return (
        <div key={ i }>
          { filter.type === "dropdown" ?
            <SingleSelectFilter 
              setFilter={ dispatchUpdateFilter } 
              filter={ filter }
            />
            :
            <MultiSelectFilter 
              setFilter={ dispatchUpdateFilter } 
              filter={ filter }
            />
          }
        </div>
      )
    }

    return (
      <StyledFilterPanel className="filter-panel">
         <StyledFilterContent className="filter-panel__content">
          {Object.keys(filters).map(renderFilter)}
         </StyledFilterContent>
      </StyledFilterPanel>
    );
  }
}

LayerFilterPanel.defaultProps = {
  isOpen: true
}

const mapDispatchToProps = {
  updateFilter
}

const mapStateToProps = (state,ownProps) => {
  return {
    theme: state.map.theme,
    layer: state.map.layers[ownProps.layerName],
    filters: state.map.layers[ownProps.layerName].filters,
    update: state.map.update
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LayerFilterPanel)
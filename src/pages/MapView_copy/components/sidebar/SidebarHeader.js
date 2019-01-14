import React, {Component} from 'react';
import { connect } from 'react-redux';

import Logo from "components/mitigate-ny/Logo"

// import deepEqual from 'deep-equal'

 class SidebarHeader extends Component {
  
  render() {
    const { theme } = this.props
    let sidebarHeaderStyle = {
      width: '100%',
      flexBasis: 75,
      display: 'flex',
      padding: 15,
      backgroundColor: theme.sidePanelHeaderBg// '#323c58', //'#29323C'
    }


    return (
      <div className='sidebar-header' style={sidebarHeaderStyle}>
        <Logo width={ 300 } fill={ this.props.theme.textColorHl }/>
      </div>
    );
  }
}

// SidebarHeader.defaultProps = {
//   isOpen: true
// }

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    theme: state.map.theme
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader)
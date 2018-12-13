import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        <img style={{paddingLeft: 45, height: 45}} src='/img/nymtc_logo_white.svg' />
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
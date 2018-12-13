import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {CenterFlexbox} from 'components/common/styledComponents';
import {Pin, Layers} from 'components/common/icons';
import LightTheme from 'components/common/themes/light'
// import {FIELD_DISPLAY_FORMAT} from 'constants/default-settings';

const MAX_WIDTH = 400;
const MAX_HEIGHT = 600;

const StyledMapPopover = styled.div`
  ${props => props.theme.scrollBar}
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => props.theme.panelBackground};
  color: ${props => props.theme.textColor};
  z-index: 1001;
  width: 300px;
  overflow-x: auto;
  .gutter {
    height: 6px;
  }
  table {
    margin: 2px 12px 12px 12px;
    width: auto;
    tbody {
      border-top: transparent;
      border-bottom: transparent;
    }
    td {
      border-color: transparent;
      padding: 4px;
      color: ${props => props.theme.textColor};
    }
    td.row__value {
      text-align: right;
      font-weight: 500;
      color: ${props => props.theme.textColorHl};
    }
  }
`;

const StyledPin = styled.div`
  position: absolute;
  left: 50%;
  transform: rotate(30deg);
  top: 10px;
  color: ${props => props.theme.primaryBtnBgd};
  :hover {
    cursor: pointer;
    color: ${props => props.theme.linkBtnColor};
  }
`;

const StyledLayerName = CenterFlexbox.extend`
  color: ${props => props.theme.textColorHl};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.43px;
  text-transform: capitalize;
  padding-left: 14px;
  margin-top: 12px;
  svg {
    margin-right: 4px;
  }
`;



export default class Tooltip extends React.Component {

  static propTypes = {
    rows: PropTypes.array.isRequired
  };

  render() {
    const { rows, feature } = this.props;

    const renderRow = (row, i) => {
      return (
        <tr className="row" key={row}>
          <td className="row__name">{row}</td>
          <td className="row__value">
           {feature.properties[row]}
          </td>
        </tr>
      )
    };

    return (
      <StyledMapPopover
        theme={LightTheme}
      >
        <StyledLayerName className="map-popover__layer-name">
          <Layers height="12px"/>
          {feature.properties.name}
        </StyledLayerName>
        
        <table className="map-popover__table">
          {rows.map(renderRow)}
        </table>
      </StyledMapPopover>
    );

  }
}

// export class MapPopover extends Component {
//   static propTypes = {
//     fields: PropTypes.arrayOf(PropTypes.any),
//     fieldsToShow: PropTypes.arrayOf(PropTypes.any),
//     isVisible: PropTypes.bool,
//     layer: PropTypes.object,
//     data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.object]),
//     freezed: PropTypes.bool,
//     x: PropTypes.number,
//     y: PropTypes.number,
//     onClose: PropTypes.func,
//     mapState: PropTypes.object.isRequired
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       isMouseOver: false,
//       width: 380,
//       height: 160
//     };
//   }

//   componentDidMount() {
//     this._setContainerSize();
//   }

//   componentDidUpdate() {
//     this._setContainerSize();
//   }

//   _setContainerSize() {
//     const node = this.popover;
//     if (!node) {
//       return;
//     }

//     const width = Math.min(node.scrollWidth, MAX_WIDTH);
//     const height = Math.min(node.scrollHeight, MAX_HEIGHT);

//     if (width !== this.state.width || height !== this.state.height) {
//       this.setState({width, height});
//     }
//   }

//   _getPosition(x, y) {
//     const topOffset = 30;
//     const leftOffset = 30;
//     const {mapState} = this.props;
//     const {width, height} = this.state;
//     const pos = {};
//     if (x + leftOffset + width > mapState.width) {
//       pos.right = mapState.width - x + leftOffset;
//     } else {
//       pos.left = x + leftOffset;
//     }

//     if (y + topOffset + height > mapState.height) {
//       pos.bottom = 10;
//     } else {
//       pos.top = y + topOffset;
//     }

//     return pos;
//   }

//   render() {
//     const {
//       x,
//       y,
//       isVisible,
//       data,
//       layer,
//       freezed,
//       fields,FIELD_DISPLAY_FORMAT
//       fieldsToShow = []
//     } = this.props;
//     const hidden = !isVisible && !this.state.isMouseOver;
//     const {width} = this.state;

//     if (!data || !layer || !fieldsToShow.length) {
//       return null;
//     }

//     const infoProps = {data, layer, fieldsToShow, fields};

//     const style =
//       Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y) : {};

//     return (
//       <StyledMapPopover
//         innerRef={comp => {
//           this.popover = comp;
//         }}
//         className={classnames('map-popover', {hidden})}
//         style={{
//           ...style,
//           maxWidth: width
//         }}
//         onMouseEnter={() => {
//           this.setState({isMouseOver: true});
//         }}
//         onMouseLeave={() => {
//           this.setState({isMouseOver: false});
//         }}
//       >
//         {freezed ? (
//           <div className="map-popover__top">
//             <div className="gutter" />
//             <StyledPin className="popover-pin" onClick={this.props.onClose}>
//               <Pin height="16px" />
//             </StyledPin>
//           </div>
//         ) : null}
//         <StyledLayerName className="map-popover__layer-name">
//           <Layers height="12px"/>{layer.config.label}</StyledLayerName>
//         <table className="map-popover__table">
//           {layer.isAggregated ? (
//             <CellInfo {...infoProps} />
//           ) : (
//             <EntryInfo {...infoProps} />
//           )}
//         </table>
//       </StyledMapPopover>
//     );
//   }
// }

// const Row = ({name, value, url}) => {
//   // Set 'url' to 'value' if it looks like a url
//   if (!url && value && typeof value === 'string' && value.match(/^http/)) {
//     url = value;
//   }

//   const asImg = /<img>/.test(name);
//   return (
//     <tr className="row" key={name}>
//       <td className="row__name">{name}</td>
//       <td className="row__value">
//         {asImg ? (
//           <img src={value} />
//         ) : url ? (
//           <a target="_blank" rel="noopener noreferrer" href={url}>
//             {value}
//           </a>
//         ) : (
//           value
//         )}
//       </td>
//     </tr>
//   );
// };

// const EntryInfo = ({fieldsToShow, fields, data}) => (
//   <tbody>
//     {fieldsToShow.map(name => (
//       <EntryInfoRow key={name} name={name} fields={fields} data={data} />
//     ))}
//   </tbody>
// );

// const EntryInfoRow = ({name, fields, data}) => {
//   const field = fields.find(f => f.name === name);
//   if (!field) {
//     return null;
//   }

//   const valueIdx = field.tableFieldIndex - 1;
//   const format = _getCellFormat(field.type);

//   return (
//     <Row name={name} value={format ? format(data[valueIdx]) : data[valueIdx]} />
//   );
// };

// const CellInfo = ({data, layer}) => {
//   const {colorField, sizeField} = layer.config;

//   return (
//     <tbody>
//       <Row name={'total points'} key="count" value={data.points && data.points.length} />
//       {colorField && layer.visualChannels.color ? (
//         <Row
//           name={layer.getVisualChannelDescription('color').measure}
//           key="color"
//           value={data.colorValue || 'N/A'}
//         />
//       ) : null}
//       {sizeField && layer.visualChannels.size ? (
//         <Row
//           name={layer.getVisualChannelDescription('size').measure}
//           key="size"
//           value={data.elevationValue || 'N/A'}
//         />
//       ) : null}
//     </tbody>
//   );
// };

// function _getCellFormat(type) {
//   return FIELD_DISPLAY_FORMAT[type];
// }

// const MapPopoverFactory =  () => MapPopover;
// export default MapPopoverFactory;
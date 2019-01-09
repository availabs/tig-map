import React, {Component} from 'react';
import { connect } from 'react-redux';

class MapModal extends React.Component {
	render() {
		const modal = Object.keys(this.props.layers)
			.reduce((a, c) => this.props.layers[c].modal && this.props.layers[c].modal.show ? this.props.layers[c].modal : a, null)
		return !modal ? null : (
			<div style={ { position: "fixed", width: "100%", bottom: "30px", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" } }>
				<div style={ { display: "inline-flex", pointerEvents: "all" } }>
					{ React.createElement(modal.comp) }
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  layers: state.map.layers,
  update: state.map.update
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MapModal)
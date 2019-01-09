import React from "react"
import { connect } from "react-redux"

import META from "./irvs_meta"

class IrvsOption extends React.Component {
	render() {
		const { option } = this.props;
		return(
			<div>
				{ option }
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IrvsOption)
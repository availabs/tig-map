import React from "react"
import { connect } from "react-redux"

import { SECTION_META } from "./irvs_meta"

import IrvsOption from "./IrvsOption"

class IrvsSection extends React.Component {
	render() {
		const { section } = this.props;
		return(
			<div>
				{
					SECTION_META[section].values.map(d => <IrvsOption key={ d } option={ d }/>)
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IrvsSection)
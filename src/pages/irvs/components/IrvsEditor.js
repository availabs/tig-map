import React from "react"
import { connect } from "react-redux"

import IrvsHeader from "./IrvsHeader"
import IrvsSection from "./IrvsSection"

class IrvsEditor extends React.Component {
	state = {
		section: 0
	}
	selectSection(section) {
		this.setState({ section })
	}
	render() {
		const { section } = this.state;
		return(
			<div>
				<IrvsHeader section={ section } select={ this.selectSection.bind(this) }/>
				<IrvsSection section={ section }/>
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IrvsEditor)
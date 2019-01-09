import React from "react"
import { connect } from "react-redux"

import { SECTION_META } from "./irvs_meta"

const HeaderSection = ({ name, active, select }) =>
	<div style={ { display: "inline-block", padding: "5px 10px" } }
		onClick={ select }>
		{ active ?
			<h4>{ name }</h4>
			: <h6>{ name }</h6>
		}
	</div>

class IrvsOption extends React.Component {
	render() {
		const { section } = this.props;
		return(
			<div>
				{ SECTION_META.map((s, i) =>
					<HeaderSection key={ s.name }
						name={ s.name }
						active={ section === i }
						select={ () => this.props.select(i) }/>)
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IrvsOption)
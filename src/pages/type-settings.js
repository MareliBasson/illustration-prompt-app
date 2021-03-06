import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import AllTypes from 'components/all-types'

class TypeSettings extends Component {
	render() {
		return (
			<PageTemplate pageHead="">
				<AllTypes />
			</PageTemplate>
		)
	}
}

export default TypeSettings

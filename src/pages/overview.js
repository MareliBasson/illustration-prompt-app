import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import AllPrompts from 'components/all-prompts'

class Overview extends Component {
	render() {
		return (
			<PageTemplate pageHead="">
				<AllPrompts />
			</PageTemplate>
		)
	}
}

export default Overview

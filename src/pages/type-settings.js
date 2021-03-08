import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import SettingsTypes from 'components/settings-types'

class TypeSettings extends Component {
	render() {
		return (
			<PageTemplate pageHead="">
				<SettingsTypes />
			</PageTemplate>
		)
	}
}

export default TypeSettings

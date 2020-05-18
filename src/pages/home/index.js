import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import SpellList from 'components/spell-list'
import './home.css'

class HomePage extends Component {
	render() {
		return (
			<PageTemplate pageHead="Home Page">
				<SpellList />
			</PageTemplate>
		)
	}
}

export default HomePage

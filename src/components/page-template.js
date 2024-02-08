import React from 'react'
import styled from 'styled-components'

import { Container } from 'styles/styles'
import { NavLink } from 'react-router-dom'
import { tokens } from 'styles/tokens'

export const PageTemplate = ({ children, pageHead }) => {
	return (
		<Page>
			<Header />
			<PageContent>
				<Container>{children}</Container>
			</PageContent>
		</Page>
	)
}

const Page = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`
const PageContent = styled.div`
	padding: 20px 0;
	flex: 1;

	@media (max-width: 768px) {
		padding: 40px;
	}
`

const Header = ({ heading }) => {
	return (
		<HeaderWrapper>
			<Container>
				<HeaderContainer>
					<Title>{heading}</Title>
					<Menu />
				</HeaderContainer>
			</Container>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	flex: 0;
	color: white;
	z-index: ${tokens.zHeader};
`
const HeaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		padding: 0 30px;
	}
`
const Title = styled.div`
	height: 60px;
	padding-right: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const menuItems = [
	{
		icon: 'home',
		path: '/',
	},
	{
		icon: 'cog',
		path: '/settings',
	},
	{
		icon: 'info',
		path: '/calculator',
	},
]

const Menu = () => {
	return (
		<MenuWrapper className='menu'>
			{menuItems.map((item, index) => (
				<MenuLink
					key={'menuItem-' + index}
					activeClassName='active'
					exact
					to={item.path}
				>
					<i className={`fa fa-${item.icon}`} />
				</MenuLink>
			))}
		</MenuWrapper>
	)
}

const MenuWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-content: center;
`
const MenuLink = styled(NavLink)`
	color: white;
	padding: 7px 15px;
	margin-left: 20px;
	font-weight: 300;
	font-size: 1rem;
	border-radius: 15px;

	&:hover,
	&:visited,
	&:active,
	&:focus {
		text-decoration: none;
		outline: none;
		color: white;
	}

	&:hover {
		text-decoration: none;
		color: #ff0000;
	}

	&:active,
	&.active {
		background-color: rgba(255, 255, 255, 0.3);
	}
`

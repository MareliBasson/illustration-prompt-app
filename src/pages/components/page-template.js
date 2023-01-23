import React from 'react'

import styled from 'styled-components'
import { Container } from 'styles/styles'

import { Header } from 'pages/components/header'

export const PageTemplate = ({ children, pageHead }) => {
	return (
		<Page>
			<Header heading={pageHead} />

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

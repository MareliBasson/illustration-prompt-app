import React from 'react'
import styled from 'styled-components'
import Header from 'components/header'

const PageTemplate = ({ children, pageHead }) => {
	return (
		<Page>
			<Header heading={pageHead} />

			<PageContent>
				<div className="container">{children}</div>
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
		padding: 20px;
	}
`

export default PageTemplate

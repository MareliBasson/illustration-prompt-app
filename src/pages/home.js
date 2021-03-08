import React from 'react'
import PageTemplate from 'components/page-template'
import PromptSelector from 'components/prompt-selector'

const HomePage = () => {
	return (
		<PageTemplate pageHead="">
			<PromptSelector />
		</PageTemplate>
	)
}

export default HomePage

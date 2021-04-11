import React from 'react'

import { PageTemplate } from 'pages/components/page-template'
import { PromptSelector } from 'pages/home/prompt-selector'

export const HomePage = () => {
	return (
		<PageTemplate pageHead=''>
			<PromptSelector />
		</PageTemplate>
	)
}

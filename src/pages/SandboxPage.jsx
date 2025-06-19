import React from 'react'
import CountryList from '../sandbox/CountryList'
import Parent from '../sandbox/providersExample/Parent'
import MessageProvider from '../sandbox/providers/SpecialMessageProvider'

function SandboxPage() {
	return (
		<div>
			<h1>Sandbox</h1>
			{/* 			<CountryList></CountryList>
 */}
			<MessageProvider>
			<Parent></Parent>
			</MessageProvider>
		</div>
	)
}

export default SandboxPage
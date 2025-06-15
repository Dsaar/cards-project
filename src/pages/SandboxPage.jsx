import React from 'react'
import CountryList from '../sandbox/CountryList'
import Parent from '../sandbox/providersExample/Parent'

function SandboxPage() {
	return (
		<div>
			<h1>Sandbox</h1>
			{/* 			<CountryList></CountryList>
 */}
			<Parent></Parent>
		</div>
	)
}

export default SandboxPage
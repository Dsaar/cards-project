import React from 'react'
import CountryList from '../sandbox/CountryList'
import Parent from '../sandbox/providersExample/Parent'
import MessageProvider from '../sandbox/providers/SpecialMessageProvider'
import { useCurrentUser } from '../users/providers/UserProvider'
import { Navigate } from 'react-router-dom'
import Counter from '../sandbox/components/Counter'

function SandboxPage() {

	const { user } = useCurrentUser()

	if (!user) {
		return <Navigate to={'/'} replace />
	}
	return (
		<div>
			<h1>Sandbox</h1>
			{/* 			<CountryList></CountryList>
 */}
			{/* <MessageProvider>
				<Parent></Parent>
			</MessageProvider> */}
			<Counter></Counter>
		</div>
	)
}

export default SandboxPage
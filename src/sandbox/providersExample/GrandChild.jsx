import React from 'react'

function GrandChild({message}) {
  return (
	<div>
		<h4>GrandChild Component</h4>
		<p>Parent:{message}</p>
	</div>
  )
}

export default GrandChild
import React from 'react'
import BCard from './Bcard'
import { Box, Grid, Typography } from '@mui/material'


function BCards({ cards }) {
	if (cards.length === 0) {
		return (
			<Box>
				<Typography>No cards to show</Typography>
			</Box >
		)
	};


	return (
		<Grid
			container
			spacing={3}
			justifyContent="center" // center cards horizontally
			alignItems="stretch"    // make cards equal height
		>
			{cards.map((card) => (
				<Grid
					item
					key={card._id}
					xs={12} sm={6} md={4} lg={3} // adjusts layout based on screen size
					display="flex"
				>
					<BCard card={card} />
				</Grid>
			))}
		</Grid>
	)
}

export default BCards
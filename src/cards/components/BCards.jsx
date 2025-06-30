import React from 'react';
import BCard from './Bcard';
import { Box, Grid, Typography } from '@mui/material';

function BCards({ cards, setCards }) {
	if (cards.length === 0) {
		return (
			<Box>
				<Typography>No cards to show</Typography>
			</Box>
		);
	}

	const handleDelete = (cardId) => {
		setCards((prev) => prev.filter((card) => card._id !== cardId));
	};

	return (
		<Grid
			container
			spacing={3}
			justifyContent="center"
			alignItems="stretch"
		>
			{cards.map((card) => (
				<Grid
					item
					key={card._id}
					xs={12} sm={6} md={4} lg={3}
					display="flex"
				>
					<BCard card={card} onDelete={handleDelete} />
				</Grid>
			))}
		</Grid>
	);
}

export default BCards;

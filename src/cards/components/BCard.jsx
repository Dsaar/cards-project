import { Card, CardMedia } from "@mui/material";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";

function BCard({ card,onDelete }) {
	return (
		<Card sx={{ maxWidth: 300, mx: 2 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={card.image.url}
				title="Businees logo"
			/>
			<BCardBody
				title={card.title}
				subtitle={card.subtitle}
				bizNumber={card.bizNumber}
				phone={card.phone}
				city={card.address.city}
			/>
			<BCardFooter
				cardId={card._id}
				bizNumber={card.bizNumber}
				onDelete={onDelete}
			/>
		</Card>
	);
}

export default BCard;
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, CardActions, IconButton } from "@mui/material";
import { getToken } from "../../users/services/localStorageService";
import axios from "axios";
import { useSnack } from "../../providers/SnackBarProvider";

function BCardFooter({ cardId, bizNumber, onDelete }) {
	const setSnack = useSnack();

	const handleDelete = async () => {
		const token = getToken();

		console.log("Attempting delete with:", {
			cardId,
			bizNumber,
			token: token?.slice(0, 20) + "...",
		});

		try {
			await axios.delete(
				`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
				{
					headers: {
						"x-auth-token": token,
						"Content-Type": "application/json",
					},
					data: { bizNumber },
				}
			);

			setSnack("success", "Card deleted successfully.");
			if (onDelete) onDelete(cardId);
		} catch (error) {
			if (error.response) {
				console.error("DELETE failed:", {
					status: error.response.status,
					message: error.response.data,
				});
				setSnack("error", error.response.data || "Card deletion failed.");
			} else {
				console.error("Unexpected error:", error.message);
				setSnack("error", "Unexpected error during deletion.");
			}
		}
	};

	return (
		<CardActions sx={{ display: "flex", justifyContent: "space-between" }} disableSpacing>
			<Box>
				<IconButton onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>

				<IconButton>
					<EditIcon />
				</IconButton>
			</Box>

			<Box>
				<IconButton>
					<CallIcon />
				</IconButton>

				<IconButton>
					<FavoriteIcon />
				</IconButton>
			</Box>
		</CardActions>
	);
}

export default BCardFooter;

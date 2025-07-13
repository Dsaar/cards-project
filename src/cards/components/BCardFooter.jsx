import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	Box,
	CardActions,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../users/services/localStorageService';
import axios from 'axios';
import { useSnack } from '../../providers/SnackBarProvider';

function BCardFooter({ cardId, bizNumber, onDelete, toggleLike, isLiked }) {
	const setSnack = useSnack();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleConfirmOpen = (e) => {
		e.stopPropagation();
		setOpen(true);
	};
	const handleConfirmClose = () => setOpen(false);

	const handleDelete = async () => {
		const token = getToken();
		try {
			await axios.delete(
				`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
				{
					headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
					data: { bizNumber },
				}
			);
			setSnack('success', 'Card deleted successfully.');
			handleConfirmClose();
			if (onDelete) onDelete(cardId);
		} catch (err) {
			setSnack('error', 'Failed to delete card');
		}
	};

	return (
		<>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
				<Box>
					<IconButton onClick={(e) => handleConfirmOpen(e)}>
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={(e) => {
						e.stopPropagation();
						navigate(`/edit-card/${cardId}`);
					}}>
						<EditIcon />
					</IconButton>
				</Box>
				<Box>
					<IconButton onClick={(e) => {
						e.stopPropagation();
						window.open(`tel:${bizNumber}`, '_self');
					}}>
						<CallIcon />
					</IconButton>
					<IconButton onClick={(e) => {
						e.stopPropagation();
						toggleLike(cardId);
					}}>
						<FavoriteIcon color={isLiked ? 'error' : ''} />
					</IconButton>
				</Box>
			</CardActions>

			<Dialog open={open} onClose={handleConfirmClose}>
				<DialogTitle>Delete Card?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this card? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirmClose}>Cancel</Button>
					<Button onClick={handleDelete} color="error" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default BCardFooter;

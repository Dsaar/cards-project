import React, { useEffect, useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import BCards from '../cards/components/Bcards';
import axios from 'axios';
import { useSnack } from '../providers/SnackBarProvider';
import AddNewItemButton from '../components/AddNewItemButton';
import ROUTES from '../router/routesDictionary';
import { useCurrentUser } from '../users/providers/UserProvider';
import { getToken } from '../users/services/localStorageService';

function CardsPage() {
  const [cards, setCards] = useState([]);
  const setSnack = useSnack();
  const { user } = useCurrentUser();

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'
      );
      setCards(response.data);
    } catch (err) {
      console.error('Fetch failed', err);
      setSnack('error', 'Could not load cards');
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleToggleLike = useCallback(async (cardId) => {
    try {
      const token = getToken();
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      // optimistic update
      setCards((prev) =>
        prev.map((card) =>
          card._id === cardId
            ? {
              ...card,
              likes: card.likes.includes(user._id)
                ? card.likes.filter((id) => id !== user._id)
                : [...card.likes, user._id],
            }
            : card
        )
      );
    } catch (err) {
      setSnack('error', 'Like action failed');
    }
  }, [user]);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>
        Cards Page
      </Typography>
      <BCards cards={cards} setCards={setCards} onToggleLike={handleToggleLike} user={user} />
      {user && <AddNewItemButton to={ROUTES.createCard} text="Create" />}
    </Container>
  );
}

export default CardsPage;

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
import { toggleLikedCard } from '../users/services/likesService';

function CardsPage() {
  const [cards, setCards] = useState([]);
  const setSnack = useSnack();
  const { user } = useCurrentUser();

  const getCardsFromServer = async () => {
    try {
      const response = await axios.get(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'
      );
      setCards(response.data);
      setSnack('success', "All cards imported successfully"); // ✅ Snackbar restored
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      setSnack('error', "Failed to load cards");
    }
  };

  useEffect(() => {
    getCardsFromServer();
  }, []);

  const handleToggleLike = useCallback(async (cardId) => {
    try {
      const token = getToken();
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      const updatedCard = response.data;
      setCards((prev) =>
        prev.map((card) => (card._id === updatedCard._id ? updatedCard : card))
      );
    } catch (err) {
      console.error("Like toggle failed", err);
      setSnack("error", "Failed to like card");
    }
  }, []);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>Cards Page</Typography>
      <BCards
        cards={cards}
        setCards={setCards}
        onToggleLike={handleToggleLike}
        user={user}
      />
      {user && <AddNewItemButton to={ROUTES.createCard} text="Create" />}
    </Container>
  );
}

export default CardsPage;

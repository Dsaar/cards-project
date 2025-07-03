import React, { useEffect, useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import BCards from '../cards/components/Bcards';
import axios from 'axios';
import { Container } from '@mui/material';
import { useSnack } from '../providers/SnackBarProvider';
import AddNewItemButton from '../components/AddNewItemButton';
import ROUTES from '../router/routesDictionary';
import { useCurrentUser } from '../users/providers/UserProvider';
import {
  getLikedCards,
  toggleLikedCard,
} from '../users/services/likesService';

function CardsPage() {
  const [cards, setCards] = useState([]);
  const [likedCardIds, setLikedCardIds] = useState(() => getLikedCards());
  const setSnack = useSnack();
  const { user } = useCurrentUser();

  const getCardsFromServer = async () => {
    try {
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(response.data);
      setSnack('success', "All cards imported successfully");
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      setSnack('error', "Failed to load cards");
    }
  };

  useEffect(() => {
    getCardsFromServer();
  }, []);

  const handleToggleLike = useCallback((cardId) => {
    const updated = toggleLikedCard(cardId);
    setLikedCardIds(updated);
  }, []);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>Cards Page</Typography>
      <BCards
        cards={cards}
        setCards={setCards}
        likedCardIds={likedCardIds}
        onToggleLike={handleToggleLike}
      />
      {user && <AddNewItemButton to={ROUTES.createCard} text="Create" />}
    </Container>
  );
}

export default CardsPage;

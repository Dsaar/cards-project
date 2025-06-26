import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import BCards from '../cards/components/Bcards';
import axios from 'axios';
import { Container } from '@mui/material';
import { useSnack } from '../providers/SnackBarProvider';
import AddNewItemButton from '../components/AddNewItemButton';
import ROUTES from '../router/routesDictionary';
import { useCurrentUser } from '../users/providers/UserProvider';

function CardsPage() {
  const [cards, setCards] = useState([]);

  const setSnack = useSnack();

  const { user } = useCurrentUser();

  const getCardsFromServer = async () => {
    const response = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
    );
    setCards(response.data.slice(0, 20));
    setSnack('success', "All cards imported successfully");
  };

  useEffect(() => {
    getCardsFromServer();
  }, []);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>Cards Page</Typography>
      <BCards cards={cards} />

      {/* Floating Button */}
      {user && <AddNewItemButton to={ROUTES.createCard} text="Create" />}
    </Container>
  );
}

export default CardsPage;

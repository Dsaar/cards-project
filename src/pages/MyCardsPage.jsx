import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import BCards from "../cards/components/Bcards";
import { getToken } from "../users/services/localStorageService";
import {
  getLikedCards,
  toggleLikedCard,
} from "../users/services/likesService";

function MyCardsPage() {
  const [myCards, setMyCards] = useState([]);
  const [likedCardIds, setLikedCardIds] = useState(() => getLikedCards());

  const fetchMyCards = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setMyCards(response.data);
    } catch (error) {
      console.error("Failed to fetch your cards:", error);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  const handleToggleLike = useCallback((cardId) => {
    const updated = toggleLikedCard(cardId);
    setLikedCardIds(updated);
  }, []);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>My Cards</Typography>
      <BCards
        cards={myCards}
        setCards={setMyCards}
        likedCardIds={likedCardIds}
        onToggleLike={handleToggleLike}
      />
    </Container>
  );
}

export default MyCardsPage;

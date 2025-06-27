import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import BCards from "../cards/components/Bcards";
import { getToken } from "../users/services/localStorageService";

function MyCardsPage() {
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
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

    fetchMyCards();
  }, []);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>My Cards</Typography>
      <BCards cards={myCards} />
    </Container>
  );
}

export default MyCardsPage;

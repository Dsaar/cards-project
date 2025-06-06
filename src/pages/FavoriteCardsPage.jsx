import React, { useEffect, useState } from 'react';

function FavoriteCardsPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000); // 1000ms = 1 second

    return () => clearInterval(intervalId); // clear interval on unmount
  }, []); // empty dependency array ensures this runs only once

  return (
    <div>
      FavoriteCardsPage
      <p>Count: {count}</p>
    </div>
  );
}

export default FavoriteCardsPage;

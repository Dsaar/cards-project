const LIKED_CARDS_KEY = "likedCards";

export const getLikedCards = () => {
	try {
		const stored = localStorage.getItem(LIKED_CARDS_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

export const toggleLikedCard = (cardId) => {
	const liked = getLikedCards();
	const id = String(cardId); // ✅ ensure it's a string

	const index = liked.indexOf(id);
	if (index >= 0) {
		liked.splice(index, 1);
	} else {
		liked.push(id);
	}

	localStorage.setItem(LIKED_CARDS_KEY, JSON.stringify(liked));
	return liked; // ✅ return updated list
};

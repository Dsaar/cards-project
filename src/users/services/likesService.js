import axios from "axios";
import { getToken } from "./localStorageService";

export const toggleLikedCard = async (cardId) => {
	const token = getToken();
	if (!token) throw new Error("Missing token");

	try {
		// Toggle like status on server
		const response = await axios.patch(
			`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
			{},
			{ headers: { "x-auth-token": token } }
		);
		return response.data; // updated card object
	} catch (err) {
		console.error("Failed to toggle like on server:", err);
		throw err;
	}
};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
	users: {
		register: `${BASE_URL}/users`,
		login: `${BASE_URL}/users/login`,
		me: `${BASE_URL}/users/me`
	},
	cards: {
		all: `${BASE_URL}/cards`,
		myCards: `${BASE_URL}/cards/my-cards`,
		single: (id) => `${BASE_URL}/cards/${id}`,
		create: `${BASE_URL}/cards`,
		update: (id) => `${BASE_URL}/cards/${id}`,
		toggleLike: (id) => `${BASE_URL}/cards/${id}`,
	},
};

export default ENDPOINTS;
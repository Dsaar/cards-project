import { createContext, useContext, useState } from "react";



//step 1: create the context

const UserContext = createContext();

//step 2: create the provider

export default function UserProvider({ children }) {
	const [user, setUser] = useState()
	const [token, setToken] = useState()

return <UserContext.Provider value={{user,setUser,token,setToken}}>{children}</UserContext.Provider>
}

//step 3: create custom hook for using the context (optional)

export const useCurrentUser = () => {

	const context = useContext(UserContext);

	if (!context) {

		throw new Error("useCurrentUser must be used within a provider");

	}

	return context;

};
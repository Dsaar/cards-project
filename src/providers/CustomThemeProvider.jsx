import { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";


//step 1: create the context

const ThemeContext = createContext();

//step 2: create the provider

export default function customThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(false)

	const toggleMode = () => {
		setIsDark(prev => !prev)
	}

	const theme = createTheme({
		palette: {
			mode: isDark ? 'dark' : 'light'
		}
	})

	return <ThemeProvider theme={theme}>
		<ThemeContext.Provider value={{toggleMode,isDark}}>{children}</ThemeContext.Provider>
	</ThemeProvider>


}

//step 3: create custom hook for using the context (optional)

export const useTheme = () => {

	const context = useContext(ThemeContext);

	if (!context) {

		throw new Error("useTheme must be used within a provider");

	}

	return context;

};
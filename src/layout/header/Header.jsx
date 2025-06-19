import React from 'react'
import { AppBar, Box, Toolbar, Button} from "@mui/material";
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';
import {useTheme} from '../../providers/CustomThemeProvider';
function Header() {
	const { toggleMode,isDark } = useTheme()
	return (
		<div>
			<AppBar position="sticky" color="primary" elevation={10}>
				<Toolbar>
					<Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
						<NavLinkTemplate to={ROUTES.root} label="Home" />
						<NavLinkTemplate to={ROUTES.about} label="About" />
						<NavLinkTemplate to={ROUTES.myCards} label="My Card" />
						<NavLinkTemplate to={ROUTES.favorite} label="Favorite Card" />
						<NavLinkTemplate to={ROUTES.sandbox} label="Sandbox" />
					</Box>

					<Box sx={{ display: 'flex', gap: 1 }}>
						<NavLinkTemplate to={ROUTES.register} label="SIGNUP" />
						<NavLinkTemplate to={ROUTES.login} label="LOGIN" />
						<Button onClick={toggleMode} sx={{ color: 'white' }}>{isDark?'Light':'Dark'} Mode</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
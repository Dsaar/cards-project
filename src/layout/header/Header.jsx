import React from 'react'
import { AppBar, Box, Toolbar } from "@mui/material";
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';
function Header() {
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
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
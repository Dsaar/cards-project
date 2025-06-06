
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLinkTemplate({ to, label, style = {}, activeStyle = {} }) {
	const location = useLocation();
	const isActive = location.pathname === to;

	const baseStyle = {
		marginRight: '16px',
		color: 'white',
		textDecoration: 'none',
		...style,
		...(isActive ? activeStyle : {})
	};

	return (
		<Link to={to} style={baseStyle}>
			{label}
		</Link>
	);
}

export default NavLinkTemplate;

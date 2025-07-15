import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { getToken } from '../../users/services/localStorageService';
import ENDPOINTS from '../../api/endpoints';
import { useSnack } from '../../providers/SnackBarProvider';

function CRMUsers() {
	const [rows, setRows] = useState([]);
	const setSnack = useSnack(); // ✅ now inside the component function

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = getToken();
				const response = await axios.get(ENDPOINTS.users.all, {
					headers: {
						'x-auth-token': token,
					},
				});

				const userList = Array.isArray(response.data)
					? response.data
					: response.data.users;

				if (!Array.isArray(userList)) {
					console.error("Unexpected response format:", response.data);
					return;
				}

				const transformedUsers = userList.map((user) => ({
					id: user._id,
					...user.name,
					email: user.email,
					phone: user.phone,
					isAdmin: user.isAdmin,
					isBusiness: user.isBusiness,
					_id: user._id,
				}));

				setRows(transformedUsers);
			} catch (error) {
				console.error('Failed to fetch users', error);
			}
		};

		fetchUsers();
	}, []);

	const handleToggleBusiness = async (userId) => {
		try {
			const token = getToken();

			await axios.patch(
				ENDPOINTS.users.toggleBusinessStatus(userId),
				{},
				{
					headers: {
						'x-auth-token': token,
					},
				}
			);

			setRows((prev) =>
				prev.map((user) =>
					user._id === userId
						? { ...user, isBusiness: !user.isBusiness }
						: user
				)
			);

			setSnack('success', 'Business status updated successfully.');
		} catch (error) {
			console.error('Failed to toggle business status:', error);
			setSnack('error', 'Failed to update business status.');
		}
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 200 },
		{ field: 'first', headerName: 'First Name', width: 150 },
		{ field: 'middle', headerName: 'Middle Name', width: 150 },
		{ field: 'last', headerName: 'Last Name', width: 150 },
		{ field: 'email', headerName: 'Email', width: 200 },
		{ field: 'phone', headerName: 'Phone', width: 150 },
		{ field: 'isAdmin', headerName: 'Admin', type: 'boolean', width: 100 },
		{ field: 'isBusiness', headerName: 'Business', type: 'boolean', width: 120 },
		{
			field: 'toggleBusiness',
			headerName: 'Business Status',
			width: 180,
			renderCell: (params) => (
				<Button
					variant="outlined"
					size="small"
					onClick={() => handleToggleBusiness(params.row._id)}
				>
					{params.row.isBusiness ? 'Revoke' : 'Make Business'}
				</Button>
			),
		},
	];

	return (
		<Box sx={{ height: 600, width: '100%', padding: 3 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 10, 20]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
	);
}

export default CRMUsers;

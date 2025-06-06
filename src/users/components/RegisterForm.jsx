import { Button, Container, TextField } from '@mui/material'
import Joi from 'joi'
import useForm from '../../hooks/useForm';

function RegisterForm() {
	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		{ firstName: "", lastName: "", middleName: "" },
		{
			firstName: Joi.string().min(2).max(10),
			middleName: Joi.string().allow(""),
			lastName: Joi.string().min(2).required(),
		}
	);

	return (
		<Container
			sx={{
				pt: 2,
			}}
		>
			<TextField
				label={"first name"}
				name="firstName"
				onChange={handleChange}
				error={Boolean(errors.firstName)}
				helperText={errors.firstName}
			/>
			<TextField
				label={"middle name"}
				name="middleName"
				onChange={handleChange}
				error={Boolean(errors.middleName)}
				helperText={errors.middleName}
			/>
			<TextField
				label={"last name"}
				name="lastName"
				onChange={handleChange}
				error={Boolean(errors.lastName)}
				helperText={errors.lastName}
			/>

			<Button
				variant="contained"
				sx={{ display: "block" }}
				onClick={handleSubmit}
			>
				Sign up
			</Button>
		</Container>
	);
}

export default RegisterForm;
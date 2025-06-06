import { Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import Joi from 'joi'

function RegisterForm() {
	const [userDetails, setUserDetails] = useState(
		{
			firstName: '',
			lastName: '',
			middleName: ''

		}
	);

	const [errors, setErrors] = useState({});

	const scheme = Joi.object({
		firstName: Joi.string().min(2).max(10),
		middleName: Joi.string().optional().allow(''),
		lastName: Joi.string().min(2).required()
	})

	const handleSignup = () => {
		console.log(userDetails)

		const { error } = scheme.validate(userDetails, { abortEarly: false })

		console.log(error);

	}

	const handleChange = (event) => {
		const fieldName = event.target.name;
		const fieldValue = event.target.value;

		setUserDetails((prev) => ({
			...prev,
			[fieldName]: fieldValue,
		}));

		if (fieldName === 'firstName') {
			const firstNameScheme = Joi.object({ firstName: Joi.string().min(2).max(10) })

			const { error } = firstNameScheme.validate({ firstName: fieldValue });
			if(error){
				setErrors({ firstName: error.details[0].message });

			}else{
				setErrors(prev=>{
					delete prev.firstName;
					return prev;
				})
			}

		}


	};
	return (
		<Container sx={{ pt: 2 }}>
			<TextField label={'First Name'}
				name='firstName' onChange={handleChange} error={Boolean(errors.firstName)}
				helperText={errors.firstName} />
			<TextField label={'Middle Name'} name='middleName' onChange={handleChange} />
			<TextField label={'Last Name'} name='lastName' onChange={handleChange} />

			<Button variant='contained' sx={{ display: 'block' }} onClick={handleSignup}>Sign Up</Button>
		</Container>

	)
}

export default RegisterForm
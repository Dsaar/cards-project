import { TextField } from "@mui/material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { use } from "react";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLogInForm";




const handleLogin = async (user) => {
	try {
		const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', user);
		console.log(response);
	} catch (error) {
		alert('The login has failed')
	}
};

function LoginForm() {
	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialLoginForm,
		loginSchema,
		handleLogin
	);

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={() => { }}
			title={"sign in form"}
			styles={{ maxWidth: "800px" }}
		>
			<TextField
				name="email"
				label="email"
				error={errors.email}
				onChange={handleChange}
				value={formDetails.email}
			/>
			<TextField
				name="password"
				label="password"
				error={errors.password}
				onChange={handleChange}
				value={formDetails.password}
				type="password"
			/>
		</Form>
	);
}

export default LoginForm;
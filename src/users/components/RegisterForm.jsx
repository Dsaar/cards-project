import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../hooks/useForm";
import signupSchema from "../models/signupShcema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import Form from "../../components/Form";
import { useCurrentUser } from "../providers/UserProvider";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";

function RegisterForm() {
	const navigate = useNavigate();
	const { setUser, setToken } = useCurrentUser();

	const handleSignUp = async (userDetails) => {
		const userDetailsForServer = {
			name: {
				first: userDetails.first,
				middle: userDetails.middle,
				last: userDetails.last,
			},
			phone: userDetails.phone,
			email: userDetails.email,
			password: userDetails.password,
			image: {
				url: userDetails.url,
				alt: userDetails.alt,
			},
			address: {
				state: userDetails.state,
				country: userDetails.country,
				city: userDetails.city,
				street: userDetails.street,
				houseNumber: userDetails.houseNumber,
				zip: userDetails.zip,
			},
			isBusiness: true,
		};

		try {
			const response = await axios.post(
				"https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
				userDetailsForServer
			);
			console.log("Signup success:", response.data);

			// OPTIONAL: Auto-login after signup
			const loginResponse = await axios.post(
				"https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
				{
					email: userDetails.email,
					password: userDetails.password,
				}
			);
			setTokenInLocalStorage(loginResponse.data);
			setToken(loginResponse.data);
			setUser(getUser());
			console.log("Redirecting...")
			navigate("/"); // Redirect to home page
		} catch (error) {
			console.error("Signup failed:", error);
			if (error.response?.data) {
				alert(error.response.data);
			}
		}
	};

	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialSignupForm,
		signupSchema,
		handleSignUp
	);

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={() => { }}
			title="Sign Up Form"
			styles={{ maxWidth: "800px" }}
		>
			{[
				{ name: "first", label: "First Name" },
				{ name: "middle", label: "Middle Name", required: false },
				{ name: "last", label: "Last Name" },
				{ name: "phone", label: "Phone", type: "phone" },
				{ name: "email", label: "Email", type: "email" },
				{ name: "password", label: "Password", type: "password" },
				{ name: "url", label: "Image URL", required: false },
				{ name: "alt", label: "Image Alt", required: false },
				{ name: "state", label: "State", required: false },
				{ name: "country", label: "Country" },
				{ name: "city", label: "City" },
				{ name: "street", label: "Street" },
				{ name: "houseNumber", label: "House Number", type: "number" },
				{ name: "zip", label: "Zip", type: "number", required: false },
			].map((field) => (
				<TextField
					key={field.name}
					name={field.name}
					label={field.label}
					type={field.type || "text"}
					required={field.required !== false}
					error={!!errors[field.name]}
					helperText={errors[field.name]}
					onChange={handleChange}
					value={formDetails[field.name]}
					sx={{ m: 1, width: "calc(50% - 16px)" }}
				/>
			))}
		</Form>
	);
}

export default RegisterForm;

import {
	TextField,
	Grid,
	Box,
	Button,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../hooks/useForm";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLogInForm";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import Form from "../../components/Form";

function LoginForm() {
	const { user, setUser, setToken } = useCurrentUser();
	const navigate = useNavigate();

	if (user) return <Navigate to="/" replace />;

	const handleLogin = async (credentials) => {
		try {
			const response = await axios.post(
				"https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
				credentials
			);
			setTokenInLocalStorage(response.data);
			setToken(response.data);
			setUser(getUser());
		} catch (error) {
			alert("Login failed");
		}
	};

	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialLoginForm,
		loginSchema,
		handleLogin
	);

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={() => { }}
			title="Sign In Form"
			styles={{ maxWidth: "900px" }}
		>
			<Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						sx={{ width: "400px" }}
						name="email"
						label="Email"
						type="email"
						value={formDetails.email}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						sx={{ width: "400px" }}
						name="password"
						label="Password"
						type="password"
						value={formDetails.password}
						onChange={handleChange}
						error={!!errors.password}
						helperText={errors.password}
					/>
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ width: "820px", mx: "auto" }}>
						<Button
							fullWidth
							variant="outlined"
							startIcon={<PersonAddAltIcon />}
							onClick={() => navigate("/register")}
						>
							Sign Up
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Form>
	);
}

export default LoginForm;

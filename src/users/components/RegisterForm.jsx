import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import Joi from "joi";
import useForm from "../../hooks/useForm";

function RegisterForm() {
	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		{
			firstName: "",
			middleName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			imageUrl: "",
			imageAlt: "",
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
			isBusiness: false,
		},
		{
			firstName: Joi.string().min(2).max(256).required(),
			middleName: Joi.string().min(2).max(256).allow(""),
			lastName: Joi.string().min(2).max(256).required(),
			email: Joi.string().min(5).email({ tlds: false }).required(),
			phone: Joi.string().min(9).max(11).required(),
			password: Joi.string().min(7).required(),
			imageUrl: Joi.string().uri().allow(""),
			imageAlt: Joi.string().min(2).max(256).allow(""),
			state: Joi.string().min(2).max(256).allow(""),
			country: Joi.string().min(2).max(256).required(),
			city: Joi.string().min(2).max(256).required(),
			street: Joi.string().min(2).max(256).required(),
			houseNumber: Joi.string().min(2).max(256).required(),
			zip: Joi.string().min(2).max(256).allow(""),
			isBusiness: Joi.boolean(),
		}
	);

	return (
		<Container maxWidth="md" sx={{ py: 5 }}>
			<Paper elevation={3} sx={{ p: 4, bgcolor: "#eaf4fc" }}>
				<Typography variant="h5" align="center" gutterBottom>
					REGISTER FORM
				</Typography>

				<Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
					{[
						{ label: "First name *", name: "firstName" },
						{ label: "Middle name", name: "middleName" },
						{ label: "Last name *", name: "lastName" },
						{ label: "Phone *", name: "phone" },
						{ label: "Email *", name: "email" },
						{ label: "Password *", name: "password", type: "password" },
						{ label: "Image url", name: "imageUrl" },
						{ label: "Image alt", name: "imageAlt" },
						{ label: "State", name: "state" },
						{ label: "Country *", name: "country" },
						{ label: "City *", name: "city" },
						{ label: "Street *", name: "street" },
						{ label: "House number *", name: "houseNumber" },
						{ label: "Zip", name: "zip" },
					].map(({ label, name, type = "text" }) => (
						<Grid item xs={12} sm={6} key={name}>
							<TextField
								fullWidth
								label={label}
								name={name}
								type={type}
								value={formDetails[name]}
								onChange={handleChange}
								error={Boolean(errors[name])}
								helperText={errors[name]}
								sx={{minWidth:'300px'}}
							/>
						</Grid>
					))}

					<Grid item xs={12} sx={{minWidth:'700px', display:'flex', justifyContent:'center'}}>
						<FormControlLabel
							control={
								<Checkbox
									name="isBusiness"
									checked={formDetails.isBusiness}
									onChange={(e) =>
										handleChange({
											target: {
												name: "isBusiness",
												value: e.target.checked,
											},
										})
									}
								/>
							}
							label="Sign up as business"
						/>
					</Grid>

					<Grid item xs={12} sm={6} sx={{minWidth:'200px'}}>
						<Button
							fullWidth
							variant="outlined"
							color="error"
							onClick={() => console.log("Canceled")}
						>
							Cancel
						</Button>
					</Grid>

					<Grid item xs={12} sm={6} sx={{minWidth:'200px'}}>
						<Button
							fullWidth
							variant="contained"
							onClick={handleSubmit}
							disabled={Object.keys(errors).length > 0}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}

export default RegisterForm;
  
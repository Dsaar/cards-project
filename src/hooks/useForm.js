import { useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schemaObj, onSubmit) {
	const [formDetails, setFormDetails] = useState(initialForm);
	const [errors, setErrors] = useState({});

	const schema = Joi.object(schemaObj);

	const handleChange = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		setFormDetails((prev) => ({
			...prev,
			[fieldName]: fieldValue,
		}));

		const fieldSchema = Joi.object({
			[fieldName]: schemaObj[fieldName],
		});

		const { error } = fieldSchema.validate({ [fieldName]: fieldValue });

		if (error) {
			setErrors({ [fieldName]: error.details[0].message });
		} else {
			setErrors((prev) => {
				delete prev[fieldName];
				return prev;
			});
		}
	};

	const handleSubmit = () => {
		console.log(formDetails);
		const { error } = schema.validate(formDetails, { abortEarly: false });
		console.log(error);

		if (!error) {
			onSubmit(formDetails);
		}
	};

	return {
		formDetails,
		setFormDetails,
		errors,
		handleChange,
		handleSubmit,
	};
}
import React from "react";
import { Box } from "@mui/material";
import EditCardForm from "../users/components/EditCardForm";

function EditCardPage() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#e3f2fd",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				p: 0,
			}}
		>
			<EditCardForm />
		</Box>
	);
}

export default EditCardPage;

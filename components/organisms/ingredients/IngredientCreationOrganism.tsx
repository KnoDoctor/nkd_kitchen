import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import useIngredients from "../../../hooks/ingredients/useIngredients";

import { createLookupString } from "../../../utils/helperFunctions";

const IngredientCreationOrganism = ({ handleClose }: any) => {
	const ingredients = useIngredients();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newIngredientObject = {
				ingredient_name: formData.get("ingredientName"),
			};

			const createIngredientRes = await fetch(`/api/ingredients`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newIngredientObject),
			});
			const createIngredientData = await createIngredientRes.json();

			if (createIngredientData.success) {
				ingredients.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createIngredientData);

				setIsError(true);
				if (createIngredientData.message) setErrorMessage(`${createIngredientData.message}`);
				if (createIngredientData.error) setErrorMessage(`API Error: ${createIngredientData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Ingredient</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="ingredientName"
						label="Ingredient Name"
						name="ingredientName"
						autoFocus
					/>
				</DialogContent>
				<DialogActions>
					<Button size="small" onClick={handleClose}>
						Cancel
					</Button>
					<Button type="submit" variant={"contained"} size="small">
						Create
					</Button>
				</DialogActions>
			</Box>
		</>
	);
};

export default IngredientCreationOrganism;
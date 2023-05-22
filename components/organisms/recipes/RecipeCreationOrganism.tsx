import * as React from "react";
import { useSession } from "next-auth/react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import useRecipes from "../../../hooks/recipes/useRecipes";

import { createLookupString } from "../../../utils/helperFunctions";

const RecipeCreationOrganism = ({ handleClose }: any) => {
	const { data: session } = useSession();
	console.log(session);

	const recipes = useRecipes();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newRecipeObject = {
				recipe_name: formData.get("recipeName"),
			};

			const createRecipeRes = await fetch(`/api/recipes`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newRecipeObject),
			});
			const createRecipeData = await createRecipeRes.json();

			if (createRecipeData.success) {
				recipes.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createRecipeData);

				setIsError(true);
				if (createRecipeData.message) setErrorMessage(`${createRecipeData.message}`);
				if (createRecipeData.error) setErrorMessage(`API Error: ${createRecipeData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Recipe</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="recipeName"
						label="Recipe Name"
						name="recipeName"
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

export default RecipeCreationOrganism;

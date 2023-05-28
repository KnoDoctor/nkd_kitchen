import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import useCategories from "../../../hooks/categories/useCategories";

import { createLookupString } from "../../../utils/helperFunctions";

const CategoryCreationOrganism = ({ handleClose }: any) => {
	const categories = useCategories();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newCategoryObject = {
				category_name: formData.get("categoryName"),
			};

			const createCategoryRes = await fetch(`/api/categories`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newCategoryObject),
			});
			const createCategoryData = await createCategoryRes.json();

			if (createCategoryData.success) {
				categories.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createCategoryData);

				setIsError(true);
				if (createCategoryData.message) setErrorMessage(`${createCategoryData.message}`);
				if (createCategoryData.error) setErrorMessage(`API Error: ${createCategoryData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Category</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="categoryName"
						label="Category Name"
						name="categoryName"
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

export default CategoryCreationOrganism;
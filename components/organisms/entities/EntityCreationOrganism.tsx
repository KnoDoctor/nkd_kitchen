import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import useEntities from "../../../hooks/entities/useEntities";

import { createLookupString } from "../../../utils/helperFunctions";

const EntityCreationOrganism = ({ handleClose }: any) => {
	const entities = useEntities();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newEntityObject = {
				entity_name: formData.get("entityName"),
				entity_slug: formData.get("entitySlug"),
			};

			const createEntityRes = await fetch(`/api/entities`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEntityObject),
			});
			const createEntityData = await createEntityRes.json();

			if (createEntityData.success) {
				entities.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createEntityData);

				setIsError(true);
				if (createEntityData.message) setErrorMessage(`${createEntityData.message}`);
				if (createEntityData.error) setErrorMessage(`API Error: ${createEntityData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Entity</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="entityName"
						label="Entity Name"
						name="entityName"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="entitySlug"
						label="Entity Slug"
						name="entitySlug"
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

export default EntityCreationOrganism;

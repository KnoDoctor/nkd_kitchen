import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import useModules from "../../../hooks/modules/useModules";

import { createLookupString } from "../../../utils/helperFunctions";

const ModuleCreationOrganism = ({ handleClose }: any) => {
	const modules = useModules();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newModuleObject = {
				module_name: formData.get("moduleName"),
				module_slug: formData.get("moduleSlug"),
			};

			const createModuleRes = await fetch(`/api/modules`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newModuleObject),
			});
			const createModuleData = await createModuleRes.json();

			if (createModuleData.success) {
				modules.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createModuleData);

				setIsError(true);
				if (createModuleData.message) setErrorMessage(`${createModuleData.message}`);
				if (createModuleData.error) setErrorMessage(`API Error: ${createModuleData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Module</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="moduleName"
						label="Module Name"
						name="moduleName"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="moduleSlug"
						label="Module Slug"
						name="moduleSlug"
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

export default ModuleCreationOrganism;

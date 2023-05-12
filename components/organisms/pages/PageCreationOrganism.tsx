import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import usePages from "../../../hooks/pages/usePages";

import { createLookupString } from "../../../utils/helperFunctions";

const PageCreationOrganism = ({ handleClose }: any) => {
	const pages = usePages();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newPageObject = {
				page_name: formData.get("pageName"),
				page_lookup_string: createLookupString(formData.get("pageLookupString")),
			};

			const createPageRes = await fetch(`/api/pages`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPageObject),
			});
			const createPageData = await createPageRes.json();

			if (createPageData.success) {
				pages.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createPageData);

				setIsError(true);
				if (createPageData.message) setErrorMessage(`${createPageData.message}`);
				if (createPageData.error) setErrorMessage(`API Error: ${createPageData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Page</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="pageName"
						label="Page Name"
						name="pageName"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="pageLookupString"
						label="Page Slug"
						name="pageLookupString"
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

export default PageCreationOrganism;

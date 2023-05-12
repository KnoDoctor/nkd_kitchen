import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import usePeople from "../../../hooks/people/usePeople";

const PersonCreatationOrganism = ({ handleClose }: any) => {
	const people = usePeople();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const newPersonObject = {
				first_name: formData.get("firstName"),
				last_name: formData.get("lastName"),
			};

			const createPersonRes = await fetch(`/api/people`, {
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPersonObject),
			});
			const createPersonData = await createPersonRes.json();

			if (createPersonData.success) {
				people.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", createPersonData);

				setIsError(true);
				if (createPersonData.message) setErrorMessage(`${createPersonData.message}`);
				if (createPersonData.error) setErrorMessage(`API Error: ${createPersonData.error}`);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New Person</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="firstName"
						label="First Name"
						name="firstName"
						autoComplete="given-name"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="lastName"
						label="Last Name"
						type="text"
						id="lastName"
						autoComplete="family-name"
					/>

					{/* <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid> */}
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

export default PersonCreatationOrganism;

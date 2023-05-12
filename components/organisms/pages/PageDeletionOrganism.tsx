import React, { useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import usePages from "../../../hooks/pages/usePages";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const PageDeletionOrganism = ({ pageId, pageName, open, handleClose }: any) => {
	// const pages = usePages();
	const router = useRouter();

	const [errorMessage, setErrorMessage] = useState("");
	const [pageDeleted, setPageDeleted] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const deletePage = async (pageId: string) => {
		const reqOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			let pageRes = await fetch(`/api/pages/${pageId}`, reqOptions);
			let pageData = await pageRes.json();

			if (pageData.success === false) {
				setErrorMessage("Page could not be deleted. Please try again.");
			} else {
				setPageDeleted(true);
				setSuccessMessage("Page sucessfully deleted.");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const redirectPage = () => {
		router.push(`/admin/marketing/pages`);
	};

	return (
		<>
			<Box component="div" sx={{ mt: 1 }}>
				<Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
					<DialogTitle id="scroll-dialog-title">Delete Page</DialogTitle>
					{pageDeleted && successMessage !== "" ? (
						<DialogContent dividers={true}>{successMessage}</DialogContent>
					) : (
						<DialogContent dividers={true}>
							{errorMessage !== ""
								? errorMessage
								: `Are you sure you want to delete "${pageName}"?`}
						</DialogContent>
					)}

					{pageDeleted ? (
						<DialogActions>
							<Button onClick={() => redirectPage()}>OK</Button>
						</DialogActions>
					) : (
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button
								onClick={() => deletePage(pageId)}
								variant={"contained"}
								size="small"
							>
								Delete
							</Button>
						</DialogActions>
					)}
				</Dialog>
			</Box>
		</>
	);
};

export default PageDeletionOrganism;

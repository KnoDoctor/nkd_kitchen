import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AlertSnackbarProps {
	isSaving?: boolean;
	saveError: string | undefined | null;
	isAlertSnackbarOpen: boolean;
	setIsAlertSnackbarOpen(isAlertSnackbarOpen: boolean): void;
}

export default function AlertSnackbar({
	isSaving,
	saveError,
	isAlertSnackbarOpen,
	setIsAlertSnackbarOpen,
}: AlertSnackbarProps) {
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setIsAlertSnackbarOpen(false);
	};

	if (isSaving)
		return (
			<Snackbar
				sx={{ minWidth: "250px" }}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={isAlertSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
					Saving...
				</Alert>
			</Snackbar>
		);

	if (saveError)
		return (
			<Snackbar
				sx={{ minWidth: "250px" }}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={isAlertSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
					Something went wrong, please try again.
				</Alert>
			</Snackbar>
		);

	return (
		<Snackbar
			sx={{ minWidth: "250px" }}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={isAlertSnackbarOpen}
			autoHideDuration={1000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
				Save Successful!
			</Alert>
		</Snackbar>
	);
}

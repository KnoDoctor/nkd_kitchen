import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ActionModalProps {
	label: string;
	children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default function ActionsModal({ label, children }: ActionModalProps) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<div>
			<Button variant="contained" size="small" onClick={handleClickOpen()}>
				{label}
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				scroll={"paper"}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				{React.cloneElement(children, { handleClose: handleClose })}
			</Dialog>
		</div>
	);
}

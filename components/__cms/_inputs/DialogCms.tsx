import React from "react";

import Dialog from "@mui/material/Dialog";
import CancelIcon from "@mui/icons-material/Cancel";
import Container from "@mui/material/Container";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

interface DialogCmsProps {
	isModalOpen: boolean;
	handleModalClose(): void;
	source: string;
	children?: any;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCms = ({ isModalOpen, handleModalClose, source, children }: DialogCmsProps) => {
	return (
		<div>
			<Dialog
				fullScreen={true}
				open={isModalOpen}
				onClose={() => handleModalClose}
				TransitionComponent={Transition}
				// disableBackdropClick
			>
				<CancelIcon
					onClick={() => handleModalClose()}
					sx={{
						position: "absolute",
						top: "15px",
						right: "20px",
						zIndex: 999,
						color: "#494949",
						cursor: "pointer",
					}}
				/>
				{source ? (
					<iframe
						src={source}
						style={{ height: "100%", border: 0, filter: "none" }}
					></iframe>
				) : (
					<Container maxWidth={"md"} sx={{ pt: 5, pb: 5, height: "100vh" }}>
						{children}
					</Container>
				)}
			</Dialog>
		</div>
	);
};

export default DialogCms;

import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Link from "../components/_atoms/Link";
import { Box } from "@mui/material";

export default function Copyright() {
	return (
		<Box>
			<Typography variant="body2" color="text.secondary" align="center">
				{"Copyright © "}
				Tiny Homes LTD. {new Date().getFullYear()}
			</Typography>
			<Typography variant="body2" color="text.secondary" align="center">
				<a color="inherit" href="/admin">
					Admin
				</a>
			</Typography>
		</Box>
	);
}

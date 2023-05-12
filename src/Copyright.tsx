import Typography from "@mui/material/Typography";

import { Box } from "@mui/material";

export default function Copyright() {
	return (
		<Box>
			<Typography variant="body2" color="text.secondary" align="center">
				{"Copyright © "}
				Epoch North {new Date().getFullYear()}
			</Typography>
			<Typography variant="body2" color="text.secondary" align="center">
				<a color="inherit" href="/admin">
					Admin
				</a>
			</Typography>
		</Box>
	);
}

module.exports.buildEntityCreationOrganismFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import * as React from "react";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import use${uppercasePlural} from "../../../hooks/${lowercasePlural}/use${uppercasePlural}";

import { createLookupString } from "../../../utils/helperFunctions";

const ${uppercaseSingular}CreationOrganism = ({ handleClose }: any) => {
	const ${lowercasePlural} = use${uppercasePlural}();

	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);

			const new${uppercaseSingular}Object = {
				${lowercaseSingular}_name: formData.get("${lowercaseSingular}Name"),
			};

			const create${uppercaseSingular}Res = await fetch(\`/api/${lowercasePlural}\`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(new${uppercaseSingular}Object),
			});
			const create${uppercaseSingular}Data = await create${uppercaseSingular}Res.json();

			if (create${uppercaseSingular}Data.success) {
				${lowercasePlural}.mutate();
				handleClose();
			} else {
				console.log("ERROR: ", create${uppercaseSingular}Data);

				setIsError(true);
				if (create${uppercaseSingular}Data.message) setErrorMessage(\`\${create${uppercaseSingular}Data.message}\`);
				if (create${uppercaseSingular}Data.error) setErrorMessage(\`API Error: \${create${uppercaseSingular}Data.error}\`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<DialogTitle id="scroll-dialog-title">Add New ${uppercaseSingular}</DialogTitle>
				<DialogContent dividers={true}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="${lowercaseSingular}Name"
						label="${uppercaseSingular} Name"
						name="${lowercaseSingular}Name"
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

export default ${uppercaseSingular}CreationOrganism;`;
};

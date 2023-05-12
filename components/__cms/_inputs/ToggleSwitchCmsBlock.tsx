import React from "react";

//Import Material-UI Components
import { Grid, Switch } from "@mui/material";

interface ToggleSwitchCmsBlockProps {
	handleInputChange: any;
	value: boolean;
	leftOption: string;
	rightOption: string;
	name: string;
}

const ToggleSwitchCmsBlock = ({
	handleInputChange,
	value,
	leftOption,
	rightOption,
	name,
}: ToggleSwitchCmsBlockProps) => {
	return (
		<div>
			<h4 style={{ marginTop: 0 }}>{name}</h4>
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>{leftOption}</Grid>
				<Grid item>
					<Switch
						checked={value}
						onChange={(event) => handleInputChange(event)}
						name={name}
					/>
				</Grid>
				<Grid item>{rightOption}</Grid>
			</Grid>
		</div>
	);
};

export default ToggleSwitchCmsBlock;

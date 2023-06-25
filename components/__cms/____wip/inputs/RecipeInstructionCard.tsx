import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import Divider from "@mui/material/Divider";

import { useDebounce } from "use-debounce";

const RecipeInstructionCard = ({ instruction, i, instructions, updateInstructionData }: any) => {
	const [updatedInstruction, setUpdatedInstruction] = useState(instruction.instruction);
	const [debouncedInstructionValue] = useDebounce(updatedInstruction, 500);

	useEffect(() => {
		updateStep(instruction.id, updatedInstruction);
	}, [debouncedInstructionValue]);

	useEffect(() => {
		setUpdatedInstruction(instruction.instruction);
	}, [instruction]);

	const updateStep = (id: string, updatedValue: string) => {
		let newInstructions = [...instructions];

		const entityIndex = newInstructions.findIndex(
			(instruction: any) => instruction[`id`] === id
		);

		newInstructions[entityIndex].instruction = updatedValue;
		updateInstructionData(newInstructions);
	};

	const deleteStep = (id: any) => {
		let newInstructions = [...instructions];
		newInstructions = newInstructions.filter((instruction: any) => instruction.id !== id);
		updateInstructionData(newInstructions);
	};
	return (
		<>
			<Grid item xs={2}>
				<TextField
					sx={{ width: "100%" }}
					id="standard-controlled"
					variant="standard"
					value={`Step ${i + 1}`}
					InputProps={{ disableUnderline: true }}
				/>
			</Grid>
			<Grid item xs={9}>
				<TextField
					sx={{ width: "100%" }}
					id="outlined-controlled"
					variant="standard"
					autoComplete="off"
					placeholder={i === 0 ? "What's the first step?" : "What do we do next?"}
					value={updatedInstruction}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setUpdatedInstruction(event.target.value)
					}
					multiline
					InputProps={{ disableUnderline: true }}
				/>
			</Grid>

			<Grid item xs={1} display={"flex"} justifyContent={"center"}>
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={() => {
						deleteStep(instruction.id);
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
			<Grid xs={12} item>
				<Divider
					sx={{
						mt: 1,
						mb: 2,
					}}
				/>
			</Grid>
		</>
	);
};

export default RecipeInstructionCard;

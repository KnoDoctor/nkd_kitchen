import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

import sortArrayOfStringsAlphabetically from "../../../../utils/helperFunctions/sortArrayOfStringsAlphabetically";
import Button from "../../../_atoms/Button";
import { generateGuid } from "../../../../utils/uuids";

import { useDebounce } from "use-debounce";

const InstructionCard = ({ instruction, i, instructions, updateInstructionData }: any) => {
	const [updatedInstruction, setUpdatedInstruction] = useState(instruction.instruction);
	const [debouncedInstructionValue] = useDebounce(updatedInstruction, 500);

	useEffect(() => {
		updateStep(instruction.id, updatedInstruction);
	}, [debouncedInstructionValue]);

	const updateStep = (id: string, updatedValue: string) => {
		let newInstructions = [...instructions];

		const entityIndex = newInstructions.findIndex(
			(instruction: any) => instruction[`id`] === id
		);
		console.log(entityIndex);

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
				{/* <Typography
					sx={{
						height: "100%",
						display: "flex",
						alignContent: "center",
						flexWrap: "wrap",
					}}
				>{`Step ${i + 1}`}</Typography> */}
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

const RecipeInstructions = ({ instructions, updateInstructionData }: any) => {
	const addStep = () => {
		let newInstructions = [...instructions];
		newInstructions.push({ id: generateGuid(), instruction: "" });
		updateInstructionData(newInstructions);
	};

	if (!instructions) return <>Loading...</>;

	return (
		<Container maxWidth={"md"} style={{ paddingTop: 25 }}>
			<Card variant="outlined" sx={{ p: 4 }}>
				<Grid container>
					<Grid item xs={6}>
						<Typography
							variant="h5"
							sx={{
								mb: 2,
								color: "#194666",
								textDecoration: "underline",
							}}
						>
							{"Instructions"}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Button
							size={"small"}
							variant={"contained"}
							onClick={addStep}
							sx={{ float: "right" }}
						>
							Add Step
						</Button>
					</Grid>
				</Grid>
				<Grid container>
					{instructions.map((instruction: any, i: number) => {
						return (
							<InstructionCard
								instruction={instruction}
								i={i}
								instructions={instructions}
								updateInstructionData={updateInstructionData}
							/>
						);
					})}
				</Grid>
			</Card>
		</Container>
	);
};

export default RecipeInstructions;

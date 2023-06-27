import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { generateGuid } from "../../../../utils/uuids";

import RecipeInstructionCard from "./RecipeInstructionCard";

const RecipeInstructions = ({
	instructions,
	recipe,
	hasContentBeenEdited,
	setHasContentBeenEdited,
	setHasBlurredInput,
	isSaving,
}: any) => {
	const addStep = () => {
		let newInstructions = [...instructions];
		newInstructions.push({ id: generateGuid(), instruction: "" });

		recipe.mutate(
			{
				...recipe.data,
				data: {
					...recipe.data.data,
					instructions: newInstructions,
				},
			},
			{ revalidate: false }
		);
		setHasContentBeenEdited(true);
		setHasBlurredInput(true);
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
							disabled={isSaving}
						>
							Add Step
						</Button>
					</Grid>
				</Grid>
				<Grid container>
					{instructions.map((instruction: any, i: number) => {
						return (
							<RecipeInstructionCard
								instruction={instruction}
								i={i}
								instructions={instructions}
								recipe={recipe}
								hasContentBeenEdited={hasContentBeenEdited}
								setHasContentBeenEdited={setHasContentBeenEdited}
								setHasBlurredInput={setHasBlurredInput}
							/>
						);
					})}
				</Grid>
			</Card>
		</Container>
	);
};

export default RecipeInstructions;

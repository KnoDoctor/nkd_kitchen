import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Skeleton from "@mui/material/Skeleton";

import sortArrayOfStringsAlphabetically from "../../../utils/helperFunctions/sortArrayOfStringsAlphabetically";

//Testing
import useRecipeIngredientRelationship from "../../../hooks/recipes/useRecipeIngredientRelationship";
import { useDebounce } from "use-debounce";
interface RecipeIngredientCardProps {
	ingredient: RecipeIngredient;
	handleRelationSetupData: any;
	handleRelation: any;
}

interface Ingredient {
	ingredient_id: string;
	ingredient_name: string;
	created_at: string;
	updated_at: string;
	// substituting_ingredient: SubstitutingIngredient[];
	// substituted_ingredient: SubstitutedIngredient[];
}

// interface SubstitutedIngredient {
// 	substituting_ingredient_id: string;
// 	substituted_ingredient_id: string;
// 	substituting_quantity: number;
// 	substituted_quantity: number;
// 	substituting_unit: string;
// 	substituted_unit: string;
// 	additional_info: string | null;
// }

// interface SubstitutingIngredient {
// 	substituting_ingredient_id: string;
// 	substituted_ingredient_id: string;
// 	substituting_quantity: number;
// 	substituted_quantity: number;
// 	substituting_unit: string;
// 	substituted_unit: string;
// 	additional_info: string | null;
// }

interface RecipeIngredient {
	ingredients: Ingredient;
	quantity: number | null;
	unit: string | null;
}

const measurementUnits: string[] = [
	"Teaspoon(s)",
	"Tablespoon(s)",
	"Fluid Ounce(s)",
	"Cup(s)",
	"Pint(s)",
	"Quart(s)",
	"Gallon(s)",
	"Milliliter(s)",
	"Liter(s)",
	"Pound(s)",
	"Ounce(s)",
	"Milligram(s)",
	"Gram(s)",
	"Kilogram(s)",
	"Pinch",
	"Smidgen",
	"Dash",
	"Touch",
	"Handful",
	"Stick(s)",
	"Can(s)",
	"Bottle(s)",
	"Slice(s)",
	"Piece(s)",
	"Whole",
	"Half",
	"Dozen",
	"Clove(s)",
	"Sprig(s)",
];

const handleRecipeIngredientRelationUpdate = async (
	recipe_id: string,
	ingredient_id: string,
	relationMetaData: any,
	recipeIngredientRelationship: any,
	setIsSaving: (value: boolean) => void
) => {
	try {
		const recipeIngredientRelationRes = await fetch(
			`/api/recipes/${recipe_id}/ingredients/${ingredient_id}`,
			{
				method: "PATCH",

				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...relationMetaData }),
			}
		);

		if (!recipeIngredientRelationRes.ok) {
			throw new Error(`HTTP error! status: ${recipeIngredientRelationRes.status}`);
		}

		// const recipeIngredientRelationData = await recipeIngredientRelationRes.json();

		recipeIngredientRelationship.mutate();
		setIsSaving(false);
	} catch (error) {
		console.log(error);
	}
};

const RecipeIngredientCard = ({
	ingredient,
	handleRelationSetupData,
	handleRelation,
}: RecipeIngredientCardProps) => {
	const recipeIngredientRelationship = useRecipeIngredientRelationship(
		handleRelationSetupData.relating_id,
		handleRelationSetupData.relatable_id
	);

	console.log("CAPN HOOK: ", recipeIngredientRelationship);

	// const [quantity, setQuantity] = useState<number | null>(
	// 	recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship?.quantity
	// );
	// const [unit, setUnit] = useState<string | null>(
	// 	recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship?.unit
	// );
	// const [unitInputValue, setUnitInputValue] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [hasContentBeenUpdated, setHasContentBeenUpdated] = useState(false);

	const [debouncedHasContentBeenUpdated] = useDebounce(hasContentBeenUpdated, 750);

	useEffect(() => {
		console.log("boop");
		if (hasContentBeenUpdated) {
			setIsSaving(true);
			handleRecipeIngredientRelationUpdate(
				handleRelationSetupData.relating_id,
				handleRelationSetupData.relatable_id,
				{
					quantity:
						recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship
							?.quantity,
					unit: recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship
						?.unit,
				},
				recipeIngredientRelationship,
				setIsSaving
			);
		}
		setHasContentBeenUpdated(false);
	}, [debouncedHasContentBeenUpdated]);

	if (ingredient.ingredients.ingredient_name === "ZZLoading..." || isDeleting)
		return (
			<Grid container spacing={1} mb={"4px"}>
				<Grid item xs={5}>
					<Skeleton height={45} />
				</Grid>
				<Grid item xs={2}>
					<Skeleton height={45} />
				</Grid>
				<Grid item xs={3}>
					<Skeleton height={45} />
				</Grid>
				<Grid item xs={1}>
					<Skeleton height={45} />
				</Grid>
				<Grid item xs={1}>
					<Skeleton height={45} />
				</Grid>
			</Grid>
		);

	return (
		<Grid container>
			<Grid item xs={5}>
				<TextField
					sx={{ width: "100%" }}
					id="standard-controlled"
					variant="standard"
					value={ingredient?.ingredients.ingredient_name}
				/>
			</Grid>
			<Grid item xs={2}>
				<TextField
					sx={{ width: "100%" }}
					type="number"
					id="outlined-controlled"
					variant="standard"
					placeholder="Quantity"
					value={
						recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship
							?.quantity
					}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						recipeIngredientRelationship.mutate(
							{
								...recipeIngredientRelationship.data,
								data: {
									...recipeIngredientRelationship.data.data,
									recipeIngredientRelationship: {
										...recipeIngredientRelationship.data.data
											.recipeIngredientRelationship,
										quantity: parseFloat(event.target.value),
									},
								},
							},
							{ revalidate: false }
						);
						setHasContentBeenUpdated(true);
					}}
				/>
			</Grid>
			<Grid item xs={3}>
				<Autocomplete
					freeSolo
					value={
						recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship
							?.unit || ""
					}
					onChange={(event: any, newValue: string | null) => {
						recipeIngredientRelationship.mutate(
							{
								...recipeIngredientRelationship.data,
								data: {
									...recipeIngredientRelationship.data.data,
									recipeIngredientRelationship: {
										...recipeIngredientRelationship.data.data
											.recipeIngredientRelationship,
										unit: newValue,
									},
								},
							},
							{ revalidate: false }
						);
						setHasContentBeenUpdated(true);
					}}
					inputValue={
						recipeIngredientRelationship?.data?.data?.recipeIngredientRelationship
							?.unit || ""
					}
					onInputChange={(event, newInputValue) => {
						recipeIngredientRelationship.mutate(
							{
								...recipeIngredientRelationship.data,
								data: {
									...recipeIngredientRelationship.data.data,
									recipeIngredientRelationship: {
										...recipeIngredientRelationship.data.data
											.recipeIngredientRelationship,
										unit: newInputValue,
									},
								},
							},
							{ revalidate: false }
						);
						setHasContentBeenUpdated(true);
					}}
					id="controllable-states-demo"
					options={sortArrayOfStringsAlphabetically(measurementUnits)}
					sx={{ width: "100%" }}
					renderInput={(params) => (
						<TextField {...params} variant="standard" placeholder="Unit" />
					)}
				/>
			</Grid>
			<Grid item xs={1} display={"flex"} justifyContent={"center"}>
				{isSaving ? (
					<IconButton edge="end" aria-label="save" onClick={() => {}}>
						<SyncIcon />
					</IconButton>
				) : (
					<IconButton
						edge="end"
						aria-label="save"
						onClick={() => {
							// setIsSaving(true);
							// handleRecipeIngredientRelationUpdate(
							// 	handleRelationSetupData.relating_id,
							// 	handleRelationSetupData.relatable_id,
							// 	{
							// 		quantity:
							// 			recipeIngredientRelationship?.data?.data
							// 				?.recipeIngredientRelationship?.quantity,
							// 		unit: recipeIngredientRelationship?.data?.data
							// 			?.recipeIngredientRelationship?.unit,
							// 	},
							// 	recipeIngredientRelationship,
							// 	setIsSaving
							// );
							// handleRelation({
							// 	...handleRelationSetupData,
							// 	action: "PATCH",
							// 	relationMetaData: {
							// 		quantity:
							// 			recipeIngredientRelationship?.data?.data
							// 				?.recipeIngredientRelationship?.quantity,
							// 		unit: recipeIngredientRelationship?.data?.data
							// 			?.recipeIngredientRelationship?.unit,
							// 	},
							// });
						}}
					>
						<DoneAllIcon />
					</IconButton>
				)}
			</Grid>
			<Grid item xs={1} display={"flex"} justifyContent={"center"}>
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={() => {
						setIsDeleting(true);
						handleRelation({
							...handleRelationSetupData,
							action: "DELETE",
						});
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default RecipeIngredientCard;

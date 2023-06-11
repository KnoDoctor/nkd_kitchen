import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import sortArrayOfStringsAlphabetically from "../../../utils/helperFunctions/sortArrayOfStringsAlphabetically";

interface RecipeIngredientCardProps {
	ingredient: RecipeIngredient;
	handleDelete: any;
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
];

const RecipeIngredientCard = ({ ingredient, handleDelete }: RecipeIngredientCardProps) => {
	const [quantity, setQuantity] = useState<number | null>(null);
	const [unit, setUnit] = useState<string | null>(null);
	const [unitInputValue, setUnitInputValue] = useState("");

	return (
		<Grid container>
			<Grid xs={6}>
				<TextField
					sx={{ width: "100%" }}
					id="standard-controlled"
					variant="standard"
					value={ingredient?.ingredients.ingredient_name}
				/>
			</Grid>
			<Grid xs={2}>
				<TextField
					sx={{ width: "100%" }}
					type="number"
					id="outlined-controlled"
					variant="standard"
					placeholder="Quantity"
					value={quantity}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setQuantity(parseInt(event.target.value));
					}}
				/>
			</Grid>
			<Grid xs={2}>
				<Autocomplete
					freeSolo
					value={unit}
					onChange={(event: any, newValue: string | null) => {
						setUnit(newValue);
					}}
					inputValue={unitInputValue}
					onInputChange={(event, newInputValue) => {
						setUnitInputValue(newInputValue);
					}}
					id="controllable-states-demo"
					options={sortArrayOfStringsAlphabetically(measurementUnits)}
					sx={{ width: "100%" }}
					renderInput={(params) => (
						<TextField {...params} variant="standard" placeholder="Unit" />
					)}
				/>
			</Grid>
			<Grid xs={2} display={"flex"} justifyContent={"center"}>
				<IconButton edge="start" aria-label="delete" onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default RecipeIngredientCard;

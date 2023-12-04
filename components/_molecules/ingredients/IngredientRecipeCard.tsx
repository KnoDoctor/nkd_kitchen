import { Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import getIsoMeasurementShort from "../../../utils/helperFunctions/getIsoMeasurementShort";
import decimalToFraction from "../../../utils/helperFunctions/decimalToFraction";

interface IngredientRecipeCardProps {
	ingredient: any;
}

const IngredientRecipeCard = ({ ingredient }: IngredientRecipeCardProps) => {
	console.log(ingredient);

	return (
		<Grid item xs={12}>
			<Grid container spacing={4}>
				<Grid item xs={1}></Grid>
				<Grid item xs={2}>
					<Typography variant="body1" textAlign={"left"}>
						{decimalToFraction(parseFloat(ingredient.quantity))}{" "}
						{getIsoMeasurementShort(ingredient.unit)}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body1" textAlign={"left"}>
						{ingredient.ingredients.ingredient_name}
						<span style={{ fontStyle: "italic" }}>
							{`${
								ingredient.preparation_method
									? `, ${ingredient.preparation_method.toLowerCase()}`
									: ``
							}`}
						</span>
					</Typography>
				</Grid>
			</Grid>
			<Divider sx={{ mt: 2 }} />
		</Grid>
	);
};

export default IngredientRecipeCard;

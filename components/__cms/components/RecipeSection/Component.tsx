//React & Material-UI Imports
import React from "react";

import useRecipes from "../../../../hooks/recipes/useRecipes";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Element, isText } from "domhandler";

import { Container, Box, Grid, Typography } from "@mui/material";

import parse, { attributesToProps } from "html-react-parser";

import RecipeCard from "../../../_molecules/__cards/RecipeCard";

//Import Scrollable Anchor
// import ScrollableAnchor from 'react-scrollable-anchor';

interface RecipeSectionProps {
	section: any;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

interface SimplifiedRecipe {
	recipe_id: string;
	recipe_name: string;
}

interface FullRecipe {
	recipe_id: string;
	recipe_name: string;
	created_at: string;
	recipe_image: string;
	updated_at: string;
}

function getFullRecipes(
	simplifiedRecipes: SimplifiedRecipe[],
	fullRecipes: FullRecipe[]
): FullRecipe[] {
	if (simplifiedRecipes.length === 0 || fullRecipes.length === 0) {
		return []; // Return an empty array if either input array is empty
	}

	const recipeIds = simplifiedRecipes.map((recipe) => recipe.recipe_id);

	return fullRecipes.filter((recipe) => recipeIds.includes(recipe.recipe_id));
}

const RecipeSection = ({
	section,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: RecipeSectionProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	const recipes = useRecipes();
	console.log(recipes);

	if (recipes.isLoading) {
		return <div>Loading...</div>;
	}
	console.log(getFullRecipes(section.featuredRecipes, recipes.data.data));

	return section ? (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : 'section'}>
		<Box
			sx={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
				my: 4,
			}}
		>
			<Box
				sx={{
					margin: "auto",
				}}
			>
				<Typography
					variant="h5"
					sx={{
						color: colorSettings === "Custom" ? sectionFontColor : "#494949",
						textAlign: "center",
					}}
				>
					{section.sectionHeadline}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						color: colorSettings === "Custom" ? sectionFontColor : "#494949",

						textAlign: "center",
					}}
				>
					{section.sectionContent &&
					section.sectionContent != "<p><br></p>" &&
					typeof section.sectionContent === "string" ? (
						parse(section.sectionContent, {
							trim: true,
							replace: (domNode) => {
								if (
									domNode instanceof Element &&
									domNode.attribs &&
									domNode.name === "a"
								) {
									const props = attributesToProps(domNode.attribs);
									const { target, ...remainingProps } = props;
									return (
										<a {...remainingProps}>
											{isText(domNode.children[0]) ? (
												domNode.children[0].data
											) : (
												<></>
											)}
										</a>
									);
								}
							},
						})
					) : (
						<></>
					)}
				</Typography>
			</Box>
			<Container maxWidth="lg" sx={{ my: 4 }}>
				<Grid container spacing={2} my={4}>
					{getFullRecipes(section.featuredRecipes, recipes.data.data).map(
						(recipe: any) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								display={"flex"}
								justifyContent={"center"}
							>
								<RecipeCard
									recipeName={recipe.recipe_name}
									imageUrl={recipe.recipe_image}
									recipeId={recipe.recipe_id}
								/>
							</Grid>
						)
					)}
				</Grid>
			</Container>
		</Box>
	) : (
		<></>
	);
};

export default RecipeSection;

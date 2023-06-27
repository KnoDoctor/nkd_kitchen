import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import RenderCms from "../../__cms/RenderCms";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import RecipeDeletionOrganism from "./RecipeDeletionOrganism";

import UploadButton from "../../_atoms/UploadButton";
import AlertSnackbar from "../../_atoms/AlertSnackbar";
import RecipeIngredientCard from "../../_molecules/__cards/RecipeIngredientCard";
import ActionsModal from "../../_atoms/ActionsModal";
import IngredientCreationOrganism from "../ingredients/IngredientCreationOrganism";

import useRecipe from "../../../hooks/recipes/useRecipe";
import useIngredients from "../../../hooks/ingredients/useIngredients";
import useCategories from "../../../hooks/categories/useCategories";

import { returnCurrentModule } from "../../../utils/helperFunctions";
import Relator from "../../__cms/____wip/inputs/Relator";
import RecipeInstructions from "../../__cms/____wip/inputs/RecipeInstructions";

interface handleSaveRecipeInputs {
	updatedRecipe: any;
	recipe: any;
	setHasContentBeenEdited(value: boolean): void;
	setIsRecipeSaving(value: boolean): void;
	setRecipeSaveError(value: string | undefined | null): void;
}

const handleSaveRecipe = async ({
	updatedRecipe,
	recipe,
	setHasContentBeenEdited,
	setIsRecipeSaving,
	setRecipeSaveError,
}: handleSaveRecipeInputs) => {
	setIsRecipeSaving(true);
	try {
		console.log(recipe);

		const recipeId = recipe?.data?.data?.recipe_id;

		const updateRecipeRes = await fetch(`/api/recipes/${recipeId}`, {
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedRecipe),
		});

		const updateRecipeData = await updateRecipeRes.json();

		if (updateRecipeData.success) {
			recipe.mutate();
			setRecipeSaveError(null);
			setHasContentBeenEdited(false);
			setIsRecipeSaving(false);
		} else {
			setRecipeSaveError(`${updateRecipeData.error.name}: ${updateRecipeData.error.message}`);
			setIsRecipeSaving(false);
			console.log("ERROR: ", updateRecipeData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setRecipeSaveError(`${error.name}: ${error.message}`);
		setIsRecipeSaving(false);
	}
};

const RecipeOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const recipe = useRecipe(id);

	const [updatedRecipeCmsData, setUpdatedRecipeCmsData] = useState<[] | null>([]);

	const [isRecipeSaving, setIsRecipeSaving] = useState(false);
	const [recipeSaveError, setRecipeSaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [hasBlurredInput, setHasBlurredInput] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleCmsDataChange = (updatedCmsData: any) => {
		setUpdatedRecipeCmsData(updatedCmsData.cms_data);
		setHasContentBeenEdited(true);
	};

	useEffect(() => {
		if (hasContentBeenEdited) {
			handleSaveRecipe({
				updatedRecipe: {
					recipe_name: recipe?.data?.data?.recipe_name,
					recipe_image: recipe?.data?.data?.recipe_image,
					recipe_description: recipe?.data?.data?.recipe_description,
					instructions: recipe?.data?.data?.instructions,
				},
				recipe,
				setHasContentBeenEdited,
				setIsRecipeSaving,
				setRecipeSaveError,
			});
			setIsAlertSnackbarOpen(true);
			setHasContentBeenEdited(false);
		}
		setHasBlurredInput(false);
	}, [hasBlurredInput]);

	if (recipe.isLoading || !isReady) {
		return <div>Loading</div>;
	}

	if (recipe.error) {
		return (
			<div>
				<h4>{recipe.error.message}</h4>
			</div>
		);
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: returnCurrentModule(router),
						anchor: `/admin/${returnCurrentModule(router)}`,
					},

					{
						label: "Recipes",
						anchor: `/admin/${returnCurrentModule(router)}/recipes`,
					},
					{
						label: recipe?.data?.data?.recipe_name,
						anchor: null,
					},
				]}
			/>
			<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						<Relator
							title="Ingredients"
							relatingEntityName="recipes"
							relatingEntityFieldPrefix="recipe"
							relatableEntityName="ingredients"
							relatableEntityFieldPrefix="ingredient"
							relationName="recipes_ingredients"
							relatingEntityId={id}
							useRelatingEntityHook={useRecipe}
							useRelatableEntityHook={useIngredients}
							CustomRelationComponent={RecipeIngredientCard}
							RelatableEntityCreationComponent={
								<ActionsModal label="Add A New Ingredient">
									<IngredientCreationOrganism />
								</ActionsModal>
							}
						/>
						<RecipeInstructions
							instructions={recipe?.data?.data?.instructions}
							recipe={recipe}
							setHasContentBeenEdited={setHasContentBeenEdited}
							setHasBlurredInput={setHasBlurredInput}
							isSaving={isRecipeSaving}
						/>
						{/* <RenderCms cmsData={recipe} updateCmsData={handleCmsDataChange} /> */}
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							alignSelf: "flex-start",
							position: "sticky",
							top: 80,
							borderRadius: 2,
							border: "1px solid #e0e0e0",
							padding: "30px 40px",
							marginTop: "50px",
							maxHeight: "calc(100vh - 90px)",
							overflowY: "scroll",
						}}
					>
						<Grid container>
							<Grid item xs={12}>
								<Box
									sx={{
										position: "relative",
										width: "100%",
										height: "250px",
										mb: 3,
									}}
								>
									<Image
										src={
											recipe?.data?.data?.recipe_image ||
											"https://images.unsplash.com/photo-1596887245124-5150ad2491e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
										}
										fill={true}
										alt="test"
										style={{ objectFit: "cover", borderRadius: "25px" }}
									/>
								</Box>
								<TextField
									sx={{ width: "100%", mb: 2 }}
									multiline
									id="outlined-name"
									label="SEO Image"
									value={recipe?.data?.data?.recipe_image}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										recipe.mutate(
											{
												...recipe.data,
												data: {
													...recipe.data.data,
													recipe_image: event.target.value,
												},
											},
											{ revalidate: false }
										);
										setHasContentBeenEdited(true);
									}}
									onBlur={() => {
										setHasBlurredInput(true);
									}}
									variant="standard"
								/>
							</Grid>
							<Grid item xs={6}>
								<UploadButton
									setUpdatedHeroImage={(url: string) => {
										recipe.mutate(
											{
												...recipe.data,
												data: {
													...recipe.data.data,
													recipe_image: url,
												},
											},
											{ revalidate: false }
										);
										setHasContentBeenEdited(true);
										setHasBlurredInput(true);
									}}
									setHasContentBeenEdited={setHasContentBeenEdited}
								/>
							</Grid>
							<Relator
								title="Categories"
								relatingEntityName="recipes"
								relatingEntityId={id}
								relatingEntityFieldPrefix="recipe"
								useRelatingEntityHook={useRecipe}
								relatableEntityName="categories"
								relatableEntityFieldPrefix="category"
								relationName="recipes_categories"
								useRelatableEntityHook={useCategories}
								isSidebar
							/>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Recipe Name"
								value={recipe?.data?.data?.recipe_name}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									recipe.mutate(
										{
											...recipe.data,
											data: {
												...recipe.data.data,
												recipe_name: event.target.value,
											},
										},
										{ revalidate: false }
									);
									setHasContentBeenEdited(true);
								}}
								onBlur={() => {
									setHasBlurredInput(true);
								}}
								variant="standard"
							/>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-description"
								label="Recipe Description"
								value={recipe?.data?.data?.recipe_description}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									recipe.mutate(
										{
											...recipe.data,
											data: {
												...recipe.data.data,
												recipe_description: event.target.value,
											},
										},
										{ revalidate: false }
									);
									setHasContentBeenEdited(true);
								}}
								onBlur={() => {
									setHasBlurredInput(true);
								}}
								variant="standard"
							/>

							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSaveRecipe({
											updatedRecipe: {
												recipe_name: recipe?.data?.data?.recipe_name,
												recipe_image: recipe?.data?.data?.recipe_image,
												recipe_description:
													recipe?.data?.data?.recipe_description,
												instructions: recipe?.data?.data?.instructions,
											},
											recipe,
											setHasContentBeenEdited,
											setIsRecipeSaving,
											setRecipeSaveError,
										});
										setIsAlertSnackbarOpen(true);
									}}
								>
									{!hasContentBeenEdited ? "Up to Date" : "Content has Changed"}
								</Button>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%", ml: { xs: 0, lg: 2 } }}
									onClick={() => setIsDeleteDialogOpen(true)}
								>
									Delete
								</Button>
							</Grid>

							<AlertSnackbar
								isSaving={isRecipeSaving}
								saveError={recipeSaveError}
								isAlertSnackbarOpen={isAlertSnackbarOpen}
								setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Card>
			<RecipeDeletionOrganism
				recipeId={id}
				recipeName={recipe?.data?.data?.recipe_name}
				open={isDeleteDialogOpen}
				handleClose={() => setIsDeleteDialogOpen(false)}
			/>
		</>
	);
};

export default RecipeOrganism;

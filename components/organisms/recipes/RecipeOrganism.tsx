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
import { useDebounce } from "use-debounce";

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
		const recipeId = recipe.data.data.recipe_id;

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
			setIsRecipeSaving(false);
			setRecipeSaveError(null);
			setHasContentBeenEdited(false);
		} else {
			setIsRecipeSaving(false);
			setRecipeSaveError(`${updateRecipeData.error.name}: ${updateRecipeData.error.message}`);
			console.log("ERROR: ", updateRecipeData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setIsRecipeSaving(false);
		setRecipeSaveError(`${error.name}: ${error.message}`);
	}
};

const RecipeOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const recipe = useRecipe(id);

	const [updatedRecipeName, setUpdatedRecipeName] = useState<string | null>(null);
	const [updatedRecipeImage, setUpdatedRecipeImage] = useState<string | null>(null);
	const [updatedRecipeDescription, setUpdatedRecipeDescription] = useState<string | null>(null);
	const [updatedRecipeInstructionsData, setUpdatedRecipeInstructionsData] = useState<[] | null>(
		null
	);
	const [updatedRecipeCmsData, setUpdatedRecipeCmsData] = useState<[] | null>([]);

	const [isRecipeSaving, setIsRecipeSaving] = useState(false);
	const [recipeSaveError, setRecipeSaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [updatedRecipe, setUpdatedRecipe] = useState<{
		recipe_name: string | null;
		recipe_image: string | null;
		recipe_description: string | null;
		instructions: [] | null;
		cms_data: [] | null;
	} | null>(null);

	const [debouncedHasContentBeenEdited] = useDebounce(hasContentBeenEdited, 1000);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecipeName(event.target.value);
		setHasContentBeenEdited(true);
	};
	const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecipeDescription(event.target.value);
		setHasContentBeenEdited(true);
	};
	const handleInstructionsChange = (updatedInstructionsData: any) => {
		setUpdatedRecipeInstructionsData(updatedInstructionsData);
		setHasContentBeenEdited(true);
	};
	const handleCmsDataChange = (updatedCmsData: any) => {
		setUpdatedRecipeCmsData(updatedCmsData.cms_data);
		setHasContentBeenEdited(true);
	};

	useEffect(() => {
		setUpdatedRecipeName(recipe?.data?.data?.recipe_name);
		setUpdatedRecipeImage(recipe?.data?.data?.recipe_image);
		setUpdatedRecipeDescription(recipe?.data?.data?.recipe_description);
		setUpdatedRecipeInstructionsData(recipe?.data?.data?.instructions);

		// setUpdatedRecipeCmsData(recipe?.data?.data?.cms_data);
	}, [recipe.data]);

	useEffect(() => {
		setUpdatedRecipe({
			recipe_name: updatedRecipeName,
			recipe_image: updatedRecipeImage,
			recipe_description: updatedRecipeDescription,
			instructions: updatedRecipeInstructionsData,
			cms_data: updatedRecipeCmsData,
		});
	}, [
		updatedRecipeName,
		updatedRecipeImage,
		updatedRecipeDescription,
		updatedRecipeInstructionsData,
		updatedRecipeCmsData,
	]);

	useEffect(() => {
		if (hasContentBeenEdited) {
			handleSaveRecipe({
				updatedRecipe,
				recipe,
				setHasContentBeenEdited,
				setIsRecipeSaving,
				setRecipeSaveError,
			});
			setIsAlertSnackbarOpen(true);
		}
		setHasContentBeenEdited(false);
	}, [debouncedHasContentBeenEdited]);

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
							instructions={updatedRecipeInstructionsData}
							updateInstructionData={handleInstructionsChange}
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
											updatedRecipeImage ||
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
									value={updatedRecipeImage}
									onChange={(e) => {
										setUpdatedRecipeImage(e.target.value);
										setHasContentBeenEdited(true);
									}}
									variant="standard"
								/>
							</Grid>
							<Grid item xs={6}>
								<UploadButton
									setUpdatedHeroImage={setUpdatedRecipeImage}
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
								value={updatedRecipeName}
								onChange={handleNameChange}
								variant="standard"
							/>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-description"
								label="Recipe Description"
								value={updatedRecipeDescription}
								onChange={handleDescriptionChange}
								variant="standard"
							/>

							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSaveRecipe({
											updatedRecipe,
											recipe,
											setHasContentBeenEdited,
											setIsRecipeSaving,
											setRecipeSaveError,
										});
										setIsAlertSnackbarOpen(true);
									}}
								>
									{!hasContentBeenEdited ? "Up to Date" : "Save"}
								</Button>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%", ml: 2 }}
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
				recipeName={updatedRecipeName}
				open={isDeleteDialogOpen}
				handleClose={() => setIsDeleteDialogOpen(false)}
			/>
		</>
	);
};

export default RecipeOrganism;

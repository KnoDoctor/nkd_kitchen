import { useState, useEffect } from "react";

	import { useRouter } from "next/router";
	
	import Grid from "@mui/material/Grid";
	import Card from "@mui/material/Card";
	import TextField from "@mui/material/TextField";
	import Button from "@mui/material/Button";
	
	import RenderCms from "../../__cms/RenderCms";
	
	import Breadcrumbs from "../../_molecules/Breadcrumbs";
	
	import RecipeDeletionOrganism from "./RecipeDeletionOrganism";
	
	import AlertSnackbar from "../../_atoms/AlertSnackbar";
	
	import useRecipe from "../../../hooks/recipes/useRecipe";
	
	import { returnCurrentModule } from "../../../utils/helperFunctions";
	
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
		// const [updatedRecipeCmsData, setUpdatedRecipeCmsData] = useState<[] | null>(null);
	
		const [isRecipeSaving, setIsRecipeSaving] = useState(false);
		const [recipeSaveError, setRecipeSaveError] = useState<string | undefined | null>(null);
		const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
		const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	
		const [updatedRecipe, setUpdatedRecipe] = useState<{
			recipe_name: string | null;
			// cms_data: [] | null;
		} | null>(null);
	
		const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setUpdatedRecipeName(event.target.value);
			setHasContentBeenEdited(true);
		};
		// const handleCmsDataChange = (updatedCmsData: any) => {
		// 	setUpdatedRecipeCmsData(updatedCmsData.cms_data);
		// 	setHasContentBeenEdited(true);
		// };
	
		useEffect(() => {
			setUpdatedRecipeName(recipe?.data?.data?.recipe_name);
			// setUpdatedRecipeCmsData(recipe?.data?.data?.cms_data);
		}, [recipe.data]);
	
		useEffect(() => {
			setUpdatedRecipe({
				recipe_name: updatedRecipeName,
				// cms_data: updatedRecipeCmsData,
			});
		}, [
			updatedRecipeName,
			// updatedRecipeCmsData,
		]);
	
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
								<TextField
									sx={{ width: "100%", mb: 2 }}
									multiline
									id="outlined-name"
									label="Recipe Name"
									value={updatedRecipeName}
									onChange={handleNameChange}
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
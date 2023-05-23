import { useState, useEffect } from "react";

	import { useRouter } from "next/router";
	
	import Grid from "@mui/material/Grid";
	import Card from "@mui/material/Card";
	import TextField from "@mui/material/TextField";
	import Button from "@mui/material/Button";
	
	import RenderCms from "../../__cms/RenderCms";
	
	import Breadcrumbs from "../../_molecules/Breadcrumbs";
	
	import IngredientDeletionOrganism from "./IngredientDeletionOrganism";
	
	import AlertSnackbar from "../../_atoms/AlertSnackbar";
	
	import useIngredient from "../../../hooks/ingredients/useIngredient";
	
	import { returnCurrentModule } from "../../../utils/helperFunctions";
	
	interface handleSaveIngredientInputs {
		updatedIngredient: any;
		ingredient: any;
		setHasContentBeenEdited(value: boolean): void;
		setIsIngredientSaving(value: boolean): void;
		setIngredientSaveError(value: string | undefined | null): void;
	}
	
	const handleSaveIngredient = async ({
		updatedIngredient,
		ingredient,
		setHasContentBeenEdited,
		setIsIngredientSaving,
		setIngredientSaveError,
	}: handleSaveIngredientInputs) => {
		setIsIngredientSaving(true);
		try {
			const ingredientId = ingredient.data.data.ingredient_id;
	
			const updateIngredientRes = await fetch(`/api/ingredients/${ingredientId}`, {
				method: "PATCH",
	
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedIngredient),
			});
	
			const updateIngredientData = await updateIngredientRes.json();
	
			if (updateIngredientData.success) {
				ingredient.mutate();
				setIsIngredientSaving(false);
				setIngredientSaveError(null);
				setHasContentBeenEdited(false);
			} else {
				setIsIngredientSaving(false);
				setIngredientSaveError(`${updateIngredientData.error.name}: ${updateIngredientData.error.message}`);
				console.log("ERROR: ", updateIngredientData);
			}
		} catch (error: any) {
			console.log(`${error.name}: ${error.message}`);
			setIsIngredientSaving(false);
			setIngredientSaveError(`${error.name}: ${error.message}`);
		}
	};
	
	const IngredientOrganism = () => {
		const router = useRouter();
		let isReady = router.isReady;
		let id = router.query.identifier;
	
		const ingredient = useIngredient(id);
	
		const [updatedIngredientName, setUpdatedIngredientName] = useState<string | null>(null);
		// const [updatedIngredientCmsData, setUpdatedIngredientCmsData] = useState<[] | null>(null);
	
		const [isIngredientSaving, setIsIngredientSaving] = useState(false);
		const [ingredientSaveError, setIngredientSaveError] = useState<string | undefined | null>(null);
		const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
		const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	
		const [updatedIngredient, setUpdatedIngredient] = useState<{
			ingredient_name: string | null;
			// cms_data: [] | null;
		} | null>(null);
	
		const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setUpdatedIngredientName(event.target.value);
			setHasContentBeenEdited(true);
		};
		// const handleCmsDataChange = (updatedCmsData: any) => {
		// 	setUpdatedIngredientCmsData(updatedCmsData.cms_data);
		// 	setHasContentBeenEdited(true);
		// };
	
		useEffect(() => {
			setUpdatedIngredientName(ingredient?.data?.data?.ingredient_name);
			// setUpdatedIngredientCmsData(ingredient?.data?.data?.cms_data);
		}, [ingredient.data]);
	
		useEffect(() => {
			setUpdatedIngredient({
				ingredient_name: updatedIngredientName,
				// cms_data: updatedIngredientCmsData,
			});
		}, [
			updatedIngredientName,
			// updatedIngredientCmsData,
		]);
	
		if (ingredient.isLoading || !isReady) {
			return <div>Loading</div>;
		}
	
		if (ingredient.error) {
			return (
				<div>
					<h4>{ingredient.error.message}</h4>
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
							label: "Ingredients",
							anchor: `/admin/${returnCurrentModule(router)}/ingredients`,
						},
						{
							label: ingredient?.data?.data?.ingredient_name,
							anchor: null,
						},
					]}
				/>
				<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							{/* <RenderCms cmsData={ingredient} updateCmsData={handleCmsDataChange} /> */}
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
									label="Ingredient Name"
									value={updatedIngredientName}
									onChange={handleNameChange}
									variant="standard"
								/>
	
								<Grid item xs={12} lg={6}>
									<Button
										variant="contained"
										sx={{ width: "100%" }}
										disabled={!hasContentBeenEdited}
										onClick={() => {
											handleSaveIngredient({
												updatedIngredient,
												ingredient,
												setHasContentBeenEdited,
												setIsIngredientSaving,
												setIngredientSaveError,
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
									isSaving={isIngredientSaving}
									saveError={ingredientSaveError}
									isAlertSnackbarOpen={isAlertSnackbarOpen}
									setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<IngredientDeletionOrganism
					ingredientId={id}
					ingredientName={updatedIngredientName}
					open={isDeleteDialogOpen}
					handleClose={() => setIsDeleteDialogOpen(false)}
				/>
			</>
		);
	};
	
	export default IngredientOrganism;
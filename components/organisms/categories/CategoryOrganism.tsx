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

import CategoryDeletionOrganism from "./CategoryDeletionOrganism";

import UploadButton from "../../_atoms/UploadButton";
import AlertSnackbar from "../../_atoms/AlertSnackbar";

import useCategory from "../../../hooks/categories/useCategory";

import { returnCurrentModule } from "../../../utils/helperFunctions";

interface handleSaveCategoryInputs {
	updatedCategory: any;
	category: any;
	setHasContentBeenEdited(value: boolean): void;
	setIsCategorySaving(value: boolean): void;
	setCategorySaveError(value: string | undefined | null): void;
}

const handleSaveCategory = async ({
	updatedCategory,
	category,
	setHasContentBeenEdited,
	setIsCategorySaving,
	setCategorySaveError,
}: handleSaveCategoryInputs) => {
	setIsCategorySaving(true);
	try {
		const categoryId = category.data.data.category_id;

		const updateCategoryRes = await fetch(`/api/categories/${categoryId}`, {
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedCategory),
		});

		const updateCategoryData = await updateCategoryRes.json();

		if (updateCategoryData.success) {
			category.mutate();
			setIsCategorySaving(false);
			setCategorySaveError(null);
			setHasContentBeenEdited(false);
		} else {
			setIsCategorySaving(false);
			setCategorySaveError(
				`${updateCategoryData.error.name}: ${updateCategoryData.error.message}`
			);
			console.log("ERROR: ", updateCategoryData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setIsCategorySaving(false);
		setCategorySaveError(`${error.name}: ${error.message}`);
	}
};

const CategoryOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const category = useCategory(id);

	const [updatedCategoryName, setUpdatedCategoryName] = useState<string | null>(null);
	const [updatedCategoryImage, setUpdatedCategoryImage] = useState<string | null>(null);
	// const [updatedCategoryCmsData, setUpdatedCategoryCmsData] = useState<[] | null>(null);

	const [isCategorySaving, setIsCategorySaving] = useState(false);
	const [categorySaveError, setCategorySaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [updatedCategory, setUpdatedCategory] = useState<{
		category_name: string | null;
		category_image: string | null;
		// cms_data: [] | null;
	} | null>(null);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedCategoryName(event.target.value);
		setHasContentBeenEdited(true);
	};
	// const handleCmsDataChange = (updatedCmsData: any) => {
	// 	setUpdatedCategoryCmsData(updatedCmsData.cms_data);
	// 	setHasContentBeenEdited(true);
	// };

	useEffect(() => {
		setUpdatedCategoryName(category?.data?.data?.category_name);
		setUpdatedCategoryImage(category?.data?.data?.category_image);
		// setUpdatedCategoryCmsData(category?.data?.data?.cms_data);
	}, [category.data]);

	useEffect(() => {
		setUpdatedCategory({
			category_name: updatedCategoryName,
			category_image: updatedCategoryImage,
			// cms_data: updatedCategoryCmsData,
		});
	}, [
		updatedCategoryName,
		updatedCategoryImage,
		// updatedCategoryCmsData,
	]);

	if (category.isLoading || !isReady) {
		return <div>Loading</div>;
	}

	if (category.error) {
		return (
			<div>
				<h4>{category.error.message}</h4>
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
						label: "Categories",
						anchor: `/admin/${returnCurrentModule(router)}/categories`,
					},
					{
						label: category?.data?.data?.category_name,
						anchor: null,
					},
				]}
			/>
			<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						{/* <RenderCms cmsData={category} updateCmsData={handleCmsDataChange} /> */}
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
											updatedCategoryImage ||
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
									value={updatedCategoryImage}
									onChange={(e) => {
										setUpdatedCategoryImage(e.target.value);
										setHasContentBeenEdited(true);
									}}
									variant="standard"
								/>
							</Grid>
							<Grid item xs={6}>
								<UploadButton
									setUpdatedHeroImage={setUpdatedCategoryImage}
									setHasContentBeenEdited={setHasContentBeenEdited}
								/>
							</Grid>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Category Name"
								value={updatedCategoryName}
								onChange={handleNameChange}
								variant="standard"
							/>

							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSaveCategory({
											updatedCategory,
											category,
											setHasContentBeenEdited,
											setIsCategorySaving,
											setCategorySaveError,
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
								isSaving={isCategorySaving}
								saveError={categorySaveError}
								isAlertSnackbarOpen={isAlertSnackbarOpen}
								setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Card>
			<CategoryDeletionOrganism
				categoryId={id}
				categoryName={updatedCategoryName}
				open={isDeleteDialogOpen}
				handleClose={() => setIsDeleteDialogOpen(false)}
			/>
		</>
	);
};

export default CategoryOrganism;

import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import RenderCms from "../../__cms/RenderCms";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import UploadButton from "../../_atoms/UploadButton";
import AlertSnackbar from "../../_atoms/AlertSnackbar";

import usePage from "../../../hooks/pages/usePage";

import { returnCurrentModule } from "../../../utils/helperFunctions";

interface handleSavePageInputs {
	updatedPage: any;
	page: any;
	setHasContentBeenEdited(value: boolean): void;
	setIsPageSaving(value: boolean): void;
	setPageSaveError(value: string | undefined | null): void;
}

const handleSavePage = async ({
	updatedPage,
	page,
	setHasContentBeenEdited,
	setIsPageSaving,
	setPageSaveError,
}: handleSavePageInputs) => {
	setIsPageSaving(true);
	try {
		const pageId = page.data.data.page_id;

		const updatePageRes = await fetch(`/api/pages/${pageId}`, {
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedPage),
		});

		const updatePageData = await updatePageRes.json();

		if (updatePageData.success) {
			page.mutate();
			setIsPageSaving(false);
			setPageSaveError(null);
			setHasContentBeenEdited(false);
		} else {
			setIsPageSaving(false);
			setPageSaveError(`${updatePageData.error.name}: ${updatePageData.error.message}`);
			console.log("ERROR: ", updatePageData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setIsPageSaving(false);
		setPageSaveError(`${error.name}: ${error.message}`);
	}
};

const PageOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const page = usePage(id);

	const [updatedPageName, setUpdatedPageName] = useState<string | null>(null);
	const [updatedPageDescription, setUpdatedPageDescription] = useState<string | null>(null);
	// const [updatedAiPageData, setUpdatedAiPageData] = useState<string | null>(null);
	const [updatedHeroImage, setUpdatedHeroImage] = useState<string | null>(null);
	const [updatedIsPublished, setUpdatedIsPublished] = useState<boolean | undefined>(undefined);
	const [updatedPageCmsData, setUpdatedPageCmsData] = useState<[] | null>(null);

	const [isPageSaving, setIsPageSaving] = useState(false);
	const [pageSaveError, setPageSaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);

	const [updatedPage, setUpdatedPage] = useState<{
		page_name: string | null;
		page_description: string | null;
		// page_data: string | null;
		page_hero_image: string | null;
		cms_data: [] | null;
		is_published: boolean | undefined;
	} | null>(null);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedPageName(event.target.value);
		setHasContentBeenEdited(true);
	};
	const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedPageDescription(event.target.value);
		setHasContentBeenEdited(true);
	};
	const handleCmsDataChange = (updatedCmsData: any) => {
		setUpdatedPageCmsData(updatedCmsData.cms_data);
		setHasContentBeenEdited(true);
	};
	const handleIsPublishedChange = () => {
		setUpdatedIsPublished(!updatedIsPublished);
		setHasContentBeenEdited(true);
	};

	useEffect(() => {
		setUpdatedPageName(page?.data?.data?.page_name);
		setUpdatedPageDescription(page?.data?.data?.page_description);
		// setUpdatedAiPageData(page?.data?.data?.page_data);
		setUpdatedPageCmsData(page?.data?.data?.cms_data);
		setUpdatedHeroImage(page?.data?.data?.page_hero_image);
		setUpdatedIsPublished(page?.data?.data?.is_published);
	}, [page.data]);

	useEffect(() => {
		setUpdatedPage({
			page_name: updatedPageName,
			page_description: updatedPageDescription,
			cms_data: updatedPageCmsData,
			// page_data: updatedAiPageData,
			page_hero_image: updatedHeroImage,
			is_published: updatedIsPublished,
		});
	}, [
		updatedPageName,
		updatedPageDescription,
		// updatedAiPageData,
		updatedPageCmsData,
		updatedHeroImage,
		updatedIsPublished,
	]);

	if (page.isLoading || !isReady) {
		return <div>Loading</div>;
	}

	if (page.error) {
		return (
			<div>
				<h4>{page.error.message}</h4>
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
						label: "Pages",
						anchor: `/admin/${returnCurrentModule(router)}/pages`,
					},
					{
						label: page?.data?.data?.page_name,
						anchor: null,
					},
				]}
			/>
			<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						<RenderCms cmsData={page} updateCmsData={handleCmsDataChange} />
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
											updatedHeroImage ||
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
									value={updatedHeroImage}
									onChange={(e) => {
										setUpdatedHeroImage(e.target.value);
										setHasContentBeenEdited(true);
									}}
									variant="standard"
								/>
							</Grid>
							<Grid item xs={6}>
								<UploadButton
									setUpdatedHeroImage={setUpdatedHeroImage}
									setHasContentBeenEdited={setHasContentBeenEdited}
								/>
							</Grid>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Page Name"
								value={updatedPageName}
								onChange={handleNameChange}
								variant="standard"
							/>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Page Description"
								value={updatedPageDescription}
								onChange={handleDescriptionChange}
								variant="standard"
							/>
							<Grid item xs={12} lg={6}>
								<FormGroup>
									<FormControlLabel
										label={updatedIsPublished ? "Published" : "Draft"}
										control={
											<Switch
												checked={updatedIsPublished}
												onChange={() => handleIsPublishedChange()}
												inputProps={{ "aria-label": "controlled" }}
											/>
										}
									></FormControlLabel>
								</FormGroup>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSavePage({
											updatedPage,
											page,
											setHasContentBeenEdited,
											setIsPageSaving,
											setPageSaveError,
										});
										setIsAlertSnackbarOpen(true);
									}}
								>
									{!hasContentBeenEdited ? "Up to Date" : "Save"}
								</Button>
							</Grid>

							<AlertSnackbar
								isSaving={isPageSaving}
								saveError={pageSaveError}
								isAlertSnackbarOpen={isAlertSnackbarOpen}
								setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default PageOrganism;

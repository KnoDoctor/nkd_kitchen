import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Card";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import RenderCms from "../../__cms/RenderCms";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import ModuleDeletionOrganism from "./ModuleDeletionOrganism";

import AlertSnackbar from "../../_atoms/AlertSnackbar";
import UploadButton from "../../_atoms/UploadButton";

import useModule from "../../../hooks/modules/useModule";

import { returnCurrentModule } from "../../../utils/helperFunctions";

interface handleSaveModuleInputs {
	updatedModule: any;
	module: any;
	setHasContentBeenEdited(value: boolean): void;
	setIsModuleSaving(value: boolean): void;
	setModuleSaveError(value: string | undefined | null): void;
}

const handleSaveModule = async ({
	updatedModule,
	module,
	setHasContentBeenEdited,
	setIsModuleSaving,
	setModuleSaveError,
}: handleSaveModuleInputs) => {
	setIsModuleSaving(true);
	try {
		const moduleId = module.data.data.module_id;

		const updateModuleRes = await fetch(`/api/modules/${moduleId}`, {
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedModule),
		});

		const updateModuleData = await updateModuleRes.json();

		if (updateModuleData.success) {
			module.mutate();
			setIsModuleSaving(false);
			setModuleSaveError(null);
			setHasContentBeenEdited(false);
		} else {
			setIsModuleSaving(false);
			setModuleSaveError(`${updateModuleData.error.name}: ${updateModuleData.error.message}`);
			console.log("ERROR: ", updateModuleData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setIsModuleSaving(false);
		setModuleSaveError(`${error.name}: ${error.message}`);
	}
};

const ModuleOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const module = useModule(id);

	const [updatedModuleName, setUpdatedModuleName] = useState<string | null>(null);
	const [updatedModuleSlug, setUpdatedModuleSlug] = useState<string | null>(null);
	const [updatedModuleImage, setUpdatedModuleImage] = useState<string | null>(null);
	// const [updatedModuleCmsData, setUpdatedModuleCmsData] = useState<[] | null>(null);

	const [isModuleSaving, setIsModuleSaving] = useState(false);
	const [moduleSaveError, setModuleSaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [updatedModule, setUpdatedModule] = useState<{
		module_name: string | null;
		module_slug: string | null;
		module_image: string | null;
		// cms_data: [] | null;
	} | null>(null);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedModuleName(event.target.value);
		setHasContentBeenEdited(true);
	};
	const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedModuleSlug(event.target.value);
		setHasContentBeenEdited(true);
	};
	// const handleCmsDataChange = (updatedCmsData: any) => {
	// 	setUpdatedModuleCmsData(updatedCmsData.cms_data);
	// 	setHasContentBeenEdited(true);
	// };

	useEffect(() => {
		setUpdatedModuleName(module?.data?.data?.module_name);
		setUpdatedModuleSlug(module?.data?.data?.module_slug);
		setUpdatedModuleImage(module?.data?.data?.module_image);
		// setUpdatedModuleCmsData(module?.data?.data?.cms_data);
	}, [module.data]);

	useEffect(() => {
		setUpdatedModule({
			module_name: updatedModuleName,
			module_slug: updatedModuleSlug,
			module_image: updatedModuleImage,
			// cms_data: updatedModuleCmsData,
		});
	}, [
		updatedModuleName,
		updatedModuleSlug,
		updatedModuleImage,
		// updatedModuleCmsData,
	]);

	if (module.isLoading || !isReady) {
		return <div>Loading</div>;
	}

	if (module.error) {
		return (
			<div>
				<h4>{module.error.message}</h4>
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
						label: "Modules",
						anchor: `/admin/${returnCurrentModule(router)}/modules`,
					},
					{
						label: module?.data?.data?.module_name,
						anchor: null,
					},
				]}
			/>
			<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						{/* <RenderCms cmsData={module} updateCmsData={handleCmsDataChange} /> */}
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
											updatedModuleImage ||
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
									label="Image"
									value={updatedModuleImage}
									onChange={(e) => {
										setUpdatedModuleImage(e.target.value);
										setHasContentBeenEdited(true);
									}}
									variant="standard"
								/>
							</Grid>
							<Grid item xs={6}>
								<UploadButton
									setUpdatedHeroImage={setUpdatedModuleImage}
									setHasContentBeenEdited={setHasContentBeenEdited}
								/>
							</Grid>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Module Name"
								value={updatedModuleName}
								onChange={handleNameChange}
								variant="standard"
							/>
							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-slug"
								label="Module Slug"
								value={updatedModuleSlug}
								onChange={handleSlugChange}
								variant="standard"
							/>

							<Grid item xs={12} lg={6}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSaveModule({
											updatedModule,
											module,
											setHasContentBeenEdited,
											setIsModuleSaving,
											setModuleSaveError,
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
								isSaving={isModuleSaving}
								saveError={moduleSaveError}
								isAlertSnackbarOpen={isAlertSnackbarOpen}
								setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Card>
			<ModuleDeletionOrganism
				moduleId={id}
				moduleName={updatedModuleName}
				open={isDeleteDialogOpen}
				handleClose={() => setIsDeleteDialogOpen(false)}
			/>
		</>
	);
};

export default ModuleOrganism;

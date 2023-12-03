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

import Relator from "../../__cms/____wip/inputs/Relator";

import useModule from "../../../hooks/modules/useModule";

import { returnCurrentModule } from "../../../utils/helperFunctions";

import PersonCreationOrganism from "../people/PersonCreationOrganism";
import ActionsModal from "../../_atoms/ActionsModal";
// import useProcesses from "../../../hooks/processes/useProcesses";
// import ProcessCreationOrganism from "../processes/ProcessCreationOrganism";
import useEntities from "../../../hooks/entities/useEntities";
import useModules from "../../../hooks/modules/useModules";

interface handleSaveModuleInputs {
	updatedModule: any;
	module: any;
	modules: any;
	setHasContentBeenEdited(value: boolean): void;
	setHasBlurredInput(value: boolean): void;
	setIsModuleSaving(value: boolean): void;
	setModuleSaveError(value: string | undefined | null): void;
}

const handleSaveModule = async ({
	updatedModule,
	module,
	modules,
	setHasContentBeenEdited,
	setHasBlurredInput,
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
			modules.mutate();
			setIsModuleSaving(false);
			setModuleSaveError(null);
			setHasContentBeenEdited(false);
			setHasBlurredInput(false);
		} else {
			setIsModuleSaving(false);
			setModuleSaveError(`${updateModuleData.error.name}: ${updateModuleData.error.message}`);
			setHasBlurredInput(false);
			console.log("ERROR: ", updateModuleData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		setIsModuleSaving(false);
		setModuleSaveError(`${error.name}: ${error.message}`);
		setHasBlurredInput(false);
	}
};

const ModuleOrganism = () => {
	const router = useRouter();
	let isReady = router.isReady;
	let id = router.query.identifier;

	const module = useModule(id);
	const modules = useModules();

	const [isModuleSaving, setIsModuleSaving] = useState(false);
	const [moduleSaveError, setModuleSaveError] = useState<string | undefined | null>(null);
	const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
	const [hasBlurredInput, setHasBlurredInput] = useState(false);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	console.log(hasBlurredInput);

	useEffect(() => {
		if (hasContentBeenEdited) {
			handleSaveModule({
				updatedModule: {
					module_name: module?.data?.data?.module_name,
					module_slug: module?.data?.data?.module_slug,
					module_icon: module?.data?.data?.module_icon,
					module_image: module?.data?.data?.module_image,
					cms_data: module?.data?.data?.cms_data,
				},
				module,
				modules,
				setHasContentBeenEdited,
				setHasBlurredInput,
				setIsModuleSaving,
				setModuleSaveError,
			});
			setIsAlertSnackbarOpen(true);
		}
	}, [hasBlurredInput]);

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
						<RenderCms
							cmsData={module}
							updateCmsData={(updatedCmsData: any) => {
								module.mutate(
									{
										...module.data,
										data: {
											...module.data.data,
											cms_data: updatedCmsData?.cms_data,
										},
									},
									{ revalidate: false }
								);
								setHasContentBeenEdited(true);
								setHasBlurredInput(true);
							}}
						/>
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
							<Grid item xs={12} lg={6} mt={2} mb={4}>
								<Button
									variant="contained"
									sx={{ width: "100%" }}
									disabled={!hasContentBeenEdited}
									onClick={() => {
										handleSaveModule({
											updatedModule: {
												module_name: module?.data?.data?.module_name,
												module_slug: module?.data?.data?.module_slug,
												module_icon: module?.data?.data?.module_icon,
												module_image: module?.data?.data?.module_image,
												cms_data: module?.data?.data?.cms_data,
											},
											module,
											modules,
											setHasContentBeenEdited,
											setHasBlurredInput,
											setIsModuleSaving,
											setModuleSaveError,
										});
										setIsAlertSnackbarOpen(true);
										setHasBlurredInput(false);
									}}
								>
									{!hasContentBeenEdited ? "Up to Date" : "Content has Changed"}
								</Button>
							</Grid>
							<Grid item xs={12} lg={6} mt={2} mb={4}>
								<Button
									variant="contained"
									sx={{ width: "100%", ml: { xs: 0, lg: 2 } }}
									onClick={() => setIsDeleteDialogOpen(true)}
								>
									Delete
								</Button>
							</Grid>
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
											module?.data?.data?.module_image ||
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
									value={module?.data?.data?.module_image}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										module.mutate(
											{
												...module.data,
												data: {
													...module.data.data,
													module_image: event.target.value,
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
										module.mutate(
											{
												...module.data,
												data: {
													...module.data.data,
													module_image: url,
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
								title="Entities"
								relationName="modules_entities"
								relatingEntityId={id}
								relatingEntityName="modules"
								relatingEntityFieldPrefix="module"
								useRelatingEntityHook={useModule}
								relatableEntityName="entities"
								relatableEntityFieldPrefix="entity"
								useRelatableEntityHook={useEntities}
								isSidebar
							/>

							<TextField
								sx={{ width: "100%", mb: 2 }}
								multiline
								id="outlined-name"
								label="Module Name"
								value={module?.data?.data?.module_name}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									module.mutate(
										{
											...module.data,
											data: {
												...module.data.data,
												module_name: event.target.value,
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
								id="outlined-slug"
								label="Module Slug"
								value={module?.data?.data?.module_slug}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									module.mutate(
										{
											...module.data,
											data: {
												...module.data.data,
												module_slug: event.target.value,
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
								id="outlined-icon"
								label="Module Icon"
								value={module?.data?.data?.module_icon}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									module.mutate(
										{
											...module.data,
											data: {
												...module.data.data,
												module_icon: event.target.value,
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
				moduleName={module?.data?.data?.module_name}
				open={isDeleteDialogOpen}
				handleClose={() => setIsDeleteDialogOpen(false)}
			/>
		</>
	);
};

export default ModuleOrganism;

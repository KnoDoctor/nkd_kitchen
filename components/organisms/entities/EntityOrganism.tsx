import { useState, useEffect } from "react";

	import { useRouter } from "next/router";
	
	import Grid from "@mui/material/Grid";
	import Card from "@mui/material/Card";
	import TextField from "@mui/material/TextField";
	import Button from "@mui/material/Button";
	
	import RenderCms from "../../__cms/RenderCms";
	
	import Breadcrumbs from "../../_molecules/Breadcrumbs";
	
	import EntityDeletionOrganism from "./EntityDeletionOrganism";
	
	import AlertSnackbar from "../../_atoms/AlertSnackbar";
	
	import useEntity from "../../../hooks/entities/useEntity";
	
	import { returnCurrentModule } from "../../../utils/helperFunctions";
	
	interface handleSaveEntityInputs {
		updatedEntity: any;
		entity: any;
		setHasContentBeenEdited(value: boolean): void;
		setIsEntitySaving(value: boolean): void;
		setEntitySaveError(value: string | undefined | null): void;
	}
	
	const handleSaveEntity = async ({
		updatedEntity,
		entity,
		setHasContentBeenEdited,
		setIsEntitySaving,
		setEntitySaveError,
	}: handleSaveEntityInputs) => {
		setIsEntitySaving(true);
		try {
			const entityId = entity.data.data.entity_id;
	
			const updateEntityRes = await fetch(`/api/entities/${entityId}`, {
				method: "PATCH",
	
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedEntity),
			});
	
			const updateEntityData = await updateEntityRes.json();
	
			if (updateEntityData.success) {
				entity.mutate();
				setIsEntitySaving(false);
				setEntitySaveError(null);
				setHasContentBeenEdited(false);
			} else {
				setIsEntitySaving(false);
				setEntitySaveError(`${updateEntityData.error.name}: ${updateEntityData.error.message}`);
				console.log("ERROR: ", updateEntityData);
			}
		} catch (error: any) {
			console.log(`${error.name}: ${error.message}`);
			setIsEntitySaving(false);
			setEntitySaveError(`${error.name}: ${error.message}`);
		}
	};
	
	const EntityOrganism = () => {
		const router = useRouter();
		let isReady = router.isReady;
		let id = router.query.identifier;
	
		const entity = useEntity(id);
	
		const [updatedEntityName, setUpdatedEntityName] = useState<string | null>(null);
		// const [updatedEntityCmsData, setUpdatedEntityCmsData] = useState<[] | null>(null);
	
		const [isEntitySaving, setIsEntitySaving] = useState(false);
		const [entitySaveError, setEntitySaveError] = useState<string | undefined | null>(null);
		const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
		const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	
		const [updatedEntity, setUpdatedEntity] = useState<{
			entity_name: string | null;
			// cms_data: [] | null;
		} | null>(null);
	
		const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setUpdatedEntityName(event.target.value);
			setHasContentBeenEdited(true);
		};
		// const handleCmsDataChange = (updatedCmsData: any) => {
		// 	setUpdatedEntityCmsData(updatedCmsData.cms_data);
		// 	setHasContentBeenEdited(true);
		// };
	
		useEffect(() => {
			setUpdatedEntityName(entity?.data?.data?.entity_name);
			// setUpdatedEntityCmsData(entity?.data?.data?.cms_data);
		}, [entity.data]);
	
		useEffect(() => {
			setUpdatedEntity({
				entity_name: updatedEntityName,
				// cms_data: updatedEntityCmsData,
			});
		}, [
			updatedEntityName,
			// updatedEntityCmsData,
		]);
	
		if (entity.isLoading || !isReady) {
			return <div>Loading</div>;
		}
	
		if (entity.error) {
			return (
				<div>
					<h4>{entity.error.message}</h4>
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
							label: "Entities",
							anchor: `/admin/${returnCurrentModule(router)}/entities`,
						},
						{
							label: entity?.data?.data?.entity_name,
							anchor: null,
						},
					]}
				/>
				<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							{/* <RenderCms cmsData={entity} updateCmsData={handleCmsDataChange} /> */}
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
									label="Entity Name"
									value={updatedEntityName}
									onChange={handleNameChange}
									variant="standard"
								/>
	
								<Grid item xs={12} lg={6}>
									<Button
										variant="contained"
										sx={{ width: "100%" }}
										disabled={!hasContentBeenEdited}
										onClick={() => {
											handleSaveEntity({
												updatedEntity,
												entity,
												setHasContentBeenEdited,
												setIsEntitySaving,
												setEntitySaveError,
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
									isSaving={isEntitySaving}
									saveError={entitySaveError}
									isAlertSnackbarOpen={isAlertSnackbarOpen}
									setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<EntityDeletionOrganism
					entityId={id}
					entityName={updatedEntityName}
					open={isDeleteDialogOpen}
					handleClose={() => setIsDeleteDialogOpen(false)}
				/>
			</>
		);
	};
	
	export default EntityOrganism;
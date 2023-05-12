import { useState, useEffect } from "react";

	import { useRouter } from "next/router";
	
	import Grid from "@mui/material/Grid";
	import Card from "@mui/material/Card";
	import TextField from "@mui/material/TextField";
	import Button from "@mui/material/Button";
	
	import RenderCms from "../../__cms/RenderCms";
	
	import Breadcrumbs from "../../_molecules/Breadcrumbs";
	
	import PersonDeletionOrganism from "./PersonDeletionOrganism";
	
	import AlertSnackbar from "../../_atoms/AlertSnackbar";
	
	import usePerson from "../../../hooks/people/usePerson";
	
	import { returnCurrentModule } from "../../../utils/helperFunctions";
	
	interface handleSavePersonInputs {
		updatedPerson: any;
		person: any;
		setHasContentBeenEdited(value: boolean): void;
		setIsPersonSaving(value: boolean): void;
		setPersonSaveError(value: string | undefined | null): void;
	}
	
	const handleSavePerson = async ({
		updatedPerson,
		person,
		setHasContentBeenEdited,
		setIsPersonSaving,
		setPersonSaveError,
	}: handleSavePersonInputs) => {
		setIsPersonSaving(true);
		try {
			const personId = person.data.data.person_id;
	
			const updatePersonRes = await fetch(`/api/people/${personId}`, {
				method: "PATCH",
	
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedPerson),
			});
	
			const updatePersonData = await updatePersonRes.json();
	
			if (updatePersonData.success) {
				person.mutate();
				setIsPersonSaving(false);
				setPersonSaveError(null);
				setHasContentBeenEdited(false);
			} else {
				setIsPersonSaving(false);
				setPersonSaveError(`${updatePersonData.error.name}: ${updatePersonData.error.message}`);
				console.log("ERROR: ", updatePersonData);
			}
		} catch (error: any) {
			console.log(`${error.name}: ${error.message}`);
			setIsPersonSaving(false);
			setPersonSaveError(`${error.name}: ${error.message}`);
		}
	};
	
	const PersonOrganism = () => {
		const router = useRouter();
		let isReady = router.isReady;
		let id = router.query.identifier;
	
		const person = usePerson(id);
	
		const [updatedPersonName, setUpdatedPersonName] = useState<string | null>(null);
		// const [updatedPersonCmsData, setUpdatedPersonCmsData] = useState<[] | null>(null);
	
		const [isPersonSaving, setIsPersonSaving] = useState(false);
		const [personSaveError, setPersonSaveError] = useState<string | undefined | null>(null);
		const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
		const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	
		const [updatedPerson, setUpdatedPerson] = useState<{
			person_name: string | null;
			// cms_data: [] | null;
		} | null>(null);
	
		const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setUpdatedPersonName(event.target.value);
			setHasContentBeenEdited(true);
		};
		// const handleCmsDataChange = (updatedCmsData: any) => {
		// 	setUpdatedPersonCmsData(updatedCmsData.cms_data);
		// 	setHasContentBeenEdited(true);
		// };
	
		useEffect(() => {
			setUpdatedPersonName(person?.data?.data?.person_name);
			// setUpdatedPersonCmsData(person?.data?.data?.cms_data);
		}, [person.data]);
	
		useEffect(() => {
			setUpdatedPerson({
				person_name: updatedPersonName,
				// cms_data: updatedPersonCmsData,
			});
		}, [
			updatedPersonName,
			// updatedPersonCmsData,
		]);
	
		if (person.isLoading || !isReady) {
			return <div>Loading</div>;
		}
	
		if (person.error) {
			return (
				<div>
					<h4>{person.error.message}</h4>
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
							label: "People",
							anchor: `/admin/${returnCurrentModule(router)}/people`,
						},
						{
							label: person?.data?.data?.person_name,
							anchor: null,
						},
					]}
				/>
				<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							{/* <RenderCms cmsData={person} updateCmsData={handleCmsDataChange} /> */}
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
									label="Person Name"
									value={updatedPersonName}
									onChange={handleNameChange}
									variant="standard"
								/>
	
								<Grid item xs={12} lg={6}>
									<Button
										variant="contained"
										sx={{ width: "100%" }}
										disabled={!hasContentBeenEdited}
										onClick={() => {
											handleSavePerson({
												updatedPerson,
												person,
												setHasContentBeenEdited,
												setIsPersonSaving,
												setPersonSaveError,
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
									isSaving={isPersonSaving}
									saveError={personSaveError}
									isAlertSnackbarOpen={isAlertSnackbarOpen}
									setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<PersonDeletionOrganism
					personId={id}
					personName={updatedPersonName}
					open={isDeleteDialogOpen}
					handleClose={() => setIsDeleteDialogOpen(false)}
				/>
			</>
		);
	};
	
	export default PersonOrganism;
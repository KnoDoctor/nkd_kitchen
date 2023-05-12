module.exports.buildEntityOrganismFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import { useState, useEffect } from "react";

	import { useRouter } from "next/router";
	
	import Grid from "@mui/material/Grid";
	import Card from "@mui/material/Card";
	import TextField from "@mui/material/TextField";
	import Button from "@mui/material/Button";
	
	import RenderCms from "../../__cms/RenderCms";
	
	import Breadcrumbs from "../../_molecules/Breadcrumbs";
	
	import ${uppercaseSingular}DeletionOrganism from "./${uppercaseSingular}DeletionOrganism";
	
	import AlertSnackbar from "../../_atoms/AlertSnackbar";
	
	import use${uppercaseSingular} from "../../../hooks/${lowercasePlural}/use${uppercaseSingular}";
	
	import { returnCurrentModule } from "../../../utils/helperFunctions";
	
	interface handleSave${uppercaseSingular}Inputs {
		updated${uppercaseSingular}: any;
		${lowercaseSingular}: any;
		setHasContentBeenEdited(value: boolean): void;
		setIs${uppercaseSingular}Saving(value: boolean): void;
		set${uppercaseSingular}SaveError(value: string | undefined | null): void;
	}
	
	const handleSave${uppercaseSingular} = async ({
		updated${uppercaseSingular},
		${lowercaseSingular},
		setHasContentBeenEdited,
		setIs${uppercaseSingular}Saving,
		set${uppercaseSingular}SaveError,
	}: handleSave${uppercaseSingular}Inputs) => {
		setIs${uppercaseSingular}Saving(true);
		try {
			const ${lowercaseSingular}Id = ${lowercaseSingular}.data.data.${lowercaseSingular}_id;
	
			const update${uppercaseSingular}Res = await fetch(\`/api/${lowercasePlural}/\${${lowercaseSingular}Id}\`, {
				method: "PATCH",
	
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updated${uppercaseSingular}),
			});
	
			const update${uppercaseSingular}Data = await update${uppercaseSingular}Res.json();
	
			if (update${uppercaseSingular}Data.success) {
				${lowercaseSingular}.mutate();
				setIs${uppercaseSingular}Saving(false);
				set${uppercaseSingular}SaveError(null);
				setHasContentBeenEdited(false);
			} else {
				setIs${uppercaseSingular}Saving(false);
				set${uppercaseSingular}SaveError(\`\${update${uppercaseSingular}Data.error.name}: \${update${uppercaseSingular}Data.error.message}\`);
				console.log("ERROR: ", update${uppercaseSingular}Data);
			}
		} catch (error: any) {
			console.log(\`\${error.name}: \${error.message}\`);
			setIs${uppercaseSingular}Saving(false);
			set${uppercaseSingular}SaveError(\`\${error.name}: \${error.message}\`);
		}
	};
	
	const ${uppercaseSingular}Organism = () => {
		const router = useRouter();
		let isReady = router.isReady;
		let id = router.query.identifier;
	
		const ${lowercaseSingular} = use${uppercaseSingular}(id);
	
		const [updated${uppercaseSingular}Name, setUpdated${uppercaseSingular}Name] = useState<string | null>(null);
		// const [updated${uppercaseSingular}CmsData, setUpdated${uppercaseSingular}CmsData] = useState<[] | null>(null);
	
		const [is${uppercaseSingular}Saving, setIs${uppercaseSingular}Saving] = useState(false);
		const [${lowercaseSingular}SaveError, set${uppercaseSingular}SaveError] = useState<string | undefined | null>(null);
		const [hasContentBeenEdited, setHasContentBeenEdited] = useState(false);
		const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	
		const [updated${uppercaseSingular}, setUpdated${uppercaseSingular}] = useState<{
			${lowercaseSingular}_name: string | null;
			// cms_data: [] | null;
		} | null>(null);
	
		const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setUpdated${uppercaseSingular}Name(event.target.value);
			setHasContentBeenEdited(true);
		};
		// const handleCmsDataChange = (updatedCmsData: any) => {
		// 	setUpdated${uppercaseSingular}CmsData(updatedCmsData.cms_data);
		// 	setHasContentBeenEdited(true);
		// };
	
		useEffect(() => {
			setUpdated${uppercaseSingular}Name(${lowercaseSingular}?.data?.data?.${lowercaseSingular}_name);
			// setUpdated${uppercaseSingular}CmsData(${lowercaseSingular}?.data?.data?.cms_data);
		}, [${lowercaseSingular}.data]);
	
		useEffect(() => {
			setUpdated${uppercaseSingular}({
				${lowercaseSingular}_name: updated${uppercaseSingular}Name,
				// cms_data: updated${uppercaseSingular}CmsData,
			});
		}, [
			updated${uppercaseSingular}Name,
			// updated${uppercaseSingular}CmsData,
		]);
	
		if (${lowercaseSingular}.isLoading || !isReady) {
			return <div>Loading</div>;
		}
	
		if (${lowercaseSingular}.error) {
			return (
				<div>
					<h4>{${lowercaseSingular}.error.message}</h4>
				</div>
			);
		}
	
		return (
			<>
				<Breadcrumbs
					breadcrumbs={[
						{
							label: returnCurrentModule(router),
							anchor: \`/admin/\${returnCurrentModule(router)}\`,
						},
	
						{
							label: "${uppercasePlural}",
							anchor: \`/admin/\${returnCurrentModule(router)}/${lowercasePlural}\`,
						},
						{
							label: ${lowercaseSingular}?.data?.data?.${lowercaseSingular}_name,
							anchor: null,
						},
					]}
				/>
				<Card sx={{ height: "100%", p: 2, mt: 2, overflow: "visible" }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							{/* <RenderCms cmsData={${lowercaseSingular}} updateCmsData={handleCmsDataChange} /> */}
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
									label="${uppercaseSingular} Name"
									value={updated${uppercaseSingular}Name}
									onChange={handleNameChange}
									variant="standard"
								/>
	
								<Grid item xs={12} lg={6}>
									<Button
										variant="contained"
										sx={{ width: "100%" }}
										disabled={!hasContentBeenEdited}
										onClick={() => {
											handleSave${uppercaseSingular}({
												updated${uppercaseSingular},
												${lowercaseSingular},
												setHasContentBeenEdited,
												setIs${uppercaseSingular}Saving,
												set${uppercaseSingular}SaveError,
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
									isSaving={is${uppercaseSingular}Saving}
									saveError={${lowercaseSingular}SaveError}
									isAlertSnackbarOpen={isAlertSnackbarOpen}
									setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<${uppercaseSingular}DeletionOrganism
					${lowercaseSingular}Id={id}
					${lowercaseSingular}Name={updated${uppercaseSingular}Name}
					open={isDeleteDialogOpen}
					handleClose={() => setIsDeleteDialogOpen(false)}
				/>
			</>
		);
	};
	
	export default ${uppercaseSingular}Organism;`;
};

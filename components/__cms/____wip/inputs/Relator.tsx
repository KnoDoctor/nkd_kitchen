import { useState, useEffect, useRef } from "react";
import { Container, Box, Grid, Card, Stack, Typography } from "@mui/material";

import AlertSnackbar from "../../../_atoms/AlertSnackbar";

import getMissingEntitiesRelator from "../../../../utils/helperFunctions/getMissingEntitiesRelator";
import DeleteableChip from "../../../_atoms/DeletableChip";
import AddableChip from "../../../_atoms/AddableChip";
import DebouncedTextField from "./DebouncedTextField";

interface HandleRelationProps {
	relatable_id: string;
	relationName: string;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	relating_id: string;
	relatingEntityName: string;
	relatingEntityFieldPrefix: string;
	relatingEntity: any;
	setRelationSaveError: (error: string | null) => void;
	setIsAlertSnackbarOpen: (isOpen: boolean) => void;
	action: "POST" | "PATCH" | "DELETE";
	relationMetaData?: any;
}

const handleRelation = async ({
	relatable_id,
	relationName,
	relatableEntityName,
	relatableEntityFieldPrefix,
	relating_id,
	relatingEntityName,
	relatingEntityFieldPrefix,
	relatingEntity,
	setRelationSaveError,
	setIsAlertSnackbarOpen,
	action,
	relationMetaData,
}: HandleRelationProps) => {
	const updateStateOnSuccess = (setRelationSaveError: (error: string | null) => void) => {
		console.log("Success");
		setRelationSaveError(null);
	};

	const updateStateOnError = (
		setRelationSaveError: (error: string | null) => void,
		errorMessage: string
	) => {
		console.log("Failed");
		setIsAlertSnackbarOpen(true);
		setRelationSaveError(errorMessage);
	};

	try {
		//Handle Create Opimistic Mutation
		if (action === "POST") {
			relatingEntity.mutate(
				{
					...relatingEntity.data,
					data: {
						...relatingEntity.data.data,
						[`${relationName}`]: [
							...relatingEntity.data.data[`${relationName}`],
							{
								[`${relatableEntityName}`]: {
									[`${relatableEntityFieldPrefix}_name`]: "ZZLoading...",
									[`${relatableEntityFieldPrefix}_id`]: relatable_id,
								},
							},
						],
					},
				},
				{ revalidate: false }
			);
		}

		const relationRes = await fetch(
			`/api/${relatingEntityName}/${relating_id}/${relatableEntityName}/${relatable_id}`,
			{
				method: action,

				headers: {
					"Content-Type": "application/json",
				},
				body:
					relationMetaData || action === "PATCH"
						? JSON.stringify({
								...relationMetaData,
						  })
						: null,
			}
		);

		if (!relationRes.ok) {
			throw new Error(`HTTP error! status: ${relationRes.status}`);
		}

		const relationsData = await relationRes.json();

		if (relationsData.success) {
			updateStateOnSuccess(setRelationSaveError);

			relatingEntity.mutate();
		} else {
			updateStateOnError(
				setRelationSaveError,
				action === "POST" ? "Creation Failed" : "Deletion Failed"
			);
		}
	} catch (error: any) {
		updateStateOnError(setRelationSaveError, `${error.name}: ${error.message}`);
		console.log(error);
	}
};

interface RelatorProps {
	title: string;
	relatingEntityName: string;
	relatingEntityFieldPrefix: string;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	relationName: string;
	relatingEntityId: any;
	useRelatingEntityHook: any;
	useRelatableEntityHook: any;
	isSidebar?: boolean;
	CustomRelationComponent?: any;
	RelatableEntityCreationComponent?: any;
}

const Relator = ({
	title,
	relationName,
	relatingEntityName,
	relatingEntityId,
	relatingEntityFieldPrefix,
	useRelatingEntityHook,
	relatableEntityName,
	relatableEntityFieldPrefix,
	useRelatableEntityHook,
	isSidebar,
	CustomRelationComponent,
	RelatableEntityCreationComponent,
}: RelatorProps) => {
	const relatingEntity = useRelatingEntityHook(relatingEntityId);
	const relatableEntities = useRelatableEntityHook();

	const [relationSaveError, setRelationSaveError] = useState<string | undefined | null>(null);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);

	const searchInputRef = useRef();
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		if (searchInputRef.current) {
			(searchInputRef.current as HTMLInputElement)?.focus();
		}
	}, [searchTerm]);

	const RenderPrimaryComponent = () => {
		return (
			<>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						color: "#194666",
						textDecoration: "underline",
					}}
				>
					{title || "Relator"}
				</Typography>
				<>
					{CustomRelationComponent ? (
						relatingEntity.data.data[`${relationName}`].length > 0 ? (
							relatingEntity.data.data[`${relationName}`]
								// .sort((a: any, b: any) => {
								// 	const nameA =
								// 		a[`${relatableEntityName}`][
								// 			`${relatableEntityFieldPrefix}_name`
								// 		].toLowerCase();
								// 	const nameB =
								// 		b[`${relatableEntityName}`][
								// 			`${relatableEntityFieldPrefix}_name`
								// 		].toLowerCase();
								// 	if (nameA < nameB) return -1;
								// 	if (nameA > nameB) return 1;
								// 	return 0;
								// })
								.sort((a: any, b: any) => {
									const dateA = new Date(a[`created_at`]);
									const dateB = new Date(b[`created_at`]);
									return dateA.getTime() - dateB.getTime(); // For ascending order
									// return dateB.getTime() - dateA.getTime(); // Uncomment for descending order
								})
								.map((relation: any) => (
									<CustomRelationComponent
										key={
											relation[`${relatableEntityName}`][
												`${relatableEntityFieldPrefix}_id`
											]
										}
										ingredient={relation}
										handleRelation={handleRelation}
										handleRelationSetupData={{
											relatable_id:
												relation[`${relatableEntityName}`][
													`${relatableEntityFieldPrefix}_id`
												],
											relating_id:
												relatingEntity.data.data[
													`${relatingEntityFieldPrefix}_id`
												],
											relatableEntityName,
											relatableEntityFieldPrefix,
											relatingEntityName,
											relatingEntityFieldPrefix,
											relatingEntity,
											setRelationSaveError,
											setIsAlertSnackbarOpen,
										}}
									/>
								))
						) : (
							<></>
						)
					) : (
						<Box my={2}>
							{relatingEntity.data.data[`${relationName}`].length > 0 ? (
								<Stack
									direction="row"
									spacing={1}
									sx={{ flexWrap: "wrap", gap: 1 }}
									useFlexGap
								>
									{relatingEntity.data.data[`${relationName}`]
										.sort((a: any, b: any) => {
											const nameA =
												a[`${relatableEntityName}`][
													`${relatableEntityFieldPrefix}_name`
												].toLowerCase();
											const nameB =
												b[`${relatableEntityName}`][
													`${relatableEntityFieldPrefix}_name`
												].toLowerCase();
											if (nameA < nameB) return -1;
											if (nameA > nameB) return 1;
											return 0;
										})
										.map((relation: any) => (
											<DeleteableChip
												key={
													relation[`${relatableEntityName}`][
														`${relatableEntityFieldPrefix}_id`
													]
												}
												relation={relation}
												handleRelation={handleRelation}
												handleRelationSetupData={{
													relatable_id:
														relation[`${relatableEntityName}`][
															`${relatableEntityFieldPrefix}_id`
														],
													relating_id:
														relatingEntity.data.data[
															`${relatingEntityFieldPrefix}_id`
														],
													relatableEntityName,
													relatableEntityFieldPrefix,
													relatingEntityName,
													relatingEntityFieldPrefix,
													relatingEntity,

													setRelationSaveError,
													setIsAlertSnackbarOpen,
												}}
												relatableEntityName={relatableEntityName}
												relatableEntityFieldPrefix={
													relatableEntityFieldPrefix
												}
											/>
										))}
								</Stack>
							) : (
								<Typography variant="body1">{`No ${relatableEntityName} selected.`}</Typography>
							)}
						</Box>
					)}
				</>

				{RelatableEntityCreationComponent ? (
					<Grid container my={2}>
						<Grid item xs={6}>
							<Typography
								variant="body1"
								sx={{
									fontSize: 18,
									color: "#194666",
									textDecoration: "underline",
								}}
							>
								{`Available ${title}`}
							</Typography>
						</Grid>
						<Grid item xs={6} display={"flex"} justifyContent={"end"}>
							{RelatableEntityCreationComponent}
						</Grid>
					</Grid>
				) : (
					<></>
				)}
				<Box width="100%">
					<DebouncedTextField
						value={searchTerm}
						setValue={setSearchTerm}
						ref={searchInputRef}
						placeholder={`Search for ${title.toLowerCase()}...`}
					/>
				</Box>
				<Box my={2}>
					{getMissingEntitiesRelator(
						relatingEntity.data.data[`${relationName}`],
						relatableEntities.data.data,
						relatableEntityFieldPrefix,
						relatableEntityName
					).length > 0 ? (
						<Stack
							direction="row"
							spacing={1}
							sx={{ flexWrap: "wrap", gap: 1 }}
							useFlexGap
						>
							{getMissingEntitiesRelator(
								relatingEntity.data.data[`${relationName}`],
								relatableEntities.data.data,
								relatableEntityFieldPrefix,
								relatableEntityName
							)
								.sort((a: any, b: any) => {
									const nameA =
										a[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_name`
										].toLowerCase();
									const nameB =
										b[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_name`
										].toLowerCase();
									if (nameA < nameB) return -1;
									if (nameA > nameB) return 1;
									return 0;
								})
								.filter((relation: any) => {
									if (searchTerm.trim() === "") return true;
									return relation[`${relatableEntityName}`][
										`${relatableEntityFieldPrefix}_name`
									]
										.toLowerCase()
										.includes(searchTerm.toLowerCase());
								})
								.map((relation: any) => (
									<AddableChip
										key={
											relation[`${relatableEntityName}`][
												`${relatableEntityFieldPrefix}_id`
											]
										}
										relation={relation}
										handleRelation={handleRelation}
										handleRelationSetupData={{
											relatable_id:
												relation[`${relatableEntityName}`][
													`${relatableEntityFieldPrefix}_id`
												],
											relating_id:
												relatingEntity.data.data[
													`${relatingEntityFieldPrefix}_id`
												],
											relationName,
											relatableEntityName,
											relatableEntityFieldPrefix,
											relatingEntityName,
											relatingEntityFieldPrefix,
											relatingEntity,

											setRelationSaveError,
											setIsAlertSnackbarOpen,
										}}
										relatableEntityName={relatableEntityName}
										relatableEntityFieldPrefix={relatableEntityFieldPrefix}
									/>
								))}
						</Stack>
					) : (
						<Typography variant="body1">{`You've related every ${relatableEntityFieldPrefix}, make sure they're all relevant 😉`}</Typography>
					)}
				</Box>
				<AlertSnackbar
					saveError={relationSaveError}
					isAlertSnackbarOpen={isAlertSnackbarOpen}
					setIsAlertSnackbarOpen={setIsAlertSnackbarOpen}
				/>
			</>
		);
	};

	if (relatingEntity.isLoading) return <>Loading...</>;
	if (relatableEntities.isLoading) return <>Loading...</>;

	return (
		<>
			{isSidebar ? (
				<Container maxWidth={"md"} style={{ padding: 0 }}>
					<RenderPrimaryComponent />
				</Container>
			) : (
				<Container maxWidth={"md"} style={{ paddingTop: 25 }}>
					<Card variant="outlined" sx={{ p: 4 }}>
						<RenderPrimaryComponent />
					</Card>
				</Container>
			)}
		</>
	);
};

export default Relator;

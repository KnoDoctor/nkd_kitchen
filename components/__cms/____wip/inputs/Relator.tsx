import { useState } from "react";
import { Container, Box, Card, Stack, Chip, Typography } from "@mui/material";

import AlertSnackbar from "../../../_atoms/AlertSnackbar";

import getMissingEntitiesRelator from "../../../../utils/helperFunctions/getMissingEntitiesRelator";

interface HandleRelationProps {
	relatable_id: string;
	relationName: string;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	relating_id: string;
	relatingEntityName: string;
	relatingEntityFieldPrefix: string;
	relatingEntity: any;
	setIsRelationSaving: (isSaving: boolean) => void;
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
	setIsRelationSaving,
	setRelationSaveError,
	setIsAlertSnackbarOpen,
	action,
	relationMetaData,
}: HandleRelationProps) => {
	const updateStateOnSuccess = (
		setIsRelationSaving: (isSaving: boolean) => void,
		setRelationSaveError: (error: string | null) => void
	) => {
		console.log("Success");
		setIsRelationSaving(false);
		setRelationSaveError(null);
	};

	const updateStateOnError = (
		setIsRelationSaving: (isSaving: boolean) => void,
		setRelationSaveError: (error: string | null) => void,
		errorMessage: string
	) => {
		console.log("Failed");
		setIsAlertSnackbarOpen(true);
		setIsRelationSaving(false);
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
									[`${relatableEntityFieldPrefix}_id`]: "loading",
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
			updateStateOnSuccess(setIsRelationSaving, setRelationSaveError);

			relatingEntity.mutate();
		} else {
			updateStateOnError(
				setIsRelationSaving,
				setRelationSaveError,
				action === "POST" ? "Creation Failed" : "Deletion Failed"
			);
		}
	} catch (error: any) {
		updateStateOnError(
			setIsRelationSaving,
			setRelationSaveError,
			`${error.name}: ${error.message}`
		);
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

	const [isRelationSaving, setIsRelationSaving] = useState(false);
	const [relationSaveError, setRelationSaveError] = useState<string | undefined | null>(null);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);

	const toggleEntityRelation = ({ relatableEntity, relationMetaData }: any) => {
		let currentEntityRelations = [...relatingEntity.data.data[`${relationName}`]];

		const relatableEntityIndex = currentEntityRelations.findIndex(
			(item) =>
				item[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_id`] ===
				relatableEntity[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_id`]
		);

		if (relatableEntityIndex !== -1) {
			currentEntityRelations.splice(relatableEntityIndex, 1);
		} else {
			currentEntityRelations.push({ ...relatableEntity, ...relationMetaData });
		}
	};

	const RenderPrimaryComponent = () => {
		return (
			<>
				<Typography
					variant="h5"
					sx={{
						margin: 0,
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
									<CustomRelationComponent
										key={
											relation[`${relatableEntityName}`][
												`${relatableEntityFieldPrefix}_id`
											]
										}
										ingredient={relation}
										handleRelation={handleRelation}
										toggleEntityRelation={toggleEntityRelation}
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
											setIsRelationSaving,
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
									{relatingEntity.data.data[`${relationName}`].map(
										(relation: any) => (
											<Chip
												key={
													relation[`${relatableEntityName}`][
														`${relatableEntityFieldPrefix}_id`
													]
												}
												label={
													relation[`${relatableEntityName}`][
														`${relatableEntityFieldPrefix}_name`
													]
												}
												onDelete={() => {
													toggleEntityRelation({
														relatableEntity: relation,
													});
													handleRelation({
														relatable_id:
															relation[`${relatableEntityName}`][
																`${relatableEntityFieldPrefix}_id`
															],
														relationName,
														relating_id:
															relatingEntity.data.data[
																`${relatingEntityFieldPrefix}_id`
															],
														relatableEntityName,
														relatableEntityFieldPrefix,
														relatingEntityName,
														relatingEntityFieldPrefix,
														relatingEntity,
														setIsRelationSaving,
														setRelationSaveError,
														setIsAlertSnackbarOpen,

														action: "DELETE",
													});
												}}
											/>
										)
									)}
								</Stack>
							) : (
								<Typography variant="body1">{`No ${relatableEntityName} selected.`}</Typography>
							)}
						</Box>
					)}
				</>

				{RelatableEntityCreationComponent ? RelatableEntityCreationComponent : <></>}
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
							).map((relation: any) => (
								<Chip
									key={
										relation[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_id`
										]
									}
									label={
										relation[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_name`
										]
									}
									onClick={() => {
										toggleEntityRelation({ relatableEntity: relation });
										handleRelation({
											relatable_id:
												relation[`${relatableEntityName}`][
													`${relatableEntityFieldPrefix}_id`
												],
											relating_id:
												relatingEntity.data.data[
													`${relatingEntityFieldPrefix}_id`
												],
											relatableEntityName,
											relationName,
											relatableEntityFieldPrefix,
											relatingEntityName,
											relatingEntityFieldPrefix,
											relatingEntity,
											setIsRelationSaving,
											setRelationSaveError,
											setIsAlertSnackbarOpen,

											action: "POST",
										});
									}}
									variant="outlined"
								/>
							))}
						</Stack>
					) : (
						<Typography variant="body1">{`You've related every ${relatableEntityFieldPrefix}, make sure they're all relevant 😉`}</Typography>
					)}
				</Box>
				<AlertSnackbar
					isSaving={isRelationSaving}
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

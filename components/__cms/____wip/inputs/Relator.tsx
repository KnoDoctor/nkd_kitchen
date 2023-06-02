import { useState } from "react";
import { Container, Box, Card, Stack, Chip, Typography } from "@mui/material";

import AlertSnackbar from "../../../_atoms/AlertSnackbar";

import getMissingEntitiesRelator from "../../../../utils/helperFunctions/getMissingEntitiesRelator";

interface HandleRelationProps {
	relatable_id: string;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	relating_id: string;
	relatingEntityName: string;
	relatingEntityFieldPrefix: string;
	relatingEntity: string;
	setIsRelationSaving: (isSaving: boolean) => void;
	setRelationSaveError: (error: string | null) => void;
	setIsAlertSnackbarOpen: (isOpen: boolean) => void;
	action: "POST" | "DELETE";
}

const handleRelation = async ({
	relatable_id,
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
		setIsRelationSaving(false);
		setRelationSaveError(errorMessage);
	};

	try {
		setIsRelationSaving(true);
		setIsAlertSnackbarOpen(true);
		const relationRes = await fetch(
			`/api/${relatingEntityName}/${relating_id}/${relatableEntityName}/${relatable_id}`,
			{
				method: action,

				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					[`${relatableEntityFieldPrefix}_id`]: relatable_id,
					[`${relatingEntityFieldPrefix}_id`]: relating_id,
				}),
			}
		);

		if (!relationRes.ok) {
			throw new Error(`HTTP error! status: ${relationRes.status}`);
		}

		const relationsData = await relationRes.json();

		if (relationsData.success) {
			updateStateOnSuccess(setIsRelationSaving, setRelationSaveError);
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
	}
};

interface RelatorProps {
	title: string;
	relationName: string;
	relatingEntityName: string;
	relatingEntityId: any;
	relatingEntityFieldPrefix: string;
	useRelatingEntityHook: any;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	useRelatableEntityHook: any;
	isSidebar?: boolean;
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
}: RelatorProps) => {
	const relatingEntity = useRelatingEntityHook(relatingEntityId);
	const relatableEntities = useRelatableEntityHook();

	const [relatedEntities, setRelatedEntities] = useState(
		relatingEntity.data.data[`${relationName}`] || []
	);

	const [isRelationSaving, setIsRelationSaving] = useState(false);
	const [relationSaveError, setRelationSaveError] = useState<string | undefined | null>(null);
	const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);

	const toggleEntityReference = (entity: any) => {
		let currentEntityRelations = [...relatedEntities];

		const entityIndex = currentEntityRelations.findIndex(
			(item) =>
				item[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_id`] ===
				entity[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_id`]
		);

		if (entityIndex !== -1) {
			currentEntityRelations.splice(entityIndex, 1);
		} else {
			currentEntityRelations.push({
				[`${relatableEntityName}`]: {
					[`${relatableEntityFieldPrefix}_id`]:
						entity[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_id`],
					[`${relatableEntityFieldPrefix}_name`]:
						entity[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_name`],
				},
			});
		}
		setRelatedEntities(currentEntityRelations);
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
				<Box my={2}>
					{relatedEntities.length > 0 ? (
						<Stack
							direction="row"
							spacing={1}
							sx={{ flexWrap: "wrap", gap: 1 }}
							useFlexGap
						>
							{relatedEntities.map((reference: any) => (
								<Chip
									key={
										reference[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_id`
										]
									}
									label={
										reference[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_name`
										]
									}
									onDelete={() => {
										toggleEntityReference(reference);
										handleRelation({
											relatable_id:
												reference[`${relatableEntityName}`][
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
											action: "DELETE",
										});
									}}
								/>
							))}
						</Stack>
					) : (
						<Typography variant="body1">{`No ${relatableEntityName} selected.`}</Typography>
					)}
				</Box>
				<Box my={2}>
					{getMissingEntitiesRelator(
						relatedEntities,
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
								relatedEntities,
								relatableEntities.data.data,
								relatableEntityFieldPrefix,
								relatableEntityName
							).map((reference: any) => (
								<Chip
									key={
										reference[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_id`
										]
									}
									label={
										reference[`${relatableEntityName}`][
											`${relatableEntityFieldPrefix}_name`
										]
									}
									onClick={() => {
										toggleEntityReference(reference);
										handleRelation({
											relatable_id:
												reference[`${relatableEntityName}`][
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
											action: "POST",
										});
									}}
									variant="outlined"
								/>
							))}
						</Stack>
					) : (
						<Typography variant="body1">{`You've referenced every ${relatableEntityFieldPrefix}, make sure they're all relevant 😉`}</Typography>
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

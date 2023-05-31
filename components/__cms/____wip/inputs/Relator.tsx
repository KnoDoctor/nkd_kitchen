import { useState } from "react";
import { Container, Box, Card, Stack, Chip, Typography } from "@mui/material";

import getMissingEntitiesRelator from "../../../../utils/helperFunctions/getMissingEntitiesRelator";

// interface handleSaveRecipeInputs {
// 	category_id: string;
// 	recipe_id: string;
// }

const handleRelation = async ({
	relatable_id,
	relatableEntityName,
	relatableEntityFieldPrefix,
	relating_id,
	relatingEntityName,
	relatingEntityFieldPrefix,
}: any) => {
	// setIsRecipeSaving(true);
	try {
		const relationRes = await fetch(
			`/api/${relatingEntityName}/${relating_id}/${relatableEntityName}`,
			{
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					[`${relatableEntityFieldPrefix}_id`]: relatable_id,
					[`${relatingEntityFieldPrefix}_id`]: relating_id,
				}),
			}
		);

		const relationsData = await relationRes.json();

		if (relationsData.success) {
			console.log("Created");

			// recipe.mutate();
			// setIsRecipeSaving(false);
			// setRecipeSaveError(null);
			// setHasContentBeenEdited(false);
		} else {
			console.log("Failed");
			// setIsRecipeSaving(false);
			// setRecipeSaveError(`${updateRecipeData.error.name}: ${updateRecipeData.error.message}`);
			// console.log("ERROR: ", updateRecipeData);
		}
	} catch (error: any) {
		console.log(`${error.name}: ${error.message}`);
		// setIsRecipeSaving(false);
		// setRecipeSaveError(`${error.name}: ${error.message}`);
	}
};

interface RelatorProps {
	title: string;
	relationName: string;
	relatingEntityName: string;
	relatingEntityFieldPrefix: string;
	relatingEntity: any;
	relatableEntityName: string;
	relatableEntityFieldPrefix: string;
	useHook: any;
	isSidebar?: boolean;
}

const Relator = ({
	title,
	relationName,
	relatingEntityName,
	relatingEntityFieldPrefix,
	relatingEntity,
	relatableEntityName,
	relatableEntityFieldPrefix,
	useHook,
	isSidebar,
}: RelatorProps) => {
	const [relatedEntities, setRelatedEntities] = useState(
		relatingEntity.data.data[`${relationName}`] || []
	);

	const relatableEntities = useHook();

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

	if (relatableEntities.isLoading) return <>Loading...</>;

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
			</>
		);
	};

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

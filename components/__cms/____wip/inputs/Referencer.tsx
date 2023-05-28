import { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Stack, Chip, Typography } from "@mui/material";

// interface Entity {
// 	entity_id: string;
// 	entity_name: string;
// }

function getMissingEntities(
	referencedEntities: any,
	referenceableEntities: any,
	entityFieldPrefix: string
): any {
	if (referenceableEntities.length === 0) {
		return []; // Return an empty array if either input array is empty
	}

	const referencedIds = referencedEntities.map(
		(entity: any) => entity[`${entityFieldPrefix}_id`]
	);
	return referenceableEntities.filter(
		(entity: any) => !referencedIds.includes(entity[`${entityFieldPrefix}_id`])
	);
}

interface ReferencerProps {
	fieldName: string;
	entityFieldPrefix: string;
	handleExplicitSectionDataChange: any;
	section: any;
	useHook: any;
}

const Referencer = ({
	fieldName,
	entityFieldPrefix,
	handleExplicitSectionDataChange,
	section,
	useHook,
}: ReferencerProps) => {
	const [referencedEntities, setReferences] = useState(section[fieldName]);

	const referenceableEntities = useHook();

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: referencedEntities,
			},
			section
		);
	}, [referencedEntities]);

	const toggleEntityReference = (entity: any) => {
		let currentEntityReferences = [...referencedEntities];

		const entityIndex = currentEntityReferences.findIndex(
			(item) => item[`${entityFieldPrefix}_id`] === entity[`${entityFieldPrefix}_id`]
		);

		if (entityIndex !== -1) {
			currentEntityReferences.splice(entityIndex, 1);
		} else {
			currentEntityReferences.push({
				[`${entityFieldPrefix}_id`]: entity[`${entityFieldPrefix}_id`],
				[`${entityFieldPrefix}_name`]: entity[`${entityFieldPrefix}_name`],
			});
		}

		setReferences(currentEntityReferences);
	};

	if (referenceableEntities.isLoading) return <>Loading...</>;

	console.log("REF: ", referenceableEntities);
	console.log(
		"Missing: ",
		getMissingEntities(referencedEntities, referenceableEntities.data.data, entityFieldPrefix)
	);
	return (
		<>
			<Box>
				<h4>Referencer for {fieldName}</h4>
				<Box my={2}>
					{referencedEntities.length > 0 ? (
						<Stack direction="row" spacing={1}>
							{referencedEntities.map((reference: any) => (
								<Chip
									key={reference[`${entityFieldPrefix}_id`]}
									label={reference[`${entityFieldPrefix}_name`]}
									onDelete={() => {
										toggleEntityReference(reference);
									}}
								/>
							))}
						</Stack>
					) : (
						<Typography variant="body1">{`No ${fieldName}. selected.`}</Typography>
					)}
				</Box>
				<Box my={2}>
					{getMissingEntities(
						referencedEntities,
						referenceableEntities.data.data,
						entityFieldPrefix
					).length > 0 ? (
						<Stack direction="row" spacing={1}>
							{getMissingEntities(
								referencedEntities,
								referenceableEntities.data.data,
								entityFieldPrefix
							).map((reference: any) => (
								<Chip
									key={reference[`${entityFieldPrefix}_id`]}
									label={reference[`${entityFieldPrefix}_name`]}
									onClick={() => {
										toggleEntityReference(reference);
									}}
									variant="outlined"
								/>
							))}
						</Stack>
					) : (
						<Typography variant="body1">{`You've referenced every ${entityFieldPrefix}, make sure they're all relevant 😉`}</Typography>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Referencer;

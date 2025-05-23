import { useState, useEffect } from "react";
import { Box, Stack, Chip, Typography } from "@mui/material";

import getMissingEntitiesReferencer from "../../../../utils/helperFunctions/getMissingEntitiesReferencer";

interface ReferencerProps {
	fieldName: string;
	entityName: string;
	entityFieldPrefix: string;
	handleExplicitSectionDataChange: any;
	section: any;
	useHook: any;
}

const Referencer = ({
	fieldName,
	entityName,
	entityFieldPrefix,
	handleExplicitSectionDataChange,
	section,
	useHook,
}: ReferencerProps) => {
	const [referencedEntities, setReferencedEntities] = useState(section[fieldName] || []);

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

		setReferencedEntities(currentEntityReferences);
	};

	if (referenceableEntities.isLoading) return <>Loading...</>;

	return (
		<>
			<Box>
				<h4>
					Referencer for {fieldName}, this section is referencing {entityName}.
				</h4>
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
					{getMissingEntitiesReferencer(
						referencedEntities,
						referenceableEntities.data.data,
						entityFieldPrefix
					).length > 0 ? (
						<Stack direction="row" spacing={1}>
							{getMissingEntitiesReferencer(
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

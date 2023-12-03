export default function getMissingEntities(
	referencedEntities: any,
	referenceableEntities: any,
	entityFieldPrefix: string
): any {
	if (!referenceableEntities) return [];

	if (referenceableEntities.length === 0) {
		return []; // Return an empty array if referenceableEntities input array is empty
	}

	const referencedIds = referencedEntities.map(
		(entity: any) => entity[`${entityFieldPrefix}_id`]
	);
	return referenceableEntities.filter(
		(entity: any) => !referencedIds.includes(entity[`${entityFieldPrefix}_id`])
	);
}

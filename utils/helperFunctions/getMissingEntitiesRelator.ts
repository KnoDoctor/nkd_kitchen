export default function getMissingEntitiesRelator(
	relatedEntities: any,
	relatableEntities: any,
	entityFieldPrefix: string,
	relatableEntityName: string
): any {
	if (!relatableEntities) return [];
	if (relatableEntities?.length === 0) {
		return []; // Return an empty array if relatableEntities input array is empty
	}

	const referencedIds = relatedEntities.map(
		(entity: any) => entity[`${relatableEntityName}`][`${entityFieldPrefix}_id`]
	);

	return relatableEntities
		.map((entity: any) => {
			return { [`${relatableEntityName}`]: entity };
		})
		.filter(
			(entity: any) =>
				!referencedIds.includes(entity[`${relatableEntityName}`][`${entityFieldPrefix}_id`])
		);
}

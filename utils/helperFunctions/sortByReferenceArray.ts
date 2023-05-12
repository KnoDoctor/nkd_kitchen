interface Module {
	module_id: string;
	module_name: string;
	module_image: string | null;
	module_slug: string;
}

export default function sortByReferenceArray(
	array: Module[],
	referenceArray: string[],
	key: keyof Module
): Module[] {
	const refIndexMap: Map<string, number> = new Map(
		referenceArray.map((item, index) => [item, index])
	);

	return array.sort((a, b) => {
		const aIndex: number = refIndexMap.get(a[key] as string) || 0;
		const bIndex: number = refIndexMap.get(b[key] as string) || 0;
		return aIndex - bIndex;
	});
}

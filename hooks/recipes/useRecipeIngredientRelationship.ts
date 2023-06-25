import useSWR from "swr";

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	const res = await fetch(input, init);

	// If the status code is not in the range 200-299,
	// we still try to parse and throw it.
	if (!res.ok) {
		const error = new Error(
			`An error occurred while fetching the data. Status Code: ${res.status}.`
		);
		throw error;
	}

	return res.json();
}

export default function useRecipeIngredientRelationship(
	recipe_id: string | string[] | undefined,
	ingredient_id: string | string[] | undefined
) {
	const { data, error, mutate }: any = useSWR(
		`/api/recipes/${recipe_id}/ingredients/${ingredient_id}`,
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		error,
		mutate,
	};
}

export default function sortArrayOfStringsAlphabetically(array: string[]): string[] {
	return array.sort((a, b) => a.localeCompare(b));
}

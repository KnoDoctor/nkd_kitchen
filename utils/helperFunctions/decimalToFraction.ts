function decimalToFraction(decimal: number): string {
	// ASCII fraction characters
	const fractionChars: { [key: number]: string } = {
		0.125: "⅛",
		0.25: "¼",
		0.375: "⅜",
		0.5: "½",
		0.625: "⅝",
		0.75: "¾",
		0.875: "⅞",
	};

	// Separate the integer and fractional parts
	const integerPart: number = Math.floor(decimal);
	const fractionalPart: number = decimal - integerPart;

	// Find the closest eighth to the fractional part
	const closestFraction: number = Math.round(fractionalPart * 8) / 8;
	const fractionStr: string = fractionChars[closestFraction] || "";

	// Combine integer and fractional parts
	if (integerPart === 0 && closestFraction !== 0) {
		return fractionStr;
	} else if (closestFraction === 0) {
		return integerPart.toString();
	} else {
		return `${integerPart} ${fractionStr}`;
	}
}

export default decimalToFraction;
// Example usage
//console.log(decimalToFraction(0.5)); // Output: ½
//console.log(decimalToFraction(2.25)); // Output: 2 ¼

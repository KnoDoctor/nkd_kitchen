const measurementUnits: Record<string, string> = {
	"Teaspoon(s)": "tsp",
	"Tablespoon(s)": "tbsp",
	"Fluid Ounce(s)": "fl oz",
	"Cup(s)": "cup",
	"Pint(s)": "pt",
	"Quart(s)": "qt",
	"Gallon(s)": "gal",
	"Milliliter(s)": "ml",
	"Liter(s)": "l",
	"Pound(s)": "lb",
	"Ounce(s)": "oz",
	"Milligram(s)": "mg",
	"Gram(s)": "g",
	"Kilogram(s)": "kg",
	Pinch: "pinch",
	Smidgen: "smidgen",
	Dash: "dash",
	Touch: "touch",
	Handful: "handful",
	"Stick(s)": "stick",
	"Can(s)": "can",
	"Bottle(s)": "bottle",
	"Slice(s)": "slice",
	"Piece(s)": "piece",
	Whole: "whole",
	Half: "half",
	Dozen: "dozen",
	"Clove(s)": "clove",
	"Sprig(s)": "sprig",
	"Splash(es)": "splash",
};

const getIsoMeasurementShort = (unit: string) => {
	const isoAbbreviation = measurementUnits[unit];
	return isoAbbreviation || unit;
};

export default getIsoMeasurementShort;

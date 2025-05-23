import { v4 as uuidv4 } from "uuid";

// Check if UUID is Valid
export function checkIfGuid(stringToTest: string | string[] | undefined) {
	if (typeof stringToTest != "string") return false;

	if (stringToTest[0] === "{") {
		stringToTest = stringToTest.substring(1, stringToTest.length - 1);
	}
	var regexGuid =
		/^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
	return regexGuid.test(stringToTest);
}

export function generateGuid() {
	return uuidv4();
}

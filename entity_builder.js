const fs = require("fs");
const readline = require("readline");
const path = require("path");

//API
const { buildApiIndexFile } = require("./structure/pages/api/[entity]/index");
const { buildApiIdentifierFile } = require("./structure/pages/api/[entity]/[identifier]");

//Admin
const { buildAdminIndexFile } = require("./structure/pages/admin/[module]/index");
const { buildAdminIdentifierFile } = require("./structure/pages/admin/[module]/[identifier]");

//Frontend
const { buildEntityIndexFile } = require("./structure/pages/[entity]/index");
const { buildEntityIdentifierFile } = require("./structure/pages/[entity]/[...identifier]");

//Hooks
const { buildUseEntityFile } = require("./structure/hooks/[entity]/useEntity");
const { buildUseEntitiesFile } = require("./structure/hooks/[entity]/useEntities");

//Components => Organisms
const {
	buildEntityOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityOrganism");
const {
	buildEntityListOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityListOrganism");
const {
	buildEntityDeletionOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityDeletionOrganism");
const {
	buildEntityCreationOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityCreationOrganism");

//Components => _Molecules
const {
	buildEntityListCardFile,
} = require("./structure/components/_molecules/[entity]/EntityListCard");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const baseDir = "./";

function prompt(question) {
	return new Promise((resolve) => {
		rl.question(question, resolve);
	});
}

async function getUserInput() {
	const uppercasePlural = await prompt("Enter an Uppercase Plural: ");
	const uppercaseSingular = await prompt("Enter an Uppercase Singular: ");
	const lowercasePlural = await prompt("Enter a Lowercase Plural: ");
	const lowercaseSingular = await prompt("Enter a Lowercase Singular: ");
	return {
		uppercasePlural,
		uppercaseSingular,
		lowercasePlural,
		lowercaseSingular,
	};
}

function createDirectory(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
	fs.writeFile(filePath, content, (err) => {
		if (err) throw err;
		console.log("File created with name:", filePath);
	});
}

function createApiFiles(lowercasePlural, params) {
	const apiDir = path.join(baseDir, "pages", "api", lowercasePlural);

	createDirectory(apiDir);

	writeFile(path.join(apiDir, "index.ts"), buildApiIndexFile(params));
	writeFile(path.join(apiDir, "[identifier].ts"), buildApiIdentifierFile(params));
}

function createAdminFiles(lowercasePlural, params) {
	const adminDir = path.join(baseDir, "pages", "admin", "[module]", lowercasePlural);

	createDirectory(adminDir);

	writeFile(path.join(adminDir, "index.tsx"), buildAdminIndexFile(params));
	writeFile(path.join(adminDir, "[identifier].tsx"), buildAdminIdentifierFile(params));
}

function createFrontendFiles(lowercasePlural, params) {
	const frontendDir = path.join(baseDir, "pages", lowercasePlural);

	createDirectory(frontendDir);

	writeFile(path.join(frontendDir, "index.tsx"), buildEntityIndexFile(params));
	writeFile(path.join(frontendDir, "[...identifier].tsx"), buildEntityIdentifierFile(params));
}

function createHooksFiles(lowercasePlural, params) {
	const hooksDir = path.join(baseDir, "hooks", lowercasePlural);

	createDirectory(hooksDir);

	writeFile(path.join(hooksDir, `use${params.uppercaseSingular}.ts`), buildUseEntityFile(params));
	writeFile(path.join(hooksDir, `use${params.uppercasePlural}.ts`), buildUseEntitiesFile(params));
}

function createOrganismFiles(lowercasePlural, params) {
	const organismDir = path.join(baseDir, "components", "organisms", lowercasePlural);

	createDirectory(organismDir);

	writeFile(
		path.join(organismDir, `${params.uppercaseSingular}Organism.tsx`),
		buildEntityOrganismFile(params)
	);
	writeFile(
		path.join(organismDir, `${params.uppercaseSingular}ListOrganism.tsx`),
		buildEntityListOrganismFile(params)
	);
	writeFile(
		path.join(organismDir, `${params.uppercaseSingular}DeletionOrganism.tsx`),
		buildEntityDeletionOrganismFile(params)
	);
	writeFile(
		path.join(organismDir, `${params.uppercaseSingular}CreationOrganism.tsx`),
		buildEntityCreationOrganismFile(params)
	);
}

function createMoleculeFiles(lowercasePlural, params) {
	const moleculesDir = path.join(baseDir, "components", "_molecules", lowercasePlural);

	createDirectory(moleculesDir);

	writeFile(
		path.join(moleculesDir, `${params.uppercaseSingular}ListCard.tsx`),
		buildEntityListCardFile(params)
	);
}

async function main() {
	const userInput = await getUserInput();

	createApiFiles(userInput.lowercasePlural, userInput);
	createAdminFiles(userInput.lowercasePlural, userInput);
	createFrontendFiles(userInput.lowercasePlural, userInput);
	createHooksFiles(userInput.lowercasePlural, userInput);
	createOrganismFiles(userInput.lowercasePlural, userInput);
	createMoleculeFiles(userInput.lowercasePlural, userInput);

	rl.close();
}

main();

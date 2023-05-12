module.exports.buildAdminIdentifierFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import ${uppercaseSingular}Organism from "../../../../components/organisms/${lowercasePlural}/${uppercaseSingular}Organism";

const ${uppercaseSingular} = () => {
	return <${uppercaseSingular}Organism />;
};

export default ${uppercaseSingular};`;
};

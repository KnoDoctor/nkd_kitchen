module.exports.buildAdminIndexFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import ${uppercaseSingular}ListOrganism from "../../../../components/organisms/${lowercasePlural}/${uppercaseSingular}ListOrganism";

const ${uppercaseSingular}List = () => {
	return <${uppercaseSingular}ListOrganism />;
};

export default ${uppercaseSingular}List;`;
};

module.exports.buildEntityIndexFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import Link from "../../components/_atoms/Link";
    import use${uppercasePlural} from "../../hooks/${lowercasePlural}/use${uppercasePlural}";
    
    const ${uppercasePlural} = () => {
        const ${lowercasePlural} = use${uppercasePlural}();
    
        if (${lowercasePlural}.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {${lowercasePlural}.data.data.map((${lowercaseSingular}: any) => (
                        <Link href={\`/${lowercasePlural}/\${${lowercaseSingular}.${lowercaseSingular}_id}\`}>
                            <li>{${lowercaseSingular}.${lowercaseSingular}_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default ${uppercasePlural};`;
};

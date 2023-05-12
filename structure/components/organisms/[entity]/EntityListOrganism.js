module.exports.buildEntityListOrganismFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import { useRouter } from "next/router";

    import { Card, Grid } from "@mui/material";
    
    import Breadcrumbs from "../../_molecules/Breadcrumbs";
    
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    import ${uppercaseSingular}ListCard from "../../_molecules/${lowercasePlural}/${uppercaseSingular}ListCard";
    import ${uppercaseSingular}CreationOrganism from "./${uppercaseSingular}CreationOrganism";
    
    import use${uppercasePlural} from "../../../hooks/${lowercasePlural}/use${uppercasePlural}";
    
    const ${uppercaseSingular}ListOrganism = () => {
        const router = useRouter();
    
        const ${lowercasePlural}Data = use${uppercasePlural}();
    
        console.log(${lowercasePlural}Data);
    
        if (${lowercasePlural}Data.isLoading) {
            return <div>Loading...</div>;
        }
    
        const getHeroImage = (${lowercaseSingular}: any) => {
            return "https://images.unsplash.com/photo-1675127077743-f388e7e37924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
        };
    
        return (
            <div>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            label: returnCurrentModule(router),
                            anchor: \`/admin/\${returnCurrentModule(router)}\`,
                        },
                        {
                            label: \`${uppercasePlural}\`,
                            anchor: null,
                        },
                    ]}
                    actions={[
                        {
                            label: "Add New ${uppercaseSingular}",
                            component: <${uppercaseSingular}CreationOrganism />,
                        },
                    ]}
                />
                <Card sx={{ p: 2, my: 2 }}>
                    <Grid container spacing={3}>
                        {${lowercasePlural}Data?.data?.data?.map((${lowercaseSingular}: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <${uppercaseSingular}ListCard
                                    title={${lowercaseSingular}.${lowercaseSingular}_name}
                                    link={\`/admin/\${returnCurrentModule(router)}/${lowercasePlural}/\${
                                        ${lowercaseSingular}.${lowercaseSingular}_id
                                    }\`}
                                    image={getHeroImage(${lowercaseSingular})}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        );
    };
    
    export default ${uppercaseSingular}ListOrganism;`;
};

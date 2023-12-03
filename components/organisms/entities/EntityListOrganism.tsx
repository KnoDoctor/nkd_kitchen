import { useRouter } from "next/router";

    import { Card, Grid } from "@mui/material";
    
    import Breadcrumbs from "../../_molecules/Breadcrumbs";
    
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    import EntityListCard from "../../_molecules/entities/EntityListCard";
    import EntityCreationOrganism from "./EntityCreationOrganism";
    
    import useEntities from "../../../hooks/entities/useEntities";
    
    const EntityListOrganism = () => {
        const router = useRouter();
    
        const entitiesData = useEntities();
    
        console.log(entitiesData);
    
        if (entitiesData.isLoading) {
            return <div>Loading...</div>;
        }
    
        const getHeroImage = (entity: any) => {
            return "https://images.unsplash.com/photo-1675127077743-f388e7e37924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
        };
    
        return (
            <div>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            label: returnCurrentModule(router),
                            anchor: `/admin/${returnCurrentModule(router)}`,
                        },
                        {
                            label: `Entities`,
                            anchor: null,
                        },
                    ]}
                    actions={[
                        {
                            label: "Add New Entity",
                            component: <EntityCreationOrganism />,
                        },
                    ]}
                />
                <Card sx={{ p: 2, my: 2 }}>
                    <Grid container spacing={3}>
                        {entitiesData?.data?.data?.map((entity: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <EntityListCard
                                    title={entity.entity_name}
                                    link={`/admin/${returnCurrentModule(router)}/entities/${
                                        entity.entity_id
                                    }`}
                                    image={getHeroImage(entity)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        );
    };
    
    export default EntityListOrganism;
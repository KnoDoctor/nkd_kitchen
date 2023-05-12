import { useRouter } from "next/router";

    import { Card, Grid } from "@mui/material";
    
    import Breadcrumbs from "../../_molecules/Breadcrumbs";
    
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    import PersonListCard from "../../_molecules/people/PersonListCard";
    import PersonCreationOrganism from "./PersonCreationOrganism";
    
    import usePeople from "../../../hooks/people/usePeople";
    
    const PersonListOrganism = () => {
        const router = useRouter();
    
        const peopleData = usePeople();
    
        console.log(peopleData);
    
        if (peopleData.isLoading) {
            return <div>Loading...</div>;
        }
    
        const getHeroImage = (person: any) => {
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
                            label: `People`,
                            anchor: null,
                        },
                    ]}
                    actions={[
                        {
                            label: "Add New Person",
                            component: <PersonCreationOrganism />,
                        },
                    ]}
                />
                <Card sx={{ p: 2, my: 2 }}>
                    <Grid container spacing={3}>
                        {peopleData?.data?.data?.map((person: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <PersonListCard
                                    title={person.person_name}
                                    link={`/admin/${returnCurrentModule(router)}/people/${
                                        person.person_id
                                    }`}
                                    image={getHeroImage(person)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        );
    };
    
    export default PersonListOrganism;
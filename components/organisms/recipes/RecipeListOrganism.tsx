import { useRouter } from "next/router";

    import { Card, Grid } from "@mui/material";
    
    import Breadcrumbs from "../../_molecules/Breadcrumbs";
    
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    import RecipeListCard from "../../_molecules/recipes/RecipeListCard";
    import RecipeCreationOrganism from "./RecipeCreationOrganism";
    
    import useRecipes from "../../../hooks/recipes/useRecipes";
    
    const RecipeListOrganism = () => {
        const router = useRouter();
    
        const recipesData = useRecipes();
    
        console.log(recipesData);
    
        if (recipesData.isLoading) {
            return <div>Loading...</div>;
        }
    
        const getHeroImage = (recipe: any) => {
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
                            label: `Recipes`,
                            anchor: null,
                        },
                    ]}
                    actions={[
                        {
                            label: "Add New Recipe",
                            component: <RecipeCreationOrganism />,
                        },
                    ]}
                />
                <Card sx={{ p: 2, my: 2 }}>
                    <Grid container spacing={3}>
                        {recipesData?.data?.data?.map((recipe: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <RecipeListCard
                                    title={recipe.recipe_name}
                                    link={`/admin/${returnCurrentModule(router)}/recipes/${
                                        recipe.recipe_id
                                    }`}
                                    image={getHeroImage(recipe)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        );
    };
    
    export default RecipeListOrganism;
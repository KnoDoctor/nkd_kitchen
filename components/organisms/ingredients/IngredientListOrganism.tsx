import { useRouter } from "next/router";

    import { Card, Grid } from "@mui/material";
    
    import Breadcrumbs from "../../_molecules/Breadcrumbs";
    
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    import IngredientListCard from "../../_molecules/ingredients/IngredientListCard";
    import IngredientCreationOrganism from "./IngredientCreationOrganism";
    
    import useIngredients from "../../../hooks/ingredients/useIngredients";
    
    const IngredientListOrganism = () => {
        const router = useRouter();
    
        const ingredientsData = useIngredients();
    
        console.log(ingredientsData);
    
        if (ingredientsData.isLoading) {
            return <div>Loading...</div>;
        }
    
        const getHeroImage = (ingredient: any) => {
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
                            label: `Ingredients`,
                            anchor: null,
                        },
                    ]}
                    actions={[
                        {
                            label: "Add New Ingredient",
                            component: <IngredientCreationOrganism />,
                        },
                    ]}
                />
                <Card sx={{ p: 2, my: 2 }}>
                    <Grid container spacing={3}>
                        {ingredientsData?.data?.data?.map((ingredient: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <IngredientListCard
                                    title={ingredient.ingredient_name}
                                    link={`/admin/${returnCurrentModule(router)}/ingredients/${
                                        ingredient.ingredient_id
                                    }`}
                                    image={getHeroImage(ingredient)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        );
    };
    
    export default IngredientListOrganism;
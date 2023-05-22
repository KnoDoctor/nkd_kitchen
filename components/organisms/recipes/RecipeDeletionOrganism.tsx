import React, { useState } from "react";
    import { useRouter } from "next/router";
    
    import Button from "@mui/material/Button";
    import Dialog from "@mui/material/Dialog";
    import DialogActions from "@mui/material/DialogActions";
    import DialogContent from "@mui/material/DialogContent";
    import DialogContentText from "@mui/material/DialogContentText";
    import DialogTitle from "@mui/material/DialogTitle";
    import { Box } from "@mui/material";
    import Slide from "@mui/material/Slide";
    import { TransitionProps } from "@mui/material/transitions";
    
    import useRecipes from "../../../hooks/recipes/useRecipes";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const RecipeDeletionOrganism = ({ recipeId, recipeName, open, handleClose }: any) => {
        // const recipes = useRecipes();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [recipeDeleted, setRecipeDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deleteRecipe = async (recipeId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let recipeRes = await fetch(`/api/recipes/${recipeId}`, reqOptions);
                let recipeData = await recipeRes.json();
    
                if (recipeData.success === false) {
                    setErrorMessage("Recipe could not be deleted. Please try again.");
                } else {
                    setRecipeDeleted(true);
                    setSuccessMessage("Recipe sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectRecipe = () => {
            router.push(`/admin/${returnCurrentModule(router)}/recipes`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Recipe</DialogTitle>
                        {recipeDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${recipeName}"?`}
                            </DialogContent>
                        )}
    
                        {recipeDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectRecipe()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deleteRecipe(recipeId)}
                                    variant={"contained"}
                                    size="small"
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        )}
                    </Dialog>
                </Box>
            </>
        );
    };
    
    export default RecipeDeletionOrganism;
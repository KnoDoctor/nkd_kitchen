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
    
    import useIngredients from "../../../hooks/ingredients/useIngredients";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const IngredientDeletionOrganism = ({ ingredientId, ingredientName, open, handleClose }: any) => {
        // const ingredients = useIngredients();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [ingredientDeleted, setIngredientDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deleteIngredient = async (ingredientId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let ingredientRes = await fetch(`/api/ingredients/${ingredientId}`, reqOptions);
                let ingredientData = await ingredientRes.json();
    
                if (ingredientData.success === false) {
                    setErrorMessage("Ingredient could not be deleted. Please try again.");
                } else {
                    setIngredientDeleted(true);
                    setSuccessMessage("Ingredient sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectIngredient = () => {
            router.push(`/admin/${returnCurrentModule(router)}/ingredients`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Ingredient</DialogTitle>
                        {ingredientDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${ingredientName}"?`}
                            </DialogContent>
                        )}
    
                        {ingredientDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectIngredient()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deleteIngredient(ingredientId)}
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
    
    export default IngredientDeletionOrganism;
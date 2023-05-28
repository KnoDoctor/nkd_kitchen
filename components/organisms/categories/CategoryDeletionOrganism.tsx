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
    
    import useCategories from "../../../hooks/categories/useCategories";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const CategoryDeletionOrganism = ({ categoryId, categoryName, open, handleClose }: any) => {
        // const categories = useCategories();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [categoryDeleted, setCategoryDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deleteCategory = async (categoryId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let categoryRes = await fetch(`/api/categories/${categoryId}`, reqOptions);
                let categoryData = await categoryRes.json();
    
                if (categoryData.success === false) {
                    setErrorMessage("Category could not be deleted. Please try again.");
                } else {
                    setCategoryDeleted(true);
                    setSuccessMessage("Category sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectCategory = () => {
            router.push(`/admin/${returnCurrentModule(router)}/categories`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Category</DialogTitle>
                        {categoryDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${categoryName}"?`}
                            </DialogContent>
                        )}
    
                        {categoryDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectCategory()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deleteCategory(categoryId)}
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
    
    export default CategoryDeletionOrganism;
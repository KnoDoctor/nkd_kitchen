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
    
    import useEntities from "../../../hooks/entities/useEntities";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const EntityDeletionOrganism = ({ entityId, entityName, open, handleClose }: any) => {
        // const entities = useEntities();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [entityDeleted, setEntityDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deleteEntity = async (entityId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let entityRes = await fetch(`/api/entities/${entityId}`, reqOptions);
                let entityData = await entityRes.json();
    
                if (entityData.success === false) {
                    setErrorMessage("Entity could not be deleted. Please try again.");
                } else {
                    setEntityDeleted(true);
                    setSuccessMessage("Entity sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectEntity = () => {
            router.push(`/admin/${returnCurrentModule(router)}/entities`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Entity</DialogTitle>
                        {entityDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${entityName}"?`}
                            </DialogContent>
                        )}
    
                        {entityDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectEntity()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deleteEntity(entityId)}
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
    
    export default EntityDeletionOrganism;
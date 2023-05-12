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
    
    import useModules from "../../../hooks/modules/useModules";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const ModuleDeletionOrganism = ({ moduleId, moduleName, open, handleClose }: any) => {
        // const modules = useModules();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [moduleDeleted, setModuleDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deleteModule = async (moduleId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let moduleRes = await fetch(`/api/modules/${moduleId}`, reqOptions);
                let moduleData = await moduleRes.json();
    
                if (moduleData.success === false) {
                    setErrorMessage("Module could not be deleted. Please try again.");
                } else {
                    setModuleDeleted(true);
                    setSuccessMessage("Module sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectModule = () => {
            router.push(`/admin/${returnCurrentModule(router)}/modules`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Module</DialogTitle>
                        {moduleDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${moduleName}"?`}
                            </DialogContent>
                        )}
    
                        {moduleDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectModule()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deleteModule(moduleId)}
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
    
    export default ModuleDeletionOrganism;
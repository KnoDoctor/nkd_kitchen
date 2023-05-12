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
    
    import usePeople from "../../../hooks/people/usePeople";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const PersonDeletionOrganism = ({ personId, personName, open, handleClose }: any) => {
        // const people = usePeople();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [personDeleted, setPersonDeleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const deletePerson = async (personId: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let personRes = await fetch(`/api/people/${personId}`, reqOptions);
                let personData = await personRes.json();
    
                if (personData.success === false) {
                    setErrorMessage("Person could not be deleted. Please try again.");
                } else {
                    setPersonDeleted(true);
                    setSuccessMessage("Person sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirectPerson = () => {
            router.push(`/admin/${returnCurrentModule(router)}/people`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete Person</DialogTitle>
                        {personDeleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : `Are you sure you want to delete "${personName}"?`}
                            </DialogContent>
                        )}
    
                        {personDeleted ? (
                            <DialogActions>
                                <Button onClick={() => redirectPerson()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => deletePerson(personId)}
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
    
    export default PersonDeletionOrganism;
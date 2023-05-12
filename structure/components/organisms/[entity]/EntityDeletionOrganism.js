module.exports.buildEntityDeletionOrganismFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import React, { useState } from "react";
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
    
    import use${uppercasePlural} from "../../../hooks/${lowercasePlural}/use${uppercasePlural}";
    import { returnCurrentModule } from "../../../utils/helperFunctions";
    
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const ${uppercaseSingular}DeletionOrganism = ({ ${lowercaseSingular}Id, ${lowercaseSingular}Name, open, handleClose }: any) => {
        // const ${lowercasePlural} = use${uppercasePlural}();
        const router = useRouter();
    
        const [errorMessage, setErrorMessage] = useState("");
        const [${lowercaseSingular}Deleted, set${uppercaseSingular}Deleted] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");
    
        const delete${uppercaseSingular} = async (${lowercaseSingular}Id: string) => {
            const reqOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            try {
                let ${lowercaseSingular}Res = await fetch(\`/api/${lowercasePlural}/\${${lowercaseSingular}Id}\`, reqOptions);
                let ${lowercaseSingular}Data = await ${lowercaseSingular}Res.json();
    
                if (${lowercaseSingular}Data.success === false) {
                    setErrorMessage("${uppercaseSingular} could not be deleted. Please try again.");
                } else {
                    set${uppercaseSingular}Deleted(true);
                    setSuccessMessage("${uppercaseSingular} sucessfully deleted.");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        const redirect${uppercaseSingular} = () => {
            router.push(\`/admin/\${returnCurrentModule(router)}/${lowercasePlural}\`);
        };
    
        return (
            <>
                <Box component="div" sx={{ mt: 1 }}>
                    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
                        <DialogTitle id="scroll-dialog-title">Delete ${uppercaseSingular}</DialogTitle>
                        {${lowercaseSingular}Deleted && successMessage !== "" ? (
                            <DialogContent dividers={true}>{successMessage}</DialogContent>
                        ) : (
                            <DialogContent dividers={true}>
                                {errorMessage !== ""
                                    ? errorMessage
                                    : \`Are you sure you want to delete "\${${lowercaseSingular}Name}"?\`}
                            </DialogContent>
                        )}
    
                        {${lowercaseSingular}Deleted ? (
                            <DialogActions>
                                <Button onClick={() => redirect${uppercaseSingular}()}>OK</Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => delete${uppercaseSingular}(${lowercaseSingular}Id)}
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
    
    export default ${uppercaseSingular}DeletionOrganism;`;
};

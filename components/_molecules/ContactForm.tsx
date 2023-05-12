import * as React from "react";
import Grid from "@mui/material/Grid";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import Button from "@mui/material/Button";

export default function ComposedTextField() {
    const [firstName, setFirstName] = React.useState("");
    const [isFirstNameError, setIsFirstNameError] = React.useState(false);

    const [lastName, setLastName] = React.useState("");
    const [isLastNameError, setIsLastNameError] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [isEmailError, setIsEmailError] = React.useState(false);

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isPhoneNumberError, setIsPhoneNumberError] = React.useState(false);

    const [message, setMessage] = React.useState("");
    const [isMessageError, setIsMessageError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const isFormValid = () => {
        let isFormValid = true;

        if (firstName.length === 0) {
            setIsFirstNameError(true);
            isFormValid = false;
        } else {
            setIsFirstNameError(false);
        }

        if (lastName.length === 0) {
            setIsLastNameError(true);
            isFormValid = false;
        } else {
            setIsLastNameError(false);
        }

        if (email.length === 0) {
            setIsEmailError(true);
            isFormValid = false;
        } else {
            setIsEmailError(false);
        }

        if (phoneNumber.length === 0) {
            setIsPhoneNumberError(true);
            isFormValid = false;
        } else {
            setIsPhoneNumberError(false);
        }
        if (message.length === 0) {
            setIsMessageError(true);
            isFormValid = false;
        } else {
            setIsMessageError(false);
        }

        return isFormValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            if (!isFormValid()) return;

            const formSubmissionObject = {
                firstName,
                lastName,
                email,
                phoneNumber,
            };

            console.log(formSubmissionObject);

            // const createPersonRes = await fetch(`/api/people`, {
            //     method: "POST",

            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(newPersonObject),
            // });
            // const createPersonData = await createPersonRes.json();

            // if (createPersonData.success) {
            //     // people.mutate();
            //     // handleClose();
            // } else {
            //     console.log("ERROR: ", createPersonData);

            //     setIsError(true);
            //     if (createPersonData.message)
            //         setErrorMessage(`${createPersonData.message}`);
            //     if (createPersonData.error)
            //         setErrorMessage(`API Error: ${createPersonData.error}`);
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid
            container
            spacing={2}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid item xs={12} md={6}>
                <FormControl error={isFirstNameError} fullWidth>
                    <InputLabel htmlFor="component-error">
                        First Name*
                    </InputLabel>
                    <OutlinedInput
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        label="First Name*"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                    />
                    {isFirstNameError && (
                        <FormHelperText id="component-error-text">
                            Please enter your first name
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl error={isLastNameError} fullWidth>
                    <InputLabel htmlFor="component-error">
                        Last Name*
                    </InputLabel>
                    <OutlinedInput
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        label="Last Name*"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                    />
                    {isLastNameError && (
                        <FormHelperText id="component-error-text">
                            Please enter your last name
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl error={isEmailError} fullWidth>
                    <InputLabel htmlFor="component-error">Email</InputLabel>
                    <OutlinedInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        id="email"
                        name="email"
                        autoComplete="email"
                    />
                    {isEmailError && (
                        <FormHelperText id="component-error-text">
                            Please enter a valid email address
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl error={isPhoneNumberError} fullWidth>
                    <InputLabel htmlFor="component-error">
                        Phone Number
                    </InputLabel>
                    <OutlinedInput
                        id="phone-number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        label="Phone Number"
                    />
                    {isPhoneNumberError && (
                        <FormHelperText id="component-error-text">
                            Please enter your pnhone number
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl error={isMessageError} fullWidth>
                    <InputLabel htmlFor="component-error">Message</InputLabel>
                    <OutlinedInput
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        label="Message"
                        rows={4}
                        multiline
                    />
                    {isMessageError && (
                        <FormHelperText id="component-error-text">
                            {`Please enter a brief description of what you'd like
                            to talk about :)`}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "right" }}
            >
                <Button type="submit" variant={"contained"} size="small">
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}

import React from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import Container from '@mui/material/Container';

import styles from '../../styles/IFrameModal.module.css';

interface IFrameModalProps {
    source?: string;
    handleClick(close: boolean): void;
    isOpen: boolean;
    fullScreen: boolean;
    background?: boolean;
    backgroundColor?: string;
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

/*
WARNING:
    The function below must exists outside the IframeModal function otherwise
    once the user closes the modal the layer of the transition will still be sitting
    on top of the parent node and therefore not allow you to click on anything.
*/
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IFrameModal = ({
    source,
    handleClick,
    isOpen,
    fullScreen,
    background,
    backgroundColor,
    children
}: IFrameModalProps) => {
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={() => handleClick(false)}
                TransitionComponent={Transition}
                // disableBackdropClick
            >
                <CloseIcon onClick={() => handleClick(false)} className={styles.close__icon} />
                {source ? (
                    <iframe src={source} className={styles.iFrame}></iframe>
                ) : (
                    <Container maxWidth={'md'} sx={{ pt: 5, pb: 5, bgcolor: backgroundColor, height: '100vh' }}>
                        {children}
                    </Container>
                )}
            </Dialog>
        </div>
    );
};

export default IFrameModal;

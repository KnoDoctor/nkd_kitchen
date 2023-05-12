import React from 'react';
import MUIButton from '@mui/lab/LoadingButton';

import { styled } from '@mui/material/styles';

interface Button {
    style?: any;
    sx?: any;
    href?: any;
    onClick?: any;
    variant?: any;
    color?: any;
    size?: any;
    disabled?: any;
    loadingSettings?: any;
    iconSettings?: any;
    children?: any;
}

const Button = ({
    href,
    sx,
    onClick,
    variant,
    color,
    size,
    disabled,
    loadingSettings,
    iconSettings,
    children
}: Button) => {
    const StyledButton = styled(MUIButton)(() => ({
        padding: '6px 12px',
        '&:hover': {
            boxShadow: '1px 4px 5px #797979',
            background: sx?.bgcolor ? sx.bgcolor : '#494949'
        }
    }));

    return (
        <StyledButton
            //  style={{ margin: '1rem 0', width: '100%' }}
            sx={sx}
            href={href}
            onClick={onClick}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            {...loadingSettings}
            {...iconSettings}>
            {children}
        </StyledButton>
    );
};

export default Button;

////Props

// href={`#`}
// onClick={handleClick}
// variant="contained"
// color="primary"
// size="small"
// disabled={false}
// loadingSettings={{
//     loading,
//     loadingIndicator: "Loading...",
// }}
// iconSettings={{
//     startIcon: <SaveIcon />,
//     endIcon: <SendIcon />,
//     loadingPosition: "end",
// }}

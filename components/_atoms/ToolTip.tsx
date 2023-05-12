import React, { useState } from 'react';

import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from '../../styles/ToolTip.module.css';

interface ToolTipProps {
    title: string;
}

const ToolTip = ({ title }: ToolTipProps) => {
    const theme = useTheme();
    const mobileWidth = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            {mobileWidth ? (
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            placement="bottom"
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={title}>
                            <HelpIcon className={styles.tool__tip} onClick={handleTooltipOpen} />
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            ) : (
                <Tooltip title={title} placement={'right-start'} style={{ textTransform: 'none' }}>
                    <HelpIcon className={styles.tool__tip} />
                </Tooltip>
            )}
        </div>
    );
};

export default ToolTip;

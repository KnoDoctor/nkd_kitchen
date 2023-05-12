import React from "react";

import Box from "@mui/material/Box";

import { motion } from "framer-motion";

interface SlideInProps {
    delaySlideIn?: number;
    children: React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
    >;
}

const SlideIn = ({ delaySlideIn, children }: SlideInProps) => {
    const delay = delaySlideIn || 0;
    return (
        <Box
            component={motion.div}
            initial={{
                y: 50,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.7,
                    delay,
                    type: "spring",
                    bounce: 0.3,
                },
            }}
            sx={{ width: "100%" }}
        >
            {children}
        </Box>
    );
};

export default SlideIn;

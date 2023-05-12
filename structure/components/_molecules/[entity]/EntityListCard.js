module.exports.buildEntityListCardFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import Image from "next/image";
import { useRouter } from "next/router";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { styled } from "@mui/material/styles";

import Link from "../../_atoms/Link";

const Subtitle = styled(Typography)(() => ({
    textTransform: "uppercase",
    fontWeight: 300,
    textAlign: "left",
    color: "#fff",
    fontSize: "12px",
    marginBottom: 0,
}));

interface ${uppercaseSingular}ListCardProps {
    title: string;
    image: string;
    link: string;
}

const ${uppercaseSingular}ListCard = ({ title, image, link }: ${uppercaseSingular}ListCardProps) => {
    const router = useRouter();

    const routerLink = (link: string | undefined) => {
        if (!link) return;
        return router.push(link);
    };

    return (
        <Link href={link} sx={{ textDecoration: "none" }}>
            <ButtonBase focusRipple style={{ width: "100%" }}>
                <Paper
                    elevation={6}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "225px",
                        overflow: "hidden",
                        margin: "auto",
                    }}
                >
                    <Image
                        alt={\`\${title} + Image\`}
                        src={image ? image : "/images/placeholder.png"}
                        layout="fill"
                        objectFit="cover"
                        blurDataURL={\`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWw8AAd8BLiy87+IAAAAASUVORK5CYII=\`}
                        placeholder="blur"
                    ></Image>

                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            position: "absolute",
                            zIndex: 2,
                            bottom: 0,
                            width: "100%",
                            height: "40%",
                            background: "rgb(0 0 0 / 70%)",
                            padding: "5px 10% 10%",
                            color: "white",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 300,
                                fontSize: "18px",
                                textAlign: "left",
                                textTransform: "uppercase",
                                marginTop: "auto",
                                color: "#fff",
                            }}
                        >
                            {title}
                        </Typography>
                        {/* <div
                            style={{
                                borderBottom: "1px solid #fff",
                                marginBottom: "8px",
                            }}
                        ></div> */}
                    </Box>
                </Paper>
            </ButtonBase>
        </Link>
    );
};

export default ${uppercaseSingular}ListCard;`;
};

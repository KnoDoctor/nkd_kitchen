import { useState, useEffect, useCallback } from "react";
import styles from "../../../../styles/HeroBanner.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import useEmblaCarousel from "embla-carousel-react";

import useMediaQuery from "@mui/material/useMediaQuery";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DotButton = ({ selected, onClick }: any) => (
	<button
		className={styles.embla__dot + `${selected ? ` ${styles["is-selected"]}` : ""}`}
		type="button"
		onClick={onClick}
	/>
);

interface HeroBannerImageVideoCarouselProps {
	slides: {
		title: string;
		subtitle: string;
		textColor: string;
		buttonColor: string;
		buttonLink: string;
		buttonTextColor: string;
		buttonText: string;
		contentAlignment: string;
		heroBannerType: string;
		imageUrl: string;
		videoUrl: string;
	}[];
}

const HeroBanner = ({ slides }: HeroBannerImageVideoCarouselProps) => {
	console.log(slides);

	//Set media query
	const mobileWidth = useMediaQuery("(max-width:900px)");
	const forceCenterAlignment = useMediaQuery("(max-width:500px)");

	const [isMusicMuted, setIsMusicMuted] = useState(true);

	const videoPlayerSettings = {
		playing: true,
		muted: isMusicMuted,
		loop: true,
		controls: false,
		volume: 0.5,
	};

	const [viewportRef, embla] = useEmblaCarousel({
		loop: true,
		skipSnaps: false,
	});
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<any>([]);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
	const scrollTo = useCallback((index: any) => embla && embla.scrollTo(index), [embla]);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, [embla, setSelectedIndex]);

	useEffect(() => {
		if (!embla) return;
		onSelect();
		setScrollSnaps(embla.scrollSnapList());
		embla.on("select", onSelect);
	}, [embla, setScrollSnaps, onSelect]);

	const renderContentAlignment = (slide: any) => {
		if (forceCenterAlignment) {
			return (
				<div
					style={{
						position: "absolute",
						top: "25%",
						textAlign: "center",
						width: "100%",
						textShadow: "1px 1px 2px #494949",
						zIndex: 99,
						padding: "0px 15px",
					}}
				>
					<Typography
						variant="h2"
						component="h2"
						style={{
							textTransform: "uppercase",
							fontSize: "24px",
							fontWeight: 300,
							color: slide.textColor,
						}}
					>
						{slide.title}
					</Typography>
					<Typography
						variant="h1"
						component="h3"
						style={{
							textTransform: "none",
							fontSize: "14px",
							fontWeight: 300,
							color: slide.textColor,
							fontStyle: "italic",
						}}
					>
						{slide.subtitle}
					</Typography>
					{slide.buttonLink ? (
						<Link href={slide.buttonLink}>
							<Button
								size="small"
								style={{
									color: slide.buttonTextColor,
									background: slide.buttonColor,
									marginTop: mobileWidth ? 10 : 30,
									fontSize: mobileWidth ? "11px" : "14px",
								}}
							>
								<span>{slide.buttonText}</span>
							</Button>
						</Link>
					) : (
						<></>
					)}
				</div>
			);
		}

		switch (slide.contentAlignment) {
			case "Center":
				return (
					<div
						style={{
							position: "absolute",
							top: "40vh",
							textAlign: "center",
							width: "100%",
							textShadow: "1px 1px 2px #494949",
							zIndex: 99,
							padding: "0px 15px",
						}}
					>
						<Typography
							variant="h2"
							component="h2"
							style={{
								textTransform: "uppercase",
								fontSize: mobileWidth ? "30px" : "60px",
								fontWeight: 300,
								color: slide.textColor,
							}}
						>
							{slide.title}
						</Typography>
						<Typography
							variant="h1"
							component="h3"
							style={{
								textTransform: "none",
								fontSize: mobileWidth ? "17px" : "30px",
								fontWeight: 300,
								color: slide.textColor,
								fontStyle: "italic",
							}}
						>
							{slide.subtitle}
						</Typography>
						{slide.buttonLink ? (
							<Link href={slide.buttonLink}>
								<Button
									size="small"
									style={{
										color: slide.buttonTextColor,
										background: slide.buttonColor,
										marginTop: mobileWidth ? 10 : 30,
										fontSize: mobileWidth ? "11px" : "14px",
									}}
								>
									<span>{slide.buttonText}</span>
								</Button>
							</Link>
						) : (
							<></>
						)}
					</div>
				);
			case "Left":
				return (
					<div
						style={
							mobileWidth
								? {
										position: "absolute",
										top: "55%",
										left: "10px",
										width: "100%",
										textShadow: "1px 1px 2px #494949",
										zIndex: 1,
										padding: "0px 15px",
								  }
								: {
										position: "absolute",
										top: "70%",
										left: "4%",
										width: "100%",
										textShadow: "1px 1px 2px #494949",
										zIndex: 1,
										padding: "0px 15px",
								  }
						}
					>
						<Typography
							variant="h2"
							component="h2"
							style={{
								textTransform: "uppercase",
								fontSize: mobileWidth ? "30px" : "60px",
								fontWeight: 300,
								color: slide.textColor,
							}}
						>
							{slide.title}
						</Typography>
						<Typography
							variant="h1"
							component="h3"
							style={{
								textTransform: "none",
								fontSize: mobileWidth ? "17px" : "30px",
								fontWeight: 300,
								color: slide.textColor,
								fontStyle: "italic",
							}}
						>
							{slide.subtitle}
						</Typography>
						{slide.buttonLink ? (
							<Link href={slide.buttonLink}>
								<Button
									size="small"
									style={{
										color: slide.buttonTextColor,
										background: slide.buttonColor,
										marginTop: mobileWidth ? 10 : 30,
										fontSize: mobileWidth ? "11px" : "14px",
									}}
								>
									<span>{slide.buttonText}</span>
								</Button>
							</Link>
						) : (
							<></>
						)}
					</div>
				);
			case "Right":
				return (
					<div
						style={
							mobileWidth
								? {
										position: "absolute",
										top: "55%",
										right: "10px",
										width: "100%",
										textShadow: "1px 1px 2px #494949",
										zIndex: 1,
										padding: "0px 15px",
										textAlign: "right",
								  }
								: {
										position: "absolute",
										top: "60%",
										right: "4%",
										width: "100%",
										textShadow: "1px 1px 2px #494949",
										zIndex: 1,
										padding: "0px 15px",
										textAlign: "right",
								  }
						}
					>
						<Typography
							variant="h2"
							component="h2"
							style={{
								textTransform: "uppercase",
								fontSize: mobileWidth ? "30px" : "60px",
								fontWeight: 300,
								color: slide.textColor,
							}}
						>
							{slide.title}
						</Typography>
						<Typography
							variant="h1"
							component="h3"
							style={{
								textTransform: "none",
								fontSize: mobileWidth ? "17px" : "30px",
								fontWeight: 300,
								color: slide.textColor,
								fontStyle: "italic",
							}}
						>
							{slide.subtitle}
						</Typography>
						{slide.buttonLink ? (
							<Link href={slide.buttonLink}>
								<Button
									size="small"
									style={{
										color: slide.buttonTextColor,
										background: slide.buttonColor,
										marginTop: mobileWidth ? 10 : 30,
										fontSize: mobileWidth ? "11px" : "14px",
									}}
								>
									<span>{slide.buttonText}</span>
								</Button>
							</Link>
						) : (
							<></>
						)}
					</div>
				);
			default:
				return <></>;
		}
	};

	const renderHeroBannerImage = (slide: any, index: any) =>
		slide ? (
			<div
				key={index}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "100%",
						// maxHeight: mobileWidth ? "50vh" : "100vh",
					}}
				>
					<div
						style={{
							width: "100%",
							overflow: "hidden",
							maxHeight: "100vh",
							height: "100%",
							top: 0,
							aspectRatio: "16/9",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img
							src={slide.imageUrl}
							style={{
								width: "100%",
							}}
						/>
					</div>

					{slide.title || slide.subtitle || slide.buttonText ? (
						renderContentAlignment(slide)
					) : (
						<></>
					)}
				</div>
				<div
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.4)",
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 0,
					}}
				></div>
			</div>
		) : (
			<></>
		);

	const renderVideoPlayer = (slide: any, index: any) => (
		<div
			style={{
				position: "relative",
				width: "100%",
				maxHeight: "100vh",
				overflow: "hidden",
			}}
			className={styles.hero__video__container}
			key={index}
		>
			{slide ? (
				<ReactPlayer
					{...videoPlayerSettings}
					url={slide.videoUrl}
					className={styles.hero__video + " hero-video"}
				/>
			) : (
				<></>
			)}

			{slide.title || slide.subtitle || slide.buttonText ? (
				renderContentAlignment(slide)
			) : (
				<></>
			)}
			<div
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.4)",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex: 0,
				}}
			></div>
		</div>
	);

	return (
		<>
			<div className={styles.embla}>
				<div className={styles.embla__viewport} ref={viewportRef}>
					<div className={styles.embla__container}>
						{slides.map((slide: any, index: any) => (
							<div className={styles.embla__slide} key={index}>
								<div className={styles.embla__slide__inner}>
									{slide.heroBannerType === "Video"
										? renderVideoPlayer(slide, index)
										: renderHeroBannerImage(slide, index)}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.embla__dots}>
					{scrollSnaps.map((_: any, index: any) => (
						<DotButton
							key={index}
							selected={index === selectedIndex}
							onClick={() => scrollTo(index)}
						/>
					))}
				</div>
				{/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
			</div>
		</>
	);
};

export default HeroBanner;

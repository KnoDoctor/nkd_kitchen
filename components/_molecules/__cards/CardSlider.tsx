import { useState, useEffect, useCallback } from "react";
import styles from "../../../styles/CardSlider.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import useMediaQuery from "@mui/material/useMediaQuery";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ArticleCard from "./ArticleCard";

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
	}[];
}

const CardSlider = ({ slides }: HeroBannerImageVideoCarouselProps) => {
	const wheelGestures = WheelGesturesPlugin();

	//Set media query
	const mobileWidth = useMediaQuery("(max-width:900px)");
	const forceCenterAlignment = useMediaQuery("(max-width:500px)");

	const [viewportRef, embla] = useEmblaCarousel(
		{
			skipSnaps: false,
			dragFree: true,
			containScroll: "trimSnaps",
		},
		[wheelGestures]
	);
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

	return (
		<>
			<div className={styles.embla}>
				<div className={styles.embla__viewport} ref={viewportRef}>
					<div className={styles.embla__container}>
						{slides.map((slide: any, index: any) => (
							<div className={styles.embla__slide} key={index}>
								<ArticleCard />
							</div>
						))}
					</div>
				</div>
				{/* <div className={styles.embla__dots}>
					{scrollSnaps.map((_: any, index: any) => (
						<DotButton
							key={index}
							selected={index === selectedIndex}
							onClick={() => scrollTo(index)}
						/>
					))}
				</div> */}
				{/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
			</div>
		</>
	);
};

export default CardSlider;

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { PrevButton, NextButton, DotButton } from "../cells/CardSliderNavigation";

import styles from "../../styles/EmblaCardSlider.module.css";

interface ImageSliderProps {
	slides: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
	bgColor?: string;
}

const ImageSlider = ({ slides, bgColor }: ImageSliderProps) => {
	const [viewportRef, embla] = useEmblaCarousel({
		dragFree: false,
		containScroll: "trimSnaps",
	});

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<any>([]);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
	const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

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
		<div className={styles.embla} style={{ height: "100%" }}>
			<div className={styles.embla__viewport} style={{ height: "100%" }} ref={viewportRef}>
				<div className={styles.embla__container} style={{ height: "100%" }}>
					{slides.map((slide, i) => {
						return (
							<div className={styles.embla__slide__fullwidth} key={i}>
								<div
									className={styles.embla__slide__inner__fullwidth}
									style={{ backgroundColor: bgColor ? bgColor : "none" }}
								>
									{slide}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<NextButton enabled={true} onClick={scrollNext} />
			<PrevButton enabled={true} onClick={scrollPrev} />
			{slides.length > 1 ? (
				<div className={styles.embla__dots + " image__slider"}>
					{scrollSnaps.map((_: any, index: any) => (
						<DotButton
							key={index}
							selected={index === selectedIndex}
							onClick={() => scrollTo(index)}
						/>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ImageSlider;

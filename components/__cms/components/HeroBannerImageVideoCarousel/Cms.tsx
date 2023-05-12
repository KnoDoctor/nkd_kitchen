import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";

//Import CMS Blocks
// import RadioGroupCmsBlock from "../blocks/RadioGroupCmsBlock";
// import HeroImageCarouselCmsBlock from "../blocks/HeroImageCarouselCmsBlock";
// import VideoHeroBannerCmsBlock from "../blocks/VideoHeroBannerCmsBlock";
import TextCmsBlock from "../../_inputs/TextCmsBlock";
import HeroBannerImageVideoCarouselCmsBlock from "../../_inputs/HeroBannerImageVideoCarouselCmsBlock";

//Import Helper Functions
import { generateGuid } from "../../../../utils/uuids";

interface SectionHeroBannerCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const SectionHeroBannerImageVideoCarouselCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: SectionHeroBannerCmsProps) => {
	const [heroBannerSlides, setHeroBannerSlides] = useState(section?.heroBannerSlides || []);

	const addSlide = () => {
		let updatedHeroBannerSlides = [...heroBannerSlides];
		updatedHeroBannerSlides.push({
			slideId: generateGuid(),
			title: "",
			subtitle: "",
			textColor: "",
			buttonColor: "",
			buttonLink: "",
			buttonTextColor: "",
			buttonText: "",
			contentAlignment: "Centered",
			heroBannerType: "Image",
			imageUrl: "",
			videoUrl: "",
			videoCoverImageUrl: "",
		});

		setHeroBannerSlides(updatedHeroBannerSlides);
	};

	const deleteSlide = (slideId: string) => {
		let updatedHeroBannerSlides = [...heroBannerSlides];
		updatedHeroBannerSlides = updatedHeroBannerSlides.filter(
			(slide) => slide.slideId !== slideId
		);

		setHeroBannerSlides(updatedHeroBannerSlides);
	};

	const updateSlide = (slideId: string, fieldName: string, value: string) => {
		let updatedHeroBannerSlides = [...heroBannerSlides];

		//Find index of matching slide in slides array to be updated
		const index = updatedHeroBannerSlides.findIndex((slide) => {
			return slide.slideId === slideId;
		});

		updatedHeroBannerSlides[index][fieldName] = value;

		setHeroBannerSlides(updatedHeroBannerSlides);
	};

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName: "heroBannerSlides",
				value: heroBannerSlides,
			},
			section
		);
	}, [heroBannerSlides]);

	return (
		<div>
			<TextCmsBlock
				section={section}
				// handleSectionDataChange={handleSectionDataChange}
				handleExplicitSectionDataChange={handleExplicitSectionDataChange}
				fieldName={"sectionTitle"}
				value={section.sectionTitle}
			/>

			<HeroBannerImageVideoCarouselCmsBlock
				slidesArray={heroBannerSlides}
				deleteSlide={deleteSlide}
				updateSlide={updateSlide}
			/>

			<div style={{ textAlign: "right", marginTop: "30px" }}>
				<Button onClick={() => addSlide()} style={{ background: "#194666", color: "#fff" }}>
					Add Slide
				</Button>
			</div>
		</div>
	);
};

export default SectionHeroBannerImageVideoCarouselCms;

import React from "react";

//Import Page Components
import HeroBannerImageVideoCarousel from "./components/HeroBannerImageVideoCarousel/Component";
import HeroBanner from "../cells/HeroBanner";
import FullWidthImage from "./components/FullWidthImage/Component";
import Paragraph from "./components/ParagraphWithHeadings/Component";
import Quote from "./components/Quote/Component";
import TwoColumnImage from "./components/TwoColumnImage/Component";
import ImageLeftTextRight from "./components/ImageLeftTextRight/Component";
import ImageRightTextLeft from "./components/ImageRightTextLeft/Component";
import JeffsFirstComponent from "./components/JeffsFirstComponent/Component";
import { Box } from "@mui/material";

// import Video from "./Video";

interface RenderComponentsProps {
	cmsData: any;
}

const RenderComponents = ({ cmsData }: RenderComponentsProps) => {
	console.log("RENDER: ", cmsData);

	if (!cmsData) {
		return <div style={{ paddingTop: 100 }}>Loading...</div>;
	}

	const renderComponents = (section: any) => {
		switch (section.sectionName) {
			case "heroBannerImageVideoCarousel":
				return <HeroBannerImageVideoCarousel slides={section.heroBannerSlides} />;
			case "quote":
				return (
					<Quote
						quote={section.quote}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);
			case "paragraphWithHeadings":
				return (
					<Paragraph
						headingsAlignment={section.headingsAlignment}
						headline={section.headline}
						headlineLink={section.headlineLink}
						subheading={section.subheading}
						subheadingLink={section.subheadingLink}
						specialHeading={section.specialHeading}
						specialHeadingLink={section.specialHeadingLink}
						content={section.content}
						ctaButtonLink={section.ctaButtonLink}
						ctaButtonText={section.ctaButtonText}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionButtonColor={section.sectionButtonColor}
						sectionButtonFontColor={section.sectionButtonFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);

			case "twoColumnImage":
				return (
					<TwoColumnImage
						image1={section.image1}
						image1Caption={section.image1Caption}
						image2={section.image2}
						image2Caption={section.image2Caption}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);
			case "fullWidthImage":
				return (
					<FullWidthImage
						heroBannerSlides={section.heroBannerSlides}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);
			case "imageLeftTextRight":
				return (
					<ImageLeftTextRight
						image={section.imageLeft}
						title={section.title}
						subtitle={section.subtitle}
						content={section.content}
						fixedTextContent={section.fixedTextContent}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);
			case "imageRightTextLeft":
				return (
					<ImageRightTextLeft
						image={section.imageRight}
						title={section.title}
						subtitle={section.subtitle}
						content={section.content}
						fixedTextContent={section.fixedTextContent}
						colorSettings={section.colorSettings}
						sectionBackgroundColor={section.sectionBackgroundColor}
						sectionFontColor={section.sectionFontColor}
						sectionAnchor={section.sectionAnchor}
					/>
				);
			case "jeffsFirstComponent":
				return <JeffsFirstComponent section={section} />;
			default:
				return <></>;
		}
	};

	return (
		<>
			{cmsData ? (
				cmsData.map((section: any) => {
					return (
						<Box id={section.sectionId} key={section.sectionId}>
							{renderComponents(section)}
						</Box>
					);
				})
			) : (
				<>
					<p>No sections</p>
				</>
			)}
		</>
	);
};

export default RenderComponents;

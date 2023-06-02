import { useReducer, useEffect } from "react";

import { generateGuid } from "../../utils/uuids";

import { CmsReducer } from "../../reducers/CmsReducer";

import {
	Container,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Button,
	IconButton,
	Typography,
	Divider,
} from "@mui/material";

import {
	ChevronLeft,
	ChevronRight,
	ArrowUpward,
	ArrowDownward,
	DeleteForever,
	Save,
	Delete,
	Edit,
	Preview,
} from "@mui/icons-material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

//Import CMS Components
import HeroBannerImageVideoCarousel from "./components/HeroBannerImageVideoCarousel/Cms";
import ParagraphWithHeadingsCms from "./components/ParagraphWithHeadings/Cms";
import ImageLeftTextRightCms from "./components/ImageLeftTextRight/Cms";
import ImageRightTextLeftCms from "./components/ImageRightTextLeft/Cms";
import QuoteCms from "./components/Quote/Cms";
import TwoColumnImageCms from "./components/TwoColumnImage/Cms";
import FullWidthImageCms from "./components/FullWidthImage/Cms";
import JeffsFirstComponentCms from "./components/JeffsFirstComponent/Cms";
import CategorySectionCms from "./components/CategorySection/Cms";
import RecipeSectionCms from "./components/RecipeSection/Cms";

import { scrollToTarget } from "../../utils/helperFunctions";
import PageDeletionOrganism from "../organisms/pages/PageDeletionOrganism";

import RenderComponents from "./RenderComponents";

interface RenderCmsProps {
	cmsData: {
		data: {
			data: {
				cms_data: {}[];
			};
			success: boolean;
		};
		isLoading: boolean;
		error: boolean;
		mutate(): void;
	};
	updateCmsData: any;
}

const SectionsButton = styled(Button)(() => ({
	background: "#194666",
	color: "#fff",
	marginLeft: 15,
	width: "25%",
	"&:hover": {
		background: "#194666",
		color: "#fff",
	},
	"&.MuiButton-root.Mui-disabled": {
		background: "#9e9e9e",
	},
}));

const SectionsSelector = styled("div")(() => ({
	position: "sticky",
	// top: 64,
	width: "100%",
	zIndex: 99,
	marginBottom: "1rem",
}));

const ArrowNav = styled("div")(() => ({
	position: "absolute",
	top: 5,
	color: "#fff",
	left: "0px",
	"&:hover": {
		cursor: "pointer",
	},
}));

const SectionContainer = styled("div")(() => ({
	borderRadius: 8,
	border: "1px solid #e0e0e0",
	padding: "30px 40px 5px 40px",
	marginBottom: 25,
}));

const AnchorNavMenu = styled("div")(() => ({
	position: "sticky",
	top: 205,
	left: -50,
	width: "100%",
	zIndex: 99,
	background: "#194666",
	color: "#fff",
	borderEndEndRadius: 8,
	borderStartEndRadius: 8,
	marginTop: 25,
	overflowY: "auto",
	"& li:hover": {
		cursor: "pointer",
	},
}));

const RenderCms = ({ cmsData, updateCmsData }: RenderCmsProps) => {
	const theme = useTheme();
	const smallWidth = useMediaQuery(theme.breakpoints.down("sm"));
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	let initialState = {
		updatedCmsData: null,
		isLoading: true,
		selectedSection: null,
		sectionId: null,
		isAnchorNavExpanded: false,
		displayNavContent: false,
		isDeleteModalOpen: false,
		isPreview: false,
	};

	const [cmsReducerData, dispatchCmsReducerData] = useReducer(CmsReducer, initialState);

	useEffect(() => {
		if (!cmsReducerData.updatedCmsData) {
			dispatchCmsReducerData({
				type: "SET_UPDATED_CMS_DATA",
				payload: cmsData.data.data,
			});
		}
	}, [cmsData.data.data]);

	const handleClose = () => {
		dispatchCmsReducerData({
			type: "SET_IS_DELETE_MODAL_OPEN",
			payload: false,
		});
	};

	const addSection = (sectionName: string) => {
		let updatedValue = { ...cmsReducerData.updatedCmsData };

		updatedValue.cms_data.push({
			sectionName,
			sectionId: generateGuid(),
		});

		dispatchCmsReducerData({
			type: "SET_UPDATED_CMS_DATA",
			payload: updatedValue,
		});
	};

	const removeSection = (sectionId: string) => {
		let updatedValue = { ...cmsReducerData.updatedCmsData };
		updatedValue.cms_data = updatedValue.cms_data.filter(
			(section: any) => section.sectionId !== sectionId
		);

		dispatchCmsReducerData({
			type: "SET_UPDATED_CMS_DATA",
			payload: updatedValue,
		});
	};

	const reorderSections = (sectionToMove: any, moveTo: any) => {
		let updatedValue = { ...cmsReducerData.updatedCmsData };

		let numberOfDeletedElm = 1;

		const elm = updatedValue.cms_data.splice(sectionToMove, numberOfDeletedElm)[0];

		numberOfDeletedElm = 0;

		updatedValue.cms_data.splice(moveTo, numberOfDeletedElm, elm);

		dispatchCmsReducerData({
			type: "SET_UPDATED_CMS_DATA",
			payload: updatedValue,
		});
	};

	const handleSectionChange = (event: any) => {
		dispatchCmsReducerData({
			type: "SET_SELECTED_SECTION",
			payload: event.target.value,
		});
	};

	const handleSectionDataChange = (event: any, section: any) => {
		let updatedSectionValue = { ...section };
		updatedSectionValue[event.target.id] = event.target.value;

		let updatedValue = { ...cmsReducerData.updatedCmsData };

		//Find index of matching section in sections array to be updated
		const index = updatedValue.cms_data.findIndex((section: any) => {
			return section.sectionId === updatedSectionValue.sectionId;
		});

		updatedValue.cms_data[index] = updatedSectionValue;

		dispatchCmsReducerData({
			type: "SET_UPDATED_CMS_DATA",
			payload: updatedValue,
		});

		updateCmsData(updatedValue);
	};

	const handleExplicitSectionDataChange = (updateObject: any, section: any) => {
		let updatedSectionValue = { ...section };
		updatedSectionValue[updateObject.fieldName] = updateObject.value;

		let updatedValue = { ...cmsReducerData.updatedCmsData };

		//Find index of matching section in sections array to be updated
		const index = updatedValue.cms_data.findIndex((section: any) => {
			return section.sectionId === updatedSectionValue.sectionId;
		});

		updatedValue.cms_data[index] = updatedSectionValue;

		dispatchCmsReducerData({
			type: "SET_UPDATED_CMS_DATA",
			payload: updatedValue,
		});

		updateCmsData(updatedValue);
	};

	const sectionTypes = [
		{
			sectionFieldName: "heroBannerImageVideoCarousel",
			sectionLabel: "Hero Banner Image or Video",
		},
		{
			sectionFieldName: "paragraphWithHeadings",
			sectionLabel: "Paragraph With Headings",
		},
		{
			sectionFieldName: "imageLeftTextRight",
			sectionLabel: "Image Left Text Right",
		},
		{
			sectionFieldName: "imageRightTextLeft",
			sectionLabel: "Image Right Text Left ",
		},
		{
			sectionFieldName: "twoColumnImage",
			sectionLabel: "Two Column Image",
		},
		{
			sectionFieldName: "fullWidthImage",
			sectionLabel: "Full Width Image",
		},
		{
			sectionFieldName: "quote",
			sectionLabel: "Quote",
		},
		{
			sectionFieldName: "jeffsFirstComponent",
			sectionLabel: "Jeff's First Component",
		},
		{
			sectionFieldName: "categorySection",
			sectionLabel: "Category Section",
		},
		{
			sectionFieldName: "recipeSection",
			sectionLabel: "Recipe Section",
		},
	];

	const renderSectionCms = (section: any) => {
		switch (section.sectionName) {
			case "heroBannerImageVideoCarousel":
				return (
					<HeroBannerImageVideoCarousel
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "paragraphWithHeadings":
				return (
					<ParagraphWithHeadingsCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "imageLeftTextRight":
				return (
					<ImageLeftTextRightCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "imageRightTextLeft":
				return (
					<ImageRightTextLeftCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "twoColumnImage":
				return (
					<TwoColumnImageCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "fullWidthImage":
				return (
					<FullWidthImageCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "quote":
				return (
					<QuoteCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "jeffsFirstComponent":
				return (
					<JeffsFirstComponentCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "categorySection":
				return (
					<CategorySectionCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);
			case "recipeSection":
				return (
					<RecipeSectionCms
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				);

			default:
				return <div>No CMS available for section "{section.sectionName}"</div>;
		}
	};

	return cmsData.isLoading ? (
		<div>Loading CMS...</div>
	) : (
		<>
			{/* Map over and render CMS Fields */}
			<div style={{ position: "relative" }}>
				{/* SECTIONS ANCHOR NAV */}

				<div
					style={{
						position: "absolute",
						width:
							smallWidth && cmsReducerData.isAnchorNavExpanded
								? "600px"
								: cmsReducerData.isAnchorNavExpanded
								? "600px"
								: 45,
						height: "100%",
						transition: "all 0.2s ease",
						left: -16,
					}}
				>
					<AnchorNavMenu
						className={"sections-anchor-nav"}
						style={{
							height: cmsReducerData.isAnchorNavExpanded ? "auto" : 90,
							padding: smallWidth ? "5px  22px" : "15px 22px",
							maxHeight: smallWidth ? 370 : 550,
						}}
					>
						{cmsReducerData.isAnchorNavExpanded ? (
							<></>
						) : (
							<ArrowNav>
								<ChevronRight
									onClick={() => {
										dispatchCmsReducerData({
											type: "IS_ANCHOR_NAV_EXPANDED",
											payload: true,
										});
										setTimeout(() => {
											dispatchCmsReducerData({
												type: "DISPLAY_NAV_CONTENT",
												payload: true,
											});
										}, 200);
									}}
									style={{
										width: 30,
										height: 30,
									}}
								/>
							</ArrowNav>
						)}

						{cmsReducerData.displayNavContent ? (
							<>
								<SectionsSelector>
									<Paper
										elevation={0}
										style={{
											padding: "1rem",
										}}
									>
										<ArrowNav>
											<ChevronLeft
												onClick={() => {
													dispatchCmsReducerData({
														type: "IS_ANCHOR_NAV_EXPANDED",
														payload: false,
													});

													dispatchCmsReducerData({
														type: "DISPLAY_NAV_CONTENT",
														payload: false,
													});
												}}
												style={{
													width: 30,
													height: 30,
													color: "#2e4663",
												}}
											/>
										</ArrowNav>
										<IconButton
											sx={{
												color: "#2e4663",
												position: "absolute",
												left: 0,
												top: 40,
											}}
											onClick={() => {
												dispatchCmsReducerData({
													type: "SET_IS_PREVIEW",
													payload: !cmsReducerData.isPreview,
												});
											}}
										>
											{cmsReducerData.isPreview ? <Edit /> : <Preview />}
										</IconButton>
										<Container maxWidth={"md"} style={{ display: "flex" }}>
											<FormControl style={{ width: "75%" }}>
												<InputLabel>Select a layout...</InputLabel>
												<Select
													value={cmsReducerData.selectedSection}
													onChange={handleSectionChange}
													name="section"
													style={{ width: "100%" }}
													label="Select a layout..."
												>
													{sectionTypes.map((sectionType) => {
														return (
															<MenuItem
																value={sectionType.sectionFieldName}
															>
																{sectionType.sectionLabel}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
											<SectionsButton
												onClick={() =>
													addSection(cmsReducerData.selectedSection)
												}
												disabled={
													cmsReducerData.selectedSection ? false : true
												}
											>
												Add Section
											</SectionsButton>
										</Container>
									</Paper>
								</SectionsSelector>
								<Typography
									variant="body1"
									sx={{
										color: "#fff",
										mb: 0,
									}}
								>
									SECTIONS
								</Typography>
								<ul
									style={{
										paddingLeft: smallWidth ? 0 : 10,
										overflowWrap: "break-word",
									}}
								>
									{cmsReducerData.updatedCmsData?.cms_data ? (
										cmsReducerData.updatedCmsData.cms_data.map(
											(section: any, i: any) => {
												return (
													<a
														key={i}
														onClick={() => {
															scrollToTarget(
																section.sectionId,
																mobileWidth,
																-65
															);
															dispatchCmsReducerData({
																type: "SET_SECTION_ID",
																payload: section.sectionId,
															});
														}}
													>
														<li
															style={{
																padding: "3px 0px",
																fontSize: 15,
																color: "#fff",
																textDecoration:
																	section.sectionId ===
																	cmsReducerData.sectionId
																		? "underline"
																		: "none",
															}}
														>
															{section.sectionTitle
																? section.sectionTitle
																: section.sectionName}
														</li>
													</a>
												);
											}
										)
									) : (
										<></>
									)}
								</ul>
							</>
						) : (
							<></>
						)}
						{cmsReducerData.displayNavContent ? (
							<></>
						) : (
							<IconButton
								sx={{ color: "#fff", position: "absolute", left: 0, top: 50 }}
								onClick={() => {
									dispatchCmsReducerData({
										type: "SET_IS_PREVIEW",
										payload: !cmsReducerData.isPreview,
									});
								}}
							>
								{cmsReducerData.isPreview ? <Edit /> : <Preview />}
							</IconButton>
						)}
					</AnchorNavMenu>
				</div>

				<Container maxWidth={"md"} style={{ paddingBottom: 40, paddingTop: 25 }}>
					{cmsReducerData.isPreview ? (
						<RenderComponents cmsData={cmsReducerData.updatedCmsData?.cms_data} />
					) : (
						<>
							{cmsReducerData.updatedCmsData?.cms_data ? (
								cmsReducerData.updatedCmsData.cms_data.map(
									(section: any, i: any) => {
										return (
											<SectionContainer id={section.sectionId} key={i}>
												<Grid
													container
													sx={{
														position: "sticky",
														top: "60px",
														backgroundColor: "white",
														zIndex: 9,
														minHeight: "75px",
														padding: "1rem 0 0 0",
													}}
												>
													<Grid item xs={9}>
														<Typography
															variant="h4"
															sx={{
																margin: 0,
																color: "#194666",
																textDecoration: "underline",
															}}
														>
															{section.sectionTitle
																? section.sectionTitle
																: section.sectionName}
														</Typography>
													</Grid>
													<Grid
														item
														xs={3}
														style={{
															display: "flex",
															justifyContent: "right",
														}}
													>
														<IconButton
															aria-label="up"
															size="small"
															onClick={() => {
																reorderSections(i, i - 1);
															}}
															disabled={i === 0}
														>
															<ArrowUpward fontSize="inherit" />
														</IconButton>
														<IconButton
															aria-label="down"
															size="small"
															onClick={() => {
																reorderSections(i, i + 1);
															}}
															disabled={
																i ===
																cmsReducerData.updatedCmsData
																	.cms_data.length -
																	1
															}
														>
															<ArrowDownward fontSize="inherit" />
														</IconButton>
														<IconButton
															aria-label="delete"
															size="small"
															onClick={() =>
																removeSection(section.sectionId)
															}
														>
															<DeleteForever fontSize="inherit" />
														</IconButton>
													</Grid>
												</Grid>

												<div
													style={{
														marginBottom: 40,
													}}
												>
													{renderSectionCms(section)}
												</div>
											</SectionContainer>
										);
									}
								)
							) : (
								<></>
							)}
						</>
					)}
				</Container>

				{/* <PageDeletionOrganism
					pageId={cmsReducerData?.updatedCmsData?.page_id}
					pageName={cmsReducerData?.updatedCmsData?.page_name}
					open={cmsReducerData.isDeleteModalOpen}
					handleClose={handleClose}
				/> */}
			</div>
		</>
	);
};

export default RenderCms;

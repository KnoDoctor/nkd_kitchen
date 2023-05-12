import React, { useState, useEffect } from "react";

import { SketchPicker } from "react-color";

interface ColorPickerCmsBlockProps {
	section: any;
	fieldName: string;
	value: string;
	handleExplicitSectionDataChange: any;
}

const ColorPickerCmsBlock = ({
	section,
	fieldName,
	value,
	handleExplicitSectionDataChange,
}: ColorPickerCmsBlockProps) => {
	const [blockPickerColor, setBlockPickerColor] = useState(value);

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: blockPickerColor,
			},
			section
		);
	}, [blockPickerColor]);

	return (
		<div>
			<h4>{fieldName}</h4>
			<SketchPicker
				onChange={(color: any) => {
					setBlockPickerColor(color.hex);
				}}
				color={blockPickerColor}
			/>
		</div>
	);
};

export default ColorPickerCmsBlock;

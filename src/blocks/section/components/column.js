const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, BlockControls, InspectorControls, ColorPalette } =
	wp.blockEditor || wp.editor;
const { PanelBody, SelectControl, RangeControl } = wp.components;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

import icon from "../icons";

registerBlockType("ub/section-column", {
	title: __("Column"),
	parent: __("ub/section"),
	icon: icon,
	category: "ultimateblocks",
	supports: {
		inserter: false,
		reusable: false,
	},
	attributes: {
		position: {
			type: "number",
			default: -1,
		},
		backgroundColor: {
			type: "string",
			default: "transparent",
		},
		blockID: {
			type: "string",
			default: "",
		},
		borderColor: {
			type: "string",
			default: "#000000",
		},
		borderStyle: {
			type: "string",
			default: "solid",
		},
		borderSize: {
			type: "number",
			default: 0,
		},
		borderRadius: {
			type: "number",
			default: 0,
		},
	},
	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock } = select("core/block-editor") || select("core/editor");

			return {
				block: getBlock(ownProps.clientId),
			};
		}),
		withDispatch((dispatch) => {
			const { updateBlockAttributes } =
				dispatch("core/block-editor") || dispatch("core/editor");

			return {
				updateBlockAttributes,
			};
		}),
	])(function (props) {
		const {
			attributes: {
				backgroundColor,
				blockID,
				borderSize,
				borderColor,
				borderStyle,
				borderRadius,
			},
			setAttributes,
			block,
		} = props;

		if (blockID === "") {
			setAttributes({ blockID: block.clientId });
		}

		return [
			<InspectorControls>
				<PanelBody>
					<p>{__("Column Background Color")}</p>
					<ColorPalette
						value={backgroundColor}
						onChange={(backgroundColor) => setAttributes({ backgroundColor })}
					/>
				</PanelBody>
				<PanelBody title={__("Column Border")}>
					<p>{__("Border Color")}</p>
					<ColorPalette
						value={borderColor}
						onChange={(borderColor) => setAttributes({ borderColor })}
					/>
					<p>{__("Border Style")}</p>
					<SelectControl
						className="ub-button-grid-selector"
						value={borderStyle}
						options={[
							"none",
							"solid",
							"dotted",
							"dashed",
							"double",
							"groove",
							"ridge",
							"inset",
							"outset",
						].map((a) => ({ label: __(a), value: a }))}
						onChange={(borderStyle) => setAttributes({ borderStyle })}
					/>
					<RangeControl
						label={__("Border Size")}
						value={borderSize}
						onChange={(borderSize) => setAttributes({ borderSize })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__("Border Radius")}
						value={borderRadius}
						onChange={(borderRadius) => setAttributes({ borderRadius })}
						min={0}
						max={200}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className="ub-section-column">
				<InnerBlocks templateLock={false} />
			</div>,
		];
	}),
	save: (_) => <InnerBlocks.Content />,
});

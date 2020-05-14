const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, BlockControls, InspectorControls, ColorPalette } =
	wp.blockEditor || wp.editor;
const { PanelBody } = wp.components;
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
			attributes: { backgroundColor, blockID },
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
			</InspectorControls>,
			<div className="ub-section-column">
				<InnerBlocks templateLock={false} />
			</div>,
		];
	}),
	save: (_) => <InnerBlocks.Content />,
});

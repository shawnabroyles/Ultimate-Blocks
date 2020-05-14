const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.blockEditor || wp.editor;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

import icon from "./icons";
import { SelectionScreen, Container } from "./components/main";

registerBlockType("ub/section", {
	title: __("Section"),
	description: __("Section"),
	icon: icon,
	category: "ultimateblocks",
	keywords: [__("Section"), __("Row"), __("Ultimate Blocks")],
	attributes: {
		blockID: {
			type: "string",
			default: "",
		},
		columnCount: {
			type: "number",
			default: 0,
		},
		columnWidths: {
			type: "array",
			default: [], //array of numbers, as percentage of total width
		},
	},
	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock, getSelectedBlockClientId } =
				select("core/block-editor") || select("core/editor");

			return {
				block: getBlock(ownProps.clientId),
				getSelectedBlockClientId,
			};
		}),
		withDispatch((dispatch) => {
			const { updateBlockAttributes, insertBlock } =
				dispatch("core/block-editor") || dispatch("core/editor");

			return {
				updateBlockAttributes,
				insertBlock,
			};
		}),
	])(function (props) {
		const {
			setAttributes,
			attributes: { columnCount, columnWidths, blockID },
			block,
			insertBlock,
		} = props;

		if (blockID === "") {
			setAttributes({ blockID: block.clientId });
		}

		return (
			<div id={`ub-section-${block.clientId}`}>
				{columnWidths.length > 0 ? (
					<Container {...props} />
				) : (
					<SelectionScreen
						columnCount={columnCount}
						updateColumnCount={(columnCount) => setAttributes({ columnCount })}
						setColumnWidths={(columnWidths) => {
							setAttributes({ columnWidths });
							columnWidths.forEach((_, i) => {
								insertBlock(
									createBlock("ub/section-column", {
										position: i,
									}),
									i,
									block.clientId
								);
							});
						}}
					/>
				)}
			</div>
		);
	}),
	save: (_) => <InnerBlocks.Content />,
});

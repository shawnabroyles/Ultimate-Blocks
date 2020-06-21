const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.blockEditor || wp.editor;
const { withSelect, withDispatch } = wp.data;
const { ButtonGroup, Button, Tooltip, Icon, PanelBody } = wp.components;
const { compose, withState } = wp.compose;

import icon, {
	twoRows,
	twoCols,
	threeRows,
	wideFirstRow,
	wideLastRow,
	threeCols,
	fourRows,
	quadrants,
	fourCols,
	fiveRows,
	fiveCols,
	sixRows,
	sixCols,
} from "./icons";
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
		tabletLayout: {
			type: "string",
			default: "",
		},
		mobileLayout: {
			type: "string",
			default: "",
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
		withState({ displayMode: "tablet" }),
	])(function (props) {
		const {
			setAttributes,
			attributes: {
				columnCount,
				columnWidths,
				blockID,
				tabletLayout,
				mobileLayout,
			},
			block,
			insertBlock,
			isSelected,
			displayMode,
			setState,
		} = props;

		if (blockID === "") {
			setAttributes({ blockID: block.clientId });
		}

		let displayModes = [];

		switch (columnWidths.length) {
			default:
				displayModes = [];
				break;
			case 2:
				displayModes = [
					{ name: "rows", icon: twoRows },
					{ name: "columns", icon: twoCols },
				];
				break;
			case 3:
				displayModes = [
					{ name: "rows", icon: threeRows },
					{ name: "wide first row", icon: wideFirstRow },
					{ name: "wide last row", icon: wideLastRow },
					{ name: "columns", icon: threeCols },
				];
				break;
			case 4:
				displayModes = [
					{ name: "rows", icon: fourRows },
					{ name: "quadrants", icon: quadrants },
					{ name: "columns", icon: fourCols },
				];
				break;
			case 5:
				displayModes = [
					{ name: "rows", icon: fiveRows },
					{ name: "columns", icon: fiveCols },
				];
				break;
			case 6:
				displayModes = [
					{ name: "rows", icon: sixRows },
					{ name: "columns", icon: sixCols },
				];
				break;
		}

		return [
			isSelected && columnWidths.length > 1 && (
				<InspectorControls>
					<PanelBody>
						<ButtonGroup>
							<Tooltip text={__("Tablet")}>
								<Button
									isPrimary={displayMode === "tablet"}
									onClick={(_) => setState({ displayMode: "tablet" })}
								>
									<Icon icon="tablet" />
								</Button>
							</Tooltip>
							<Tooltip text={__("Mobile")}>
								<Button
									isPrimary={displayMode === "mobile"}
									onClick={(_) => setState({ displayMode: "mobile" })}
								>
									<Icon icon="smartphone" />
								</Button>
							</Tooltip>
						</ButtonGroup>
						<p>{__("Layout")}</p>
						<div className="ub-section-display-modes">
							{displayModes.map((d) => (
								<div
									className={
										(displayMode === "tablet" && tabletLayout == d.name) ||
										(displayMode === "mobile" && mobileLayout == d.name)
											? "ub-section-selected-layout"
											: ""
									}
									onClick={(_) =>
										setAttributes(
											displayMode === "tablet"
												? {
														tabletLayout: tabletLayout === d.name ? "" : d.name,
												  }
												: {
														mobileLayout: mobileLayout === d.name ? "" : d.name,
												  }
										)
									}
								>
									{d.icon}
								</div>
							))}
						</div>
					</PanelBody>
				</InspectorControls>
			),
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
			</div>,
		];
	}),
	save: (_) => <InnerBlocks.Content />,
});

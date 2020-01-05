/**
 * BLOCK: Section
 */

// Import icon.
import icons from "./icons/icons";

// Import style
import "./style.scss";
import "./editor.scss";

// Import attributes
import attributes from "./attributes";

// Import Inspector and Editor
import Inspector from "./inspector";
import SectionEditor from "./editor";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor || wp.editor;

export default registerBlockType("ub/section", {
	title: __("Section", "ultimate-blocks"),
	description: __("Section", "ultimate-blocks"),
	icon: icons.menuIcon,
	category: "ultimateblocks",
	keywords: [
		__("section", "ultimate-blocks"),
		__("row", "ultimate-blocks"),
		__("Ultimate Blocks", "ultimate-blocks")
	],
	attributes,
	getEditWrapperProps({ wrapAlignment }) {
		if (
			"full" === wrapAlignment ||
			"wide" === wrapAlignment ||
			"center" === wrapAlignment
		) {
			return { "data-align": wrapAlignment };
		}
	},
	edit: withSelect((select, ownProps) => ({
		block: (select("core/block-editor") || select("core/editor")).getBlock(
			ownProps.clientId
		)
	}))(props => {
		const {
			block: { clientId }
		} = props;

		props.setAttributes({ blockID: clientId });
		return (
			<Fragment>
				<Inspector {...props} />
				<SectionEditor {...props} />
			</Fragment>
		);
	}),
	save: () => <InnerBlocks.Content />
});

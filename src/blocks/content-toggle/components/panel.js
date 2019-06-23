import '../style.scss';
import '../editor.scss';
import icon from '../icons/icon';

import { panel_version_1_1_9, panel_version_2_0_0 } from '../oldVersions';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { RichText, InnerBlocks } = wp.editor;

const { withState, compose } = wp.compose;

const { withDispatch, withSelect } = wp.data;

const attributes = {
	index: {
		type: 'number',
		default: 0
	},
	theme: {
		type: 'text',
		default: '#f63d3d'
	},
	collapsed: {
		type: 'boolean',
		default: false
	},
	titleColor: {
		type: 'string',
		default: '#ffffff'
	},
	panelTitle: {
		type: 'string',
		default: ''
	},
	newBlockPosition: {
		type: 'string',
		default: 'none' //changes into above/below depending on which button is clicked
	}
};

registerBlockType('ub/content-toggle-panel', {
	title: __('Content Toggle Panel'),
	parent: ['ub/content-toggle'],
	icon: icon,
	category: 'ultimateblocks',
	attributes,
	supports: {
		inserter: false,
		reusable: false
	},

	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock, getBlockRootClientId } = select('core/editor');
			const { clientId } = ownProps;

			return {
				block: getBlock(clientId),
				blockParentId: getBlockRootClientId(clientId)
			};
		}),
		withDispatch(dispatch => {
			const {
				updateBlockAttributes,
				removeBlock,
				selectBlock
			} = dispatch('core/editor');

			return { updateBlockAttributes, removeBlock, selectBlock };
		}),
		withState({ showPanel: true })
	])(function(props) {
		const {
			setState,
			setAttributes,
			removeBlock,
			showPanel,
			blockParentId,
			selectBlock
		} = props;
		const { theme, titleColor, panelTitle } = props.attributes;
		return (
			<div
				className="wp-block-ub-content-toggle-accordion"
				style={{ borderColor: theme }}
			>
				<div
					className="wp-block-ub-content-toggle-accordion-title-wrap"
					style={{ backgroundColor: theme }}
				>
					<RichText
						tagName="span"
						style={{ color: titleColor }}
						className="wp-block-ub-content-toggle-accordion-title"
						value={panelTitle}
						formattingControls={['bold', 'italic']}
						onChange={value => setAttributes({ panelTitle: value })}
						placeholder={__('Panel Title')}
						keepPlaceholderOnFocus={true}
						unstableOnFocus={() => selectBlock(blockParentId)}
					/>
					<span
						onClick={() => {
							setState({ showPanel: !showPanel });
						}}
						className={
							'wp-block-ub-content-toggle-accordion-state-indicator dashicons dashicons-arrow-right-alt2 ' +
							(showPanel ? 'open' : '')
						}
					/>
				</div>
				{showPanel && (
					<div className="wp-block-ub-content-toggle-accordion-content-wrap">
						<InnerBlocks templateLock={false} />
					</div>
				)}
				<div className="wp-block-ub-content-toggle-accordion-controls-top">
					<span
						title={__('Insert New Toggle Above')}
						onClick={() =>
							setAttributes({ newBlockPosition: 'above' })
						}
						className="dashicons dashicons-plus-alt"
					/>
					<span
						title={__('Delete This Toggle')}
						onClick={() => removeBlock(props.block.clientId)}
						class="dashicons dashicons-dismiss"
					/>
				</div>
				<div className="wp-block-ub-content-toggle-accordion-controls-bottom">
					<span
						title={__('Insert New Toggle Below')}
						onClick={() =>
							setAttributes({ newBlockPosition: 'below' })
						}
						className="dashicons dashicons-plus-alt"
					/>
				</div>
			</div>
		);
	}),
	save() {
		return <InnerBlocks.Content />;
	},

	deprecated: [
		{
			attributes,
			save: panel_version_1_1_9
		},
		{
			attributes,
			save: panel_version_2_0_0
		}
	]
});

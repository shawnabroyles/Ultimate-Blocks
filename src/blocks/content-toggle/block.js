/**
 * BLOCK: Content Toggle
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//Import Icon
import icon from './icons/icon';

//  Import CSS.
import './style.scss';
import './editor.scss';
import Inspector from './components/inspector';
import { Component } from 'react';

import { version_1_1_2 } from './oldVersions';

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { InnerBlocks } = wp.editor;

const attributes = {
	accordions: {
		source: 'query',
		selector: '.wp-block-ub-content-toggle-accordion',
		query: {
			title: {
				type: 'array',
				source: 'children',
				selector: '.wp-block-ub-content-toggle-accordion-title'
			},
			content: {
				type: 'array',
				source: 'children',
				selector: '.wp-block-ub-content-toggle-accordion-content'
			}
		}
	},
	accordionsState: {
		type: 'string',
		default: '[]'
	},
	timestamp: {
		type: 'number',
		default: 0
	},
	activeControl: {
		type: 'string',
		default: ''
	},
	theme: {
		type: 'string',
		default: '#f63d3d'
	},
	collapsed: {
		type: 'boolean',
		default: false
	},
	titleColor: {
		type: 'string',
		default: '#ffffff'
	}
};

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

class PanelContent extends Component {
	constructor(props) {
		super(props);
		this.getPanels = this.getPanels.bind(this);
		this.getPanelTemplate = this.getPanelTemplate.bind(this);
	}
	getPanels() {
		return this.props.block.innerBlocks;
	}
	getPanelTemplate() {
		const panelData = this.getPanels();
		let result = [];

		panelData.forEach(() => {
			result.push(['ub/content-toggle-panel']);
		});

		return JSON.stringify(result) === '[]'
			? [['ub/content-toggle-panel']]
			: result;
	}
	render() {
		const {
			attributes,
			setAttributes,
			className,
			isSelected,
			updateBlockAttributes,
			oldArrangement,
			setState,
			insertBlock,
			removeBlock
		} = this.props;
		if (!attributes.accordions) {
			attributes.accordions = [];
		}

		const panels = this.getPanels();

		const newArrangement = JSON.stringify(
			panels.map(panel => panel.attributes.index)
		);

		const newBlockTarget = panels.filter(
			panel => panel.attributes.newBlockPosition !== 'none'
		);

		if (JSON.stringify(newBlockTarget) !== '[]') {
			const { index, newBlockPosition } = newBlockTarget[0].attributes;
			insertBlock(
				createBlock('ub/content-toggle-panel'),
				newBlockPosition === 'below' ? index + 1 : index,
				this.props.block.clientId
			);
			updateBlockAttributes(newBlockTarget[0].clientId, {
				newBlockPosition: 'none'
			});
		}

		if (newArrangement !== oldArrangement) {
			if (oldArrangement === '[0]' && newArrangement === '[]') {
				removeBlock(this.props.block.clientId);
			} else {
				panels.forEach((panel, i) =>
					updateBlockAttributes(panel.clientId, {
						index: i,
						parent: this.props.block.clientId
					})
				);
				setState({ oldArrangement: newArrangement });
			}
		}
		const onThemeChange = value => {
			setAttributes({ theme: value });

			panels.forEach(panel =>
				updateBlockAttributes(panel.clientId, { theme: value })
			);
		};

		const onTitleColorChange = value => {
			setAttributes({ titleColor: value });

			panels.forEach(panel =>
				updateBlockAttributes(panel.clientId, { titleColor: value })
			);
		};

		const onCollapseChange = () => {
			setAttributes({ collapsed: !attributes.collapsed });

			panels.forEach(panel =>
				updateBlockAttributes(panel.clientId, {
					collapsed: !panel.attributes.collapsed
				})
			);
		};

		return [
			isSelected && (
				<Inspector
					{...{
						attributes,
						onThemeChange,
						onCollapseChange,
						onTitleColorChange
					}}
				/>
			),
			<div className={className}>
				<InnerBlocks
					template={this.getPanelTemplate()}
					templateLock={'insert'} //allows rearrangement of panels
					allowedBlocks={['ub/content-toggle-panel']}
				/>
			</div>
		];
	}
}

registerBlockType('ub/content-toggle', {
	title: __('Content Toggle'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [
		__('Content Accordion'),
		__('Toggle Collapse'),
		__('Ultimate Blocks')
	],

	attributes,

	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock, isBlockSelected, hasSelectedInnerBlock } = select(
				'core/editor'
			);

			const { clientId } = ownProps;

			return {
				block: getBlock(clientId),
				isSelectedBlockInRoot:
					isBlockSelected(clientId) ||
					hasSelectedInnerBlock(clientId, true)
			};
		}),
		withDispatch(dispatch => {
			const {
				updateBlockAttributes,
				insertBlock,
				removeBlock
			} = dispatch('core/editor');

			return {
				updateBlockAttributes,
				insertBlock,
				removeBlock
			};
		}),
		withState({ oldArrangement: 'Replace this with a proper JSON string' })
	])(PanelContent),

	save(props) {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated: [
		{
			attributes,
			save: version_1_1_2
		}
	]
});

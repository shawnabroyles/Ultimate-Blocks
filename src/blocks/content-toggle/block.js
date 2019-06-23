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
import { richTextToHTML } from '../../common';
import { version_1_1_2 } from './oldVersions';

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { InnerBlocks } = wp.editor;

const attributes = {
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

const oldAttributes = Object.assign(attributes, {
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
	}
});

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
	}
	getPanels() {
		return this.props.block.innerBlocks;
	}
	render() {
		const {
			attributes,
			setAttributes,
			className,
			isSelected,
			updateBlockAttributes,
			oldArrangement,
			mainBlockSelected,
			setState,
			selectBlock,
			insertBlock,
			removeBlock,
			selectedBlock,
			parentOfSelectedBlock,
			block
		} = this.props;

		const { collapsed, theme, titleColor } = attributes;

		const panels = this.getPanels();

		const newArrangement = JSON.stringify(
			panels.map(panel => panel.attributes.index)
		);

		const newBlockTarget = panels.filter(
			panel => panel.attributes.newBlockPosition !== 'none'
		);

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
			setAttributes({ collapsed: !collapsed });
			panels.forEach(panel =>
				updateBlockAttributes(panel.clientId, {
					collapsed: !panel.attributes.collapsed
				})
			);
		};

		//Detect if one of the child blocks has received a command to add another child block
		if (JSON.stringify(newBlockTarget) !== '[]') {
			const { index, newBlockPosition } = newBlockTarget[0].attributes;
			insertBlock(
				createBlock('ub/content-toggle-panel', {
					theme: theme,
					collapsed: collapsed,
					titleColor: titleColor
				}),
				newBlockPosition === 'below' ? index + 1 : index,
				block.clientId
			);
			updateBlockAttributes(newBlockTarget[0].clientId, {
				newBlockPosition: 'none'
			});
		}

		//Fix indexes in case of rearrangments

		if (newArrangement !== oldArrangement) {
			if (oldArrangement === '[0]' && newArrangement === '[]') {
				removeBlock(block.clientId);
			} else {
				panels.forEach((panel, i) =>
					updateBlockAttributes(panel.clientId, {
						index: i,
						parent: block.clientId
					})
				);
				setState({ oldArrangement: newArrangement });
			}
		} else if (mainBlockSelected) {
			const childBlocks = this.getPanels()
				.filter(block => block.name === 'ub/content-toggle-panel')
				.map(panels => panels.clientId);
			if (
				selectedBlock !== block.clientId &&
				childBlocks.includes(selectedBlock)
			) {
				setState({ mainBlockSelected: false });
			}
		} else {
			selectBlock(parentOfSelectedBlock);
			setState({ mainBlockSelected: true });
		}

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
					template={[['ub/content-toggle-panel']]} //initial content
					templateLock={false}
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
			const {
				getBlock,
				getSelectedBlockClientId,
				getBlockRootClientId
			} = select('core/editor');

			const { clientId } = ownProps;

			return {
				block: getBlock(clientId),
				selectedBlock: getSelectedBlockClientId(),
				parentOfSelectedBlock: getBlockRootClientId(
					getSelectedBlockClientId()
				)
			};
		}),
		withDispatch(dispatch => {
			const {
				updateBlockAttributes,
				insertBlock,
				removeBlock,
				selectBlock
			} = dispatch('core/editor');

			return {
				updateBlockAttributes,
				insertBlock,
				removeBlock,
				selectBlock
			};
		}),
		withState({ oldArrangement: '', mainBlockSelected: true })
	])(PanelContent),

	save() {
		return <InnerBlocks.Content />;
	},
	deprecated: [
		{
			//this entry should be first
			attributes: oldAttributes,
			save: () => (
				<div>
					<InnerBlocks.Content />
				</div>
			)
		},
		{
			attributes: oldAttributes,
			migrate: attributes => {
				const {
					accordions,
					accordionsState,
					timestamp,
					activeControl,
					...otherProps
				} = attributes;
				return [
					otherProps,
					accordions.map(a => {
						let panelContent = [];
						a.content.forEach((paragraph, i) => {
							if (typeof paragraph === 'string') {
								panelContent.push(
									createBlock('core/paragraph', {
										content: paragraph
									})
								);
							} else if (paragraph.type === 'br') {
								if (a.content[i - 1].type === 'br') {
									panelContent.push(
										createBlock('core/paragraph')
									);
								}
							} else {
								panelContent.push(
									createBlock('core/paragraph', {
										content: richTextToHTML(paragraph)
									})
								);
							}
						});

						return createBlock(
							'ub/content-toggle-panel',
							{
								theme: attributes.theme,
								titleColor: attributes.titleColor,
								collapsed: attributes.collapsed,
								panelTitle: a.title
									.map(aa =>
										typeof aa == 'string'
											? aa
											: richTextToHTML(aa)
									)
									.join('')
							},
							panelContent
						);
					})
				];
			},
			save: version_1_1_2
		}
	]
});

import './style.scss';
import './editor.scss';
import icon, { addAbove, addBelow } from './icons/icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { RichText, InnerBlocks } = wp.editor;

const { withState, compose } = wp.compose;

const { withDispatch, withSelect } = wp.data;
const { IconButton, Icon } = wp.components;

registerBlockType('ub/content-toggle-panel', {
	title: __('Content Toggle Panel'),
	parent: ['ub/content-toggle'],
	icon: icon,
	category: 'ultimateblocks',
	attributes: {
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
			type: 'text',
			default: 'Panel Title'
		},
		parent: {
			type: 'text',
			default: ''
		},
		newBlockPosition: {
			type: 'text',
			default: 'none' //changes into above/below depending on which button is clicked
		}
	},
	supports: {
		inserter: false,
		reusable: false
	},

	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock } = select('core/editor');
			const { clientId } = ownProps;

			return {
				block: getBlock(clientId)
			};
		}),
		withDispatch(dispatch => {
			const { updateBlockAttributes, removeBlock } = dispatch(
				'core/editor'
			);

			return { updateBlockAttributes, removeBlock };
		}),
		withState({ showPanel: true })
	])(function(props) {
		const { setState, setAttributes, removeBlock, showPanel } = props;
		const { theme, titleColor, panelTitle, index } = props.attributes;
		return (
			<div
				className="wp-block-ub-content-toggle-accordion"
				style={{ borderColor: theme }}
			>
				<IconButton
					className="ub-content-toggle-accordion-button-add-above"
					icon={addAbove}
					onClick={() => {
						console.log(`Insert new block at #${index}`);
						setAttributes({ newBlockPosition: 'above' });
					}}
				/>
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
						placeholder={__('Toggle Title Here')}
						keepPlaceholderOnFocus={true}
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
					<span
						className="wp-block-ub-content-toggle-accordion-delete dashicons dashicons-no-alt"
						onClick={() => removeBlock(props.block.clientId)}
					/>
				</div>
				{showPanel && (
					<div className="wp-block-ub-content-toggle-accordion-content-wrap">
						<InnerBlocks templateLock={false} />
					</div>
				)}
				<IconButton
					className="ub-content-toggle-accordion-button-add-above"
					icon={addBelow}
					onClick={() => {
						setAttributes({ newBlockPosition: 'below' });
					}}
				/>
			</div>
		);
	}),
	save(props) {
		const { theme, collapsed, titleColor, panelTitle } = props.attributes;
		const classNamePrefix = 'wp-block-ub-content-toggle';
		return (
			<div
				style={{ borderColor: theme }}
				className={`${classNamePrefix}-accordion`}
			>
				<div
					className={`${classNamePrefix}-accordion-title-wrap`}
					style={{ backgroundColor: theme }}
				>
					<RichText.Content
						tagName="span"
						className={`${classNamePrefix}-accordion-title`}
						style={{ color: titleColor }}
						value={panelTitle}
					/>
					<span
						className={
							`${classNamePrefix}-accordion-state-indicator dashicons dashicons-arrow-right-alt2 ` +
							(collapsed ? '' : 'open')
						}
					/>
				</div>
				<div
					style={{
						display: collapsed ? 'none' : 'block'
					}}
					className={`${classNamePrefix}-accordion-content-wrap`}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});

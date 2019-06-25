//  Import CSS.
import './style.scss';
import './editor.scss';
import icon from './icons/icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	ColorPalette,
	InspectorControls,
	URLInput,
	BlockControls,
	PanelColorSettings
} = wp.editor;

const {
	PanelBody,
	Icon,
	IconButton,
	Toolbar,
	RangeControl,
	CheckboxControl
} = wp.components;

const { withState } = wp.compose;

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

const attributes = {
	headline_text: {
		type: 'string',
		default: ''
	},
	content_text: {
		type: 'string',
		default: ''
	},
	button_text: {
		type: 'string',
		default: ''
	},
	headFontSize: {
		type: 'number',
		default: 30
	},
	headColor: {
		type: 'string',
		default: '#444444'
	},
	headAlign: {
		type: 'string',
		default: 'center'
	},
	contentFontSize: {
		type: 'number',
		default: 15
	},
	contentColor: {
		type: 'string',
		default: '#444444'
	},
	buttonFontSize: {
		type: 'number',
		default: 14
	},
	buttonColor: {
		type: 'string',
		default: '#E27330'
	},
	buttonTextColor: {
		type: 'string',
		default: '#ffffff'
	},
	buttonWidth: {
		type: 'number',
		default: 250
	},
	ctaBackgroundColor: {
		type: 'string',
		default: '#f8f8f8'
	},
	ctaBorderColor: {
		type: 'string',
		default: '#ECECEC'
	},
	ctaBorderSize: {
		type: 'number',
		default: 2
	},
	url: {
		type: 'string',
		default: ''
	},
	contentAlign: {
		type: 'string',
		default: 'center'
	},
	addNofollow: {
		type: 'boolean',
		default: false
	},
	openInNewTab: {
		type: 'boolean',
		default: false
	}
};

registerBlockType('ub/call-to-action', {
	title: __('Call to Action'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('call to action'), __('conversion'), __('Ultimate Blocks')],
	attributes,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: withState({ editable: '' })(function(props) {
		const { isSelected, editable, setState, setAttributes } = props;

		const {
			ctaBackgroundColor,
			ctaBorderColor,
			ctaBorderSize,
			headFontSize,
			headColor,
			headAlign,
			contentAlign,
			contentColor,
			contentFontSize,
			buttonWidth,
			buttonFontSize,
			buttonColor,
			buttonTextColor,
			headline_text,
			content_text,
			button_text,
			addNofollow,
			openInNewTab,
			url
		} = props.attributes;

		return [
			isSelected && (
				<BlockControls>
					{['header', 'content'].includes(editable) && (
						<Toolbar>
							{['left', 'center', 'right', 'justify']
								.slice(0, editable === 'header' ? 3 : 4)
								.map(a => (
									<IconButton
										icon={`editor-${
											a === 'justify' ? a : 'align' + a
										}`}
										label={__(
											(a !== 'justify' ? 'Align ' : '') +
												a[0].toUpperCase() +
												a.slice(1)
										)}
										isActive={
											(editable === 'header'
												? headAlign
												: contentAlign) === a
										}
										onClick={() => {
											setAttributes(
												editable === 'header'
													? { headAlign: a }
													: {
															contentAlign: a
													  }
											);
										}}
									/>
								))}
						</Toolbar>
					)}
				</BlockControls>
			),

			isSelected && (
				<InspectorControls>
					<PanelColorSettings
						title={__('Color Settings')}
						initialOpen={false}
						colorSettings={[
							{
								value: ctaBackgroundColor,
								onChange: colorValue =>
									setAttributes({
										ctaBackgroundColor: colorValue
									}),
								label: __('Background Color')
							},
							{
								value: ctaBorderColor,
								onChange: colorValue =>
									setAttributes({
										ctaBorderColor: colorValue
									}),
								label: __('Border Color')
							}
						]}
					/>

					<PanelBody
						title={__('Headline Settings')}
						initialOpen={false}
					>
						<RangeControl
							label={__('Font Size')}
							value={headFontSize}
							onChange={value =>
								setAttributes({ headFontSize: value })
							}
							min={10}
							max={200}
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<p>{__('Color')}</p>
						<ColorPalette
							value={headColor}
							onChange={colorValue =>
								setAttributes({ headColor: colorValue })
							}
						/>
					</PanelBody>

					<PanelBody
						title={__('Content Settings')}
						initialOpen={false}
					>
						<RangeControl
							label={__('Font Size')}
							value={contentFontSize}
							onChange={value =>
								setAttributes({ contentFontSize: value })
							}
							min={10}
							max={200}
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<p>{__('Color')}</p>
						<ColorPalette
							value={contentColor}
							onChange={colorValue =>
								setAttributes({
									contentColor: colorValue
								})
							}
						/>
					</PanelBody>

					<PanelBody
						title={__('Button Settings')}
						initialOpen={false}
					>
						<RangeControl
							label={__('Button Width')}
							value={buttonWidth}
							onChange={value =>
								setAttributes({ buttonWidth: value })
							}
							min={10}
							max={500}
							beforeIcon="editor-code"
							allowReset
						/>

						<RangeControl
							label={__('Font Size')}
							value={buttonFontSize}
							onChange={value =>
								setAttributes({ buttonFontSize: value })
							}
							min={10}
							max={200}
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<p>{__('Button Color')}</p>
						<ColorPalette
							value={buttonColor}
							onChange={colorValue =>
								setAttributes({ buttonColor: colorValue })
							}
						/>

						<p>{__('Button Text Color')}</p>
						<ColorPalette
							value={buttonTextColor}
							onChange={colorValue =>
								setAttributes({
									buttonTextColor: colorValue
								})
							}
						/>
					</PanelBody>
					<PanelBody title={__('Link Settings')} initialOpen={false}>
						<CheckboxControl
							label={__('Add Nofollow to Link')}
							checked={addNofollow}
							onChange={() =>
								setAttributes({ addNofollow: !addNofollow })
							}
						/>
						<CheckboxControl
							label={__('Open Link in New Tab')}
							checked={openInNewTab}
							onChange={() =>
								setAttributes({ openInNewTab: !openInNewTab })
							}
						/>
					</PanelBody>
				</InspectorControls>
			),

			<div className={props.className}>
				<div
					className="ub_call_to_action"
					style={{
						backgroundColor: ctaBackgroundColor,
						border: ctaBorderSize + 'px solid',
						borderColor: ctaBorderColor
					}}
				>
					<div className="ub_call_to_action_headline">
						<RichText
							tagName="p"
							placeholder={__('CTA Title Goes Here')}
							className="ub_call_to_action_headline_text"
							style={{
								fontSize: headFontSize + 'px',
								color: headColor,
								textAlign: headAlign
							}}
							onChange={value =>
								setAttributes({
									headline_text: value
								})
							}
							value={headline_text}
							formattingControls={[
								'bold',
								'italic',
								'strikethrough'
							]}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'header' })
							}
						/>
					</div>

					<div className="ub_call_to_action_content">
						<RichText
							tagName="p"
							placeholder={__('Add Call to Action Text Here')}
							className="ub_cta_content_text"
							style={{
								fontSize: contentFontSize + 'px',
								color: contentColor,
								textAlign: contentAlign
							}}
							onChange={value =>
								setAttributes({
									content_text: value
								})
							}
							value={content_text}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'content' })
							}
						/>
					</div>

					<div className="ub_call_to_action_button">
						<span
							className={`wp-block-button ub_cta_button`}
							style={{
								backgroundColor: buttonColor,
								width: buttonWidth + 'px'
							}}
						>
							<RichText
								tagName="p"
								placeholder={__('Button Text')}
								className="ub_cta_button_text"
								style={{
									color: buttonTextColor,
									fontSize: buttonFontSize + 'px'
								}}
								onChange={value =>
									setAttributes({
										button_text: value
									})
								}
								value={button_text}
								keepPlaceholderOnFocus={true}
								unstableOnFocus={() =>
									setState({ editable: 'button' })
								}
							/>
						</span>
					</div>
				</div>
				<div className="ub_call_to_action_url_input">
					{isSelected && (
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
							className={`editor-format-toolbar__link-modal-line ub_cta_url_input_box flex-container`}
						>
							<div
								style={{
									position: 'relative',
									transform: 'translate(-25%,25%)'
								}}
							>
								<Icon icon="admin-links" />
							</div>
							<URLInput
								className="button-url"
								value={url}
								onChange={value =>
									setAttributes({ url: value })
								}
								unstableOnFocus={() =>
									setState({ editable: 'URLInput' })
								}
							/>
							<IconButton
								icon={'editor-break'}
								label={__('Apply')}
								type={'submit'}
							/>
						</form>
					)}
				</div>
			</div>
		];
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save() {
		return null;
	},
	deprecated: [
		{
			attributes: {
				headline_text: {
					type: 'string',
					default: ''
				},
				content_text: {
					type: 'string',
					default: ''
				},
				button_text: {
					type: 'string',
					default: ''
				},
				headFontSize: {
					type: 'number',
					default: 30
				},
				headColor: {
					type: 'string',
					default: '#444444'
				},
				headAlign: {
					type: 'string',
					default: 'center'
				},
				contentFontSize: {
					type: 'number',
					default: 15
				},
				contentColor: {
					type: 'string',
					default: '#444444'
				},
				buttonFontSize: {
					type: 'number',
					default: 14
				},
				buttonColor: {
					type: 'string',
					default: '#E27330'
				},
				buttonTextColor: {
					type: 'string',
					default: '#ffffff'
				},
				buttonWidth: {
					type: 'number',
					default: 250
				},
				ctaBackgroundColor: {
					type: 'string',
					default: '#f8f8f8'
				},
				ctaBorderColor: {
					type: 'string',
					default: '#ECECEC'
				},
				ctaBorderSize: {
					type: 'number',
					default: 2
				},
				transitionUrl: {
					type: 'string',
					default: ''
				},
				contentAlign: {
					type: 'string',
					default: 'center'
				},
				addNofollow: {
					type: 'boolean',
					default: false
				},
				openInNewTab: {
					type: 'boolean',
					default: false
				}
			},
			migrate: attributes => {
				const { transitionUrl, ...otherProps } = attributes;
				return Object.assign(otherProps, { url: transitionUrl });
			},
			save: props => {
				const {
					ctaBackgroundColor,
					ctaBorderSize,
					ctaBorderColor,
					headFontSize,
					headColor,
					headAlign,
					headline_text,
					contentFontSize,
					contentColor,
					contentAlign,
					content_text,
					buttonColor,
					buttonWidth,
					transitionUrl,
					buttonTextColor,
					buttonFontSize,
					button_text,
					addNofollow,
					openInNewTab
				} = props.attributes;

				return (
					<div className={props.className}>
						<div
							className="ub_call_to_action"
							style={{
								backgroundColor: ctaBackgroundColor,
								border: ctaBorderSize + 'px solid',
								borderColor: ctaBorderColor
							}}
						>
							<div className="ub_call_to_action_headline">
								<p
									className="ub_call_to_action_headline_text"
									style={{
										fontSize: headFontSize + 'px',
										color: headColor,
										textAlign: headAlign
									}}
								>
									{headline_text}
								</p>
							</div>
							<div className="ub_call_to_action_content">
								<p
									className="ub_cta_content_text"
									style={{
										fontSize: contentFontSize + 'px',
										color: contentColor,
										textAlign: contentAlign
									}}
								>
									{content_text}
								</p>
							</div>
							<div className="ub_call_to_action_button">
								<a
									href={transitionUrl}
									target={openInNewTab ? '_blank' : '_self'}
									rel={`${
										addNofollow ? 'nofollow ' : ''
									}noopener noreferrer`}
									className={`wp-block-button ub_cta_button`}
									style={{
										backgroundColor: buttonColor,
										width: buttonWidth + 'px'
									}}
								>
									<p
										className="ub_cta_button_text"
										style={{
											color: buttonTextColor,
											fontSize: buttonFontSize + 'px'
										}}
									>
										{button_text}
									</p>
								</a>
							</div>
						</div>
					</div>
				);
			}
		}
	]
});

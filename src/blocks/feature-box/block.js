/**
 * BLOCK: feature-box
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//Import Icon
import icon, {
	oneColumnIcon,
	twoColumnsIcon,
	threeColumnsIcon
} from './icons/icon';
import remove_icon from './icons/remove_icon';

//  Import CSS.
import './style.scss';
import './editor.scss';
import { version_1_1_2, version_1_1_5, convertFrom } from './oldVersions';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { InspectorControls, BlockControls, RichText, MediaUpload } = wp.editor;

const { Button, Toolbar, IconButton } = wp.components;

const { withState } = wp.compose;

const attributes = {
	column: {
		type: 'string',
		default: '2'
	},
	transitionColumnOneTitle: {
		type: 'string',
		default: 'Title One'
	},
	title1Align: {
		type: 'string',
		default: 'center'
	},
	transitionColumnTwoTitle: {
		type: 'string',
		default: 'Title Two'
	},
	title2Align: {
		type: 'string',
		default: 'center'
	},
	transitionColumnThreeTitle: {
		type: 'string',
		default: 'Title Three'
	},
	title3Align: {
		type: 'string',
		default: 'center'
	},
	transitionColumnOneBody: {
		type: 'string',
		default:
			'Gutenberg is really awesome! Ultimate Blocks makes it more awesome!'
	},
	body1Align: {
		type: 'string',
		default: 'left'
	},
	transitionColumnTwoBody: {
		type: 'string',
		default:
			'Gutenberg is really awesome! Ultimate Blocks makes it more awesome!'
	},
	body2Align: {
		type: 'string',
		default: 'left'
	},
	transitionColumnThreeBody: {
		type: 'string',
		default:
			'Gutenberg is really awesome! Ultimate Blocks makes it more awesome!'
	},
	body3Align: {
		type: 'string',
		default: 'left'
	},
	transitionImgOneURL: {
		type: 'string',
		default: ''
	},
	imgOneID: {
		type: 'number'
	},
	transitionImgOneAlt: {
		type: 'string',
		default: ''
	},
	transitionImgTwoURL: {
		type: 'string',
		default: ''
	},
	imgTwoID: {
		type: 'number'
	},
	transitionImgTwoAlt: {
		type: 'string',
		default: ''
	},
	transitionImgThreeURL: {
		type: 'string',
		default: ''
	},
	imgThreeID: {
		type: 'number'
	},
	transitionImgThreeAlt: {
		type: 'string',
		default: ''
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
registerBlockType('ub/feature-box', {
	title: __('Feature Box'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('Feature Box'), __('Column'), __('Ultimate Blocks')],
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
			column,
			transitionColumnOneTitle,
			transitionColumnTwoTitle,
			transitionColumnThreeTitle,
			transitionColumnOneBody,
			transitionColumnTwoBody,
			transitionColumnThreeBody,
			transitionImgOneURL,
			imgOneID,
			transitionImgOneAlt,
			transitionImgTwoURL,
			imgTwoID,
			transitionImgTwoAlt,
			transitionImgThreeURL,
			imgThreeID,
			transitionImgThreeAlt,
			title1Align,
			body1Align,
			title2Align,
			body2Align,
			title3Align,
			body3Align
		} = props.attributes;

		const onSelectImageOne = img => {
			setAttributes({
				imgOneID: img.id,
				transitionImgOneURL: img.url,
				transitionImgOneAlt: img.alt
			});
		};

		const onSelectImageTwo = img => {
			setAttributes({
				imgTwoID: img.id,
				transitionImgTwoURL: img.url,
				transitionImgTwoAlt: img.alt
			});
		};

		const onSelectImageThree = img => {
			setAttributes({
				imgThreeID: img.id,
				transitionImgThreeURL: img.url,
				transitionImgThreeAlt: img.alt
			});
		};

		const onRemoveImageOne = () => {
			setAttributes({
				imgOneID: null,
				transitionImgOneURL: null,
				transitionImgOneAlt: null
			});
		};

		const onRemoveImageTwo = () => {
			setAttributes({
				imgTwoID: null,
				transitionImgTwoURL: null,
				transitionImgTwoAlt: null
			});
		};

		const onRemoveImageThree = () => {
			setAttributes({
				imgThreeID: null,
				transitionImgThreeURL: null,
				transitionImgThreeAlt: null
			});
		};

		const selectedTextAlignment = () => {
			switch ('editable') {
				case 'title1':
					return title1Align;
				case 'body1':
					return body1Align;
				case 'title2':
					return title2Align;
				case 'body2':
					return body2Align;
				case 'title3':
					return title3Align;
				case 'body3':
					return body3Align;
			}
		};

		return [
			isSelected && (
				<BlockControls>
					<Toolbar>
						<IconButton
							icon={oneColumnIcon}
							label={__('One column')}
							isActive={column === '1'}
							onClick={() => setAttributes({ column: '1' })}
						/>
						<IconButton
							icon={twoColumnsIcon}
							label={__('Two columns')}
							isActive={column === '2'}
							onClick={() => setAttributes({ column: '2' })}
						/>
						<IconButton
							icon={threeColumnsIcon}
							label={__('Three columns')}
							isActive={column === '3'}
							onClick={() => setAttributes({ column: '3' })}
						/>
					</Toolbar>
					<Toolbar>
						{['left', 'center', 'right', 'justify']
							.slice(0, editable.indexOf('title') > -1 ? 3 : 4)
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
									isActive={selectedTextAlignment === a}
									onClick={() => {
										switch (editable) {
											case 'title1':
												setAttributes({
													title1Align: a
												});
												break;
											case 'body1':
												setAttributes({
													body1Align: a
												});
												break;
											case 'title2':
												setAttributes({
													title2Align: a
												});
												break;
											case 'body2':
												setAttributes({
													body2Align: a
												});
												break;
											case 'title3':
												setAttributes({
													title3Align: a
												});
												break;
											case 'body3':
												setAttributes({
													body3Align: a
												});
												break;
										}
									}}
								/>
							))}
					</Toolbar>
				</BlockControls>
			),

			isSelected && <InspectorControls />,

			<div className={props.className}>
				<div className={`ub_feature_box column_${column}`}>
					<div class="ub_feature_1">
						{!imgOneID ? (
							<div className="ub_feature_upload_button">
								<MediaUpload
									onSelect={onSelectImageOne}
									type="image"
									value={imgOneID}
									render={({ open }) => (
										<Button
											className="components-button button button-medium"
											onClick={open}
										>
											{__('Upload Image')}
										</Button>
									)}
								/>
							</div>
						) : (
							<React.Fragment>
								{isSelected && (
									<Button
										className="remove-image"
										onClick={onRemoveImageOne}
									>
										{remove_icon}
									</Button>
								)}
								<img
									className="ub_feature_one_img"
									src={transitionImgOneURL}
									alt={transitionImgOneAlt}
								/>
							</React.Fragment>
						)}
						<RichText
							tagName="p"
							className="ub_feature_one_title"
							style={{ textAlign: title1Align }}
							value={transitionColumnOneTitle}
							onChange={value =>
								setAttributes({
									transitionColumnOneTitle: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'title1' })
							}
						/>
						<RichText
							tagName="p"
							className="ub_feature_one_body"
							style={{ textAlign: body1Align }}
							value={transitionColumnOneBody}
							onChange={value =>
								setAttributes({
									transitionColumnOneBody: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'body1' })
							}
						/>
					</div>
					<div class="ub_feature_2">
						{!imgTwoID ? (
							<div className="ub_feature_upload_button">
								<MediaUpload
									onSelect={onSelectImageTwo}
									type="image"
									value={imgTwoID}
									render={({ open }) => (
										<Button
											className="components-button button button-medium"
											onClick={open}
										>
											{__('Upload Image')}
										</Button>
									)}
								/>
							</div>
						) : (
							<React.Fragment>
								{isSelected && (
									<Button
										className="remove-image"
										onClick={onRemoveImageTwo}
									>
										{remove_icon}
									</Button>
								)}
								<img
									className="ub_feature_two_img"
									src={transitionImgTwoURL}
									alt={transitionImgTwoAlt}
								/>
							</React.Fragment>
						)}
						<RichText
							tagName="p"
							className="ub_feature_two_title"
							style={{ textAlign: title2Align }}
							value={transitionColumnTwoTitle}
							onChange={value =>
								setAttributes({
									transitionColumnTwoTitle: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'title2' })
							}
						/>
						<RichText
							tagName="p"
							className="ub_feature_two_body"
							style={{ textAlign: body2Align }}
							value={transitionColumnTwoBody}
							onChange={value =>
								setAttributes({
									transitionColumnTwoBody: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'body2' })
							}
						/>
					</div>
					<div class="ub_feature_3">
						{!imgThreeID ? (
							<div className="ub_feature_upload_button">
								<MediaUpload
									onSelect={onSelectImageThree}
									type="image"
									value={imgThreeID}
									render={({ open }) => (
										<Button
											className="components-button button button-medium"
											onClick={open}
										>
											{__('Upload Image')}
										</Button>
									)}
								/>
							</div>
						) : (
							<React.Fragment>
								{isSelected && (
									<Button
										className="remove-image"
										onClick={onRemoveImageThree}
									>
										{remove_icon}
									</Button>
								)}
								<img
									className="ub_feature_three_img"
									src={transitionImgThreeURL}
									alt={transitionImgThreeAlt}
								/>
							</React.Fragment>
						)}
						<RichText
							tagName="p"
							className="ub_feature_three_title"
							style={{ textAlign: title3Align }}
							value={transitionColumnThreeTitle}
							onChange={value =>
								setAttributes({
									transitionColumnThreeTitle: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'title3' })
							}
						/>
						<RichText
							tagName="p"
							className="ub_feature_three_body"
							style={{ textAlign: body3Align }}
							value={transitionColumnThreeBody}
							onChange={value =>
								setAttributes({
									transitionColumnThreeBody: value
								})
							}
							keepPlaceholderOnFocus={true}
							unstableOnFocus={() =>
								setState({ editable: 'body3' })
							}
						/>
					</div>
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
	save: function(props) {
		const {
			column,
			transitionColumnOneTitle,
			transitionColumnTwoTitle,
			transitionColumnThreeTitle,
			transitionColumnOneBody,
			transitionColumnTwoBody,
			transitionColumnThreeBody,
			transitionImgOneURL,
			transitionImgOneAlt,
			transitionImgTwoURL,
			transitionImgTwoAlt,
			transitionImgThreeURL,
			transitionImgThreeAlt,
			title1Align,
			title2Align,
			title3Align,
			body1Align,
			body2Align,
			body3Align
		} = props.attributes;

		return (
			<div className={props.className}>
				<div className={`ub_feature_box column_${column}`}>
					<div className="ub_feature_1">
						<img
							className="ub_feature_one_img"
							src={transitionImgOneURL}
							alt={transitionImgOneAlt}
						/>
						<p
							className="ub_feature_one_title"
							style={{ textAlign: title1Align }}
						>
							{transitionColumnOneTitle}
						</p>
						<p
							className="ub_feature_one_body"
							style={{ textAlign: body1Align }}
						>
							{transitionColumnOneBody}
						</p>
					</div>
					<div className="ub_feature_2">
						<img
							className="ub_feature_two_img"
							src={transitionImgTwoURL}
							alt={transitionImgTwoAlt}
						/>
						<p
							className="ub_feature_two_title"
							style={{ textAlign: title2Align }}
						>
							{transitionColumnTwoTitle}
						</p>
						<p
							className="ub_feature_two_body"
							style={{ textAlign: body2Align }}
						>
							{transitionColumnTwoBody}
						</p>
					</div>
					<div className="ub_feature_3">
						<img
							className="ub_feature_three_img"
							src={transitionImgThreeURL}
							alt={transitionImgThreeAlt}
						/>
						<p
							className="ub_feature_three_title"
							style={{ align: title3Align }}
						>
							{transitionColumnThreeTitle}
						</p>
						<p
							className="ub_feature_three_body"
							style={{ align: body3Align }}
						>
							{transitionColumnThreeBody}
						</p>
					</div>
				</div>
			</div>
		);
	},
	deprecated: [convertFrom(version_1_1_2), convertFrom(version_1_1_5)]
});

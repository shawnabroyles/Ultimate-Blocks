import icon, {
	oneColumnIcon,
	twoColumnsIcon,
	threeColumnsIcon,
	plainList
} from './icon';
import TableOfContents from './components';
import {
	version_1_0_8,
	version_1_0_9,
	version_1_1_3,
	version_1_1_5,
	version_1_1_6,
	version_1_1_8,
	version_2_0_0,
	convertToNew
} from './oldVersions';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;

const {
	ToggleControl,
	PanelRow,
	PanelBody,
	Toolbar,
	IconButton
} = wp.components;
const { RichText, InspectorControls, BlockControls } = wp.editor;

import './editor.scss';
import './style.scss';

const attributes = {
	transitionTitle: {
		type: 'string',
		default: ''
	},
	allowedHeaders: {
		type: 'array',
		default: Array(6).fill(true)
	},
	links: {
		type: 'string',
		default: ''
	},
	allowToCHiding: {
		type: 'boolean',
		default: false
	},
	showList: {
		type: 'boolean',
		default: true
	},
	numColumns: {
		type: 'number',
		default: 1
	},
	listStyle: {
		type: 'string',
		default: 'bulleted' //other options: numbered, plain
	}
};

const oldAttributes = Object.assign(attributes, {
	title: {
		type: 'array',
		source: 'children',
		selector: '.ub_table-of-contents-title'
	}
});

const convertFrom = oldVersion => {
	return {
		attributes: oldAttributes,
		migrate: convertToNew,
		save: oldVersion
	};
};

registerBlockType('ub/table-of-contents', {
	title: __('Table of Contents'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('Table of Contents'), __('Ultimate Blocks')],

	attributes,

	edit(props) {
		const { setAttributes, isSelected } = props;
		const {
			links,
			transitionTitle,
			allowedHeaders,
			showList,
			allowToCHiding,
			numColumns,
			listStyle
		} = props.attributes;

		return [
			isSelected && (
				<InspectorControls>
					<PanelBody title={__('Allowed Headers')} initialOpen={true}>
						{allowedHeaders.map((a, i) => (
							<PanelRow>
								<label htmlFor={`ub_toggle_h${i + 1}`}>{`H${i +
									1}`}</label>
								<ToggleControl
									id={`ub_toggle_h${i + 1}`}
									checked={a}
									onChange={() =>
										setAttributes({
											allowedHeaders: [
												...allowedHeaders.slice(0, i),
												!allowedHeaders[i],
												...allowedHeaders.slice(i + 1)
											]
										})
									}
								/>
							</PanelRow>
						))}
					</PanelBody>
					<PanelBody
						title={__('Additional Settings')}
						initialOpen={true}
					>
						<PanelRow>
							<label htmlFor="ub_toc_toggle_display">
								{__(
									'Allow users to toggle the visibility of the table of contents'
								)}
							</label>
							<ToggleControl
								id="ub_toc_toggle_display"
								checked={allowToCHiding}
								onChange={allowToCHiding => {
									setAttributes({
										allowToCHiding,
										showList: allowToCHiding
											? showList
											: true
									});
								}}
							/>
						</PanelRow>
						{allowToCHiding && (
							<PanelRow>
								<label htmlFor="ub_show_toc">
									{__('Inititally Show Table of Contents')}
								</label>
								<ToggleControl
									id="ub_show_toc"
									checked={showList}
									onChange={() => {
										setAttributes({
											showList: !showList
										});
									}}
								/>
							</PanelRow>
						)}
					</PanelBody>
				</InspectorControls>
			),
			isSelected && (
				<BlockControls>
					<Toolbar>
						<IconButton
							className={'ub_toc_column_selector'}
							icon={oneColumnIcon}
							label={__('One column')}
							isPrimary={numColumns === 1}
							onClick={() => setAttributes({ numColumns: 1 })}
						/>
						<IconButton
							className={'ub_toc_column_selector'}
							icon={twoColumnsIcon}
							label={__('Two columns')}
							isPrimary={numColumns === 2}
							onClick={() => setAttributes({ numColumns: 2 })}
						/>
						<IconButton
							className={'ub_toc_column_selector'}
							icon={threeColumnsIcon}
							label={__('Three columns')}
							isPrimary={numColumns === 3}
							onClick={() => setAttributes({ numColumns: 3 })}
						/>
					</Toolbar>
					<Toolbar>
						<IconButton
							icon="editor-ul"
							label={__('Bulleted list')}
							onClick={() =>
								setAttributes({ listStyle: 'bulleted' })
							}
						/>
						<IconButton
							icon="editor-ol"
							label={__('Numbered list')}
							onClick={() =>
								setAttributes({ listStyle: 'numbered' })
							}
						/>
						<IconButton
							icon={plainList}
							label={__('Plain list')}
							onClick={() =>
								setAttributes({ listStyle: 'plain' })
							}
						/>
					</Toolbar>
				</BlockControls>
			),
			<div className="ub_table-of-contents">
				<div className="ub_table-of-contents-header">
					<div className="ub_table-of-contents-title">
						<RichText
							placeholder={__('Optional title')}
							className="ub_table-of-contents-title"
							onChange={text =>
								setAttributes({ transitionTitle: text })
							}
							value={transitionTitle}
							keepPlaceholderOnFocus={true}
						/>
					</div>
					{allowToCHiding && (
						<div id="ub_table-of-contents-header-toggle">
							<div id="ub_table-of-contents-toggle">
								[
								<a
									className="ub_table-of-contents-toggle-link"
									href="#"
									onClick={() => {
										setAttributes({ showList: !showList });
									}}
								>
									{showList ? __('hide') : __('show')}
								</a>
								]
							</div>
						</div>
					)}
				</div>
				{showList && (
					<TableOfContents
						listStyle={listStyle}
						numColumns={numColumns}
						allowedHeaders={allowedHeaders}
						headers={links && JSON.parse(links)}
						blockProp={props}
					/>
				)}
			</div>
		];
	},

	save(props) {
		const {
			links,
			transitionTitle,
			allowedHeaders,
			showList,
			numColumns,
			allowToCHiding,
			listStyle
		} = props.attributes;
		return (
			<div
				className="ub_table-of-contents"
				data-showText={__('show')}
				data-hideText={__('hide')}
			>
				{(transitionTitle.length > 1 ||
					(transitionTitle.length === 1 &&
						transitionTitle[0] !== '')) && (
					<div className="ub_table-of-contents-header">
						<div className="ub_table-of-contents-title">
							{transitionTitle}
						</div>
						{allowToCHiding && (
							<div id="ub_table-of-contents-header-toggle">
								<div id="ub_table-of-contents-toggle">
									[
									<a
										className="ub_table-of-contents-toggle-link"
										href="#"
									>
										{showList ? __('hide') : __('show')}
									</a>
									]
								</div>
							</div>
						)}
					</div>
				)}

				<TableOfContents
					listStyle={listStyle}
					numColumns={numColumns}
					style={{
						display:
							showList ||
							transitionTitle.length === 0 ||
							(transitionTitle.length === 1 &&
								transitionTitle[0] === '')
								? 'block'
								: 'none'
					}}
					allowedHeaders={allowedHeaders}
					headers={links && JSON.parse(links)}
				/>
			</div>
		);
	},
	deprecated: [
		convertFrom(version_1_0_8),
		convertFrom(version_1_0_9),
		convertFrom(version_1_1_3),
		convertFrom(version_1_1_5),
		convertFrom(version_1_1_6),
		convertFrom(version_1_1_8),
		convertFrom(version_2_0_0)
	]
});

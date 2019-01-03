const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
	RichText,
	PlainText,
	ColorPalette,
	MediaUpload,
	URLInput
} = wp.editor;
const {
	Button,
	Dropdown,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	Icon,
	IconButton,
	DateTimePicker,
	PanelBody,
	PanelRow,
	FormToggle,
	SelectControl,
	RangeControl
} = wp.components;

import './style.scss';
import './editor.scss';

import React, { Component } from 'react';
import autosize from 'autosize';
import icon, {
	placeholderImage1,
	placeholderImage2,
	removeImage,
	pricetag,
	scissors
} from './icons';

class OneLineInput extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		autosize(this.textarea);
	}
	onChange(event) {
		const { value } = event.target;
		if (value.indexOf('\n') === -1) {
			this.props.onChange(value);
		}
	}

	render() {
		const { placeholder, className, value, style } = this.props;
		return (
			<textarea
				style={style}
				className={`wpcd-one-line-input ${className ? className : ''}`}
				onChange={this.onChange}
				placeholder={placeholder}
				value={value}
				ref={a => (this.textarea = a)}
			/>
		);
	}
}

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = { timeLeft: this.remainingTime() };
	}
	remainingTime = () => {
		return Math.ceil(this.props.deadline - Date.now() / 1000);
	};
	componentDidMount() {
		this.tick = setInterval(this.ticker, 1000);
	}
	ticker = () => {
		this.setState({
			timeLeft: this.remainingTime()
		});
	};
	componentWillReceiveProps(newProps) {
		if (newProps.deadline !== this.props.deadline) {
			clearInterval(this.tick);
			this.setState({
				timeLeft: Math.ceil(newProps.deadline - Date.now() / 1000)
			});
			this.tick = setInterval(this.ticker, 1000);
		}
	}
	componentWillUnmount() {
		clearInterval(this.tick);
	}
	render() {
		const { timeLeft } = this.state;
		const seconds = timeLeft % 60;
		const minutes = ((timeLeft - seconds) % 3600) / 60;
		const hours = ((timeLeft - minutes * 60 - seconds) % 86400) / 3600;
		const days =
			((timeLeft - hours * 3600 - minutes * 60 - seconds) % 604800) /
			86400;
		const weeks =
			(timeLeft - days * 86400 - hours * 3600 - minutes * 60 - seconds) /
			604800;

		const defaultTimeDisplay = `${minutes} minutes ${seconds} seconds`;

		let timeDisplay = defaultTimeDisplay;

		if (hours > 0) timeDisplay = `${hours} hours ` + defaultTimeDisplay;
		if (days > 0)
			timeDisplay = `${days} days ${hours} hours ` + defaultTimeDisplay;
		if (weeks > 0)
			timeDisplay =
				`${weeks} weeks ${days} days ${hours} hours ` +
				defaultTimeDisplay;

		const { className, style } = this.props;

		return (
			<span className={className} style={style}>{` ${
				timeLeft > 0 ? timeDisplay : 'This offer has expired'
			}`}</span>
		);
	}
}

registerBlockType('ub/wpcd-coupons-and-deals', {
	title: __('Coupons and Deals'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('Coupon'), __('Deals')],

	attributes: {
		couponTitle: {
			type: 'string',
			default: ''
		},
		couponType: {
			type: 'string',
			default: 'Coupon'
		},
		couponCode: {
			type: 'string',
			default: 'COUPONCODE'
		},
		targetURL: {
			type: 'string',
			default: ''
		},
		discountText: {
			type: 'string',
			default: ''
		},
		//for template 4
		couponCode2: {
			type: 'string',
			default: 'COUPONCODE'
		},
		couponCode3: {
			type: 'string',
			default: 'COUPONCODE'
		},
		targetURL2: {
			type: 'string',
			default: ''
		},
		targetURL3: {
			type: 'string',
			default: ''
		},
		discountText2: {
			type: 'string',
			default: ''
		},
		discountText3: {
			type: 'string',
			default: ''
		},

		couponText: {
			type: 'string',
			default: ''
		},
		showExpiryDate: {
			type: 'boolean',
			default: true //enable toggling for default, 1, 3, 4, 5, force set to true in alternate, 2, 6
		},
		showCode: {
			type: 'boolean',
			default: true //cover code display when set to false, force set to true if couponType is Deal
		},
		couponExpires: {
			type: 'boolean',
			defaut: false
		},
		coupon2Expires: {
			type: 'boolean',
			defaut: false
		},
		coupon3Expires: {
			type: 'boolean',
			defaut: false
		},
		expiryTime: {
			type: 'number',
			default: 0 //date+time for 2 and 6, date only for others, store as unix time
		},
		expiryTime2: {
			type: 'number',
			default: 0
		},
		expiryTime3: {
			type: 'number',
			default: 0
		},
		couponStyle: {
			type: 'number',
			default: 0
		},
		//for 1, 2, 5 & 6
		imgURL: {
			type: 'string'
		},
		imgID: {
			type: 'number'
		},
		imgAlt: {
			type: 'string'
		},
		//for 4, 5, 6
		couponColor: {
			type: 'string',
			default: '#18e066f'
		},
		showSocialLinks: {
			type: 'boolean',
			default: false
		}
	},

	edit(props) {
		const { isSelected, setAttributes } = props;
		const {
			couponTitle,
			couponType,
			couponCode,
			couponCode2,
			couponCode3,
			targetURL,
			targetURL2,
			targetURL3,
			discountText,
			discountText2,
			discountText3,
			couponText,
			couponExpires,
			coupon2Expires,
			coupon3Expires,
			showExpiryDate,
			showCode,
			expiryTime,
			expiryTime2,
			expiryTime3,
			couponStyle,
			couponColor,
			imgURL,
			imgID,
			imgAlt,
			showSocialLinks
		} = props.attributes;

		const getDateFrom = unixTime =>
			new Date(unixTime * 1000).setHours(0, 0, 0, 0);

		let expiryDate = getDateFrom(expiryTime); //use when only date is required
		let expiryDate2 = getDateFrom(expiryTime2);
		let expiryDate3 = getDateFrom(expiryTime3);

		const socialPanel = (
			<div className="wpcd-new-social-panel">
				<div
					className="wpcd-new-facebook-button"
					style={{
						backgroundColor: '#3b5998'
					}}
				>
					<svg
						fill="#fff"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 264 512"
					>
						<path d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229" />
					</svg>
				</div>
				<div
					className="wpcd-new-twitter-button"
					style={{
						backgroundColor: '#55acee'
					}}
				>
					<svg
						fill="white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
					</svg>
				</div>
			</div>
		);

		const alternateStyle = (
			<div className="wpcd-new-alt-grid-container">
				<div className="wpcd-new-alt-grid-one">
					<OneLineInput
						className="wpcd-new-alt-discount-text editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
					<div className="wpcd-new-alt-coupon-type">{couponType}</div>
					{showExpiryDate && (
						<p className="wpcd-new-alt-expire-text">
							{couponExpires
								? (expiryDate > Date.now()
										? __('Expires on: ')
										: __('Expired on: ')) +
								  new Date(expiryDate).toLocaleDateString()
								: __("Doesn't expire")}
						</p>
					)}
				</div>
				<div className="wpcd-new-alt-grid-two">
					<OneLineInput
						className="wpcd-new-alt-title editor-plain-text"
						placeholder={__('Coupon title')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						placeholder={__(
							'This is the description of the coupon code. Additional details of what the coupon or deal is.'
						)}
						value={couponText}
						onChange={value =>
							setAttributes({
								couponText: value
							})
						}
						keepPlaceholderOnFocus={true}
					/>
				</div>
				<div className="wpcd-new-alt-grid-three">
					<a className="wpcd-new-alt-goto-button">
						{__(
							couponType === 'Coupon'
								? 'GET THIS COUPON'
								: 'GO TO THE DEAL'
						)}
					</a>
					{showCode ? (
						<a className="wpcd-new-alt-coupon-code">
							<OneLineInput
								className="editor-plain-text"
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({ couponCode: value })
								}
							/>
						</a>
					) : (
						<div
							className="wpcd-new-hidden-code"
							title="Click Here to Show Code"
						>
							<OneLineInput
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</div>
					)}
				</div>
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
							className={`editor-format-toolbar__link-modal-line flex-container`}
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
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
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
		);

		const defaultStyle = (
			<div className="wpcd-new-default-style">
				<div className="wpcd-new-default-discount-display">
					<div className="wpcd-new-default-discount-text">
						<OneLineInput
							className="editor-plain-text"
							style={{ textAlign: 'center' }}
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
					</div>
					<div className="wpcd-new-default-coupon-type">
						{couponType}
					</div>
				</div>
				<div className="wpcd-new-default-body">
					<div className="wpcd-new-default-header">
						<OneLineInput
							className="wpcd-new-default-coupon-title editor-plain-text"
							placeholder={__('Coupon title')}
							value={couponTitle}
							onChange={value =>
								setAttributes({ couponTitle: value })
							}
						/>
						{showCode ? (
							<div
								className="wpcd-new-visible-code-variant-1"
								title={`Click here to ${
									couponType === 'Coupon'
										? 'copy '
										: 'get this '
								}${couponType}`}
							>
								<div className="wpcd-new-iconholder">
									{couponType === 'Coupon'
										? scissors
										: pricetag}
								</div>
								<OneLineInput
									placeholder={__('COUPONCODE')}
									value={couponCode}
									style={{ width: '100%', color: '#347baf' }}
									onChange={value =>
										setAttributes({
											couponCode: value
										})
									}
								/>
							</div>
						) : (
							<div className="wpcd-new-hidden-code">
								<a href="#" title="Click Here to Show Code">
									<OneLineInput
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode: value
											})
										}
									/>
								</a>
							</div>
						)}
					</div>
					<div className="wpcd-new-default-footer">
						<RichText
							className="wpcd-new-default-description"
							placeholder={__(
								'This is the description of the coupon code. Additional details of what the coupon or deal is.'
							)}
							value={couponText}
							onChange={value =>
								setAttributes({
									couponText: value
								})
							}
							keepPlaceholderOnFocus={true}
						/>

						{showExpiryDate && couponExpires ? (
							<div
								className="wpcd-new-default-coupon-expiry"
								style={{
									color:
										expiryDate > Date.now()
											? 'green'
											: 'red'
								}}
							>
								{(expiryDate > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')) +
									new Date(expiryDate).toLocaleDateString()}
							</div>
						) : (
							<div
								className="wpcd-new-default-coupon-expiry"
								style={{ color: 'green' }}
							>
								{__("Doesn't expire")}
							</div>
						)}
					</div>
				</div>
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
							className={`editor-format-toolbar__link-modal-line flex-container`}
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
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
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
		);

		const template1 = (
			<div className="wpcd-new-pro-style-1">
				<figure style={{ position: 'relative' }}>
					{imgID ? (
						<React.Fragment>
							<div style={{ margin: '0 auto' }}>
								<img src={imgURL} alt={imgAlt} />
							</div>
							{isSelected && (
								<Button
									style={{
										position: 'absolute',
										top: 0,
										right: 0
									}}
									onClick={() =>
										setAttributes({
											imgID: null,
											imgURL: null,
											imgAlt: null
										})
									}
								>
									{removeImage}
								</Button>
							)}
						</React.Fragment>
					) : (
						<React.Fragment>
							<div style={{ margin: '0 auto' }}>
								{placeholderImage1}
							</div>
							<MediaUpload
								onSelect={img => {
									setAttributes({
										imgID: img.id,
										imgURL: img.url,
										imgAlt: img.alt
									});
								}}
								type="image"
								value={imgID}
								render={({ open }) => (
									<Button
										className="components-button button button-medium"
										onClick={open}
										style={{
											fontSize: '11px',
											width: '100%'
										}}
									>
										Upload Image
									</Button>
								)}
							/>
						</React.Fragment>
					)}
				</figure>
				<div className="wpcd-new-pro-style-1-title-desc">
					<OneLineInput
						className="editor-plain-text"
						style={{ fontSize: '22px', fontWeight: 600 }}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						placeholder={__(
							'This is the description of the coupon code. Additional details of what the coupon or deal is.'
						)}
						value={couponText}
						onChange={value =>
							setAttributes({
								couponText: value
							})
						}
						keepPlaceholderOnFocus={true}
					/>
				</div>
				<div className="wpcd-new-pro-style-1-coupon-data">
					<OneLineInput
						className="editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
					{showCode ? (
						<div
							className="wpcd-new-visible-code-variant-1"
							title={`Click here to ${
								couponType === 'Coupon' ? 'copy ' : 'get this '
							}${couponType}`}
						>
							<div className="wpcd-new-iconholder">
								{couponType === 'Coupon' ? scissors : pricetag}
							</div>
							<OneLineInput
								style={{ width: '100%', color: '#347baf' }}
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</div>
					) : (
						<div className="wpcd-new-hidden-code">
							<a title="Click Here to Show Code">
								<OneLineInput
									style={{ width: '100%', color: '#347baf' }}
									className="code-text-wpcd"
									placeholder={__('COUPONCODE')}
									value={couponCode}
									onChange={value =>
										setAttributes({
											couponCode: value
										})
									}
								/>
							</a>
						</div>
					)}
					{showExpiryDate && couponExpires ? (
						<div
							className="wpcd-new-pro-style-1-expiry"
							style={{
								color: expiryDate > Date.now() ? 'green' : 'red'
							}}
						>
							{(expiryDate > Date.now()
								? __('Expires on: ')
								: __('Expired on: ')) +
								new Date(expiryDate).toLocaleDateString()}
						</div>
					) : (
						<div
							className="wpcd-new-pro-style-1-expiry"
							style={{ color: 'green' }}
						>
							Doesn't expire
						</div>
					)}
				</div>
				{showSocialLinks && socialPanel}
				{isSelected && (
					<div className="wpcd-url-input">
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
							className={`editor-format-toolbar__link-modal-line flex-container`}
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
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
								}
							/>
							<IconButton
								icon={'editor-break'}
								label={__('Apply')}
								type={'submit'}
							/>
						</form>
					</div>
				)}
			</div>
		);

		const template2 = (
			<div className="wpcd-new-pro-style-2">
				<div className="wpcd-new-pro-style-2-img-and-discount-text">
					<figure style={{ position: 'relative' }}>
						{imgID ? (
							<React.Fragment>
								<img src={imgURL} alt={imgAlt} />
								{isSelected && (
									<Button
										style={{
											position: 'absolute',
											top: 0,
											right: 0
										}}
										onClick={() =>
											setAttributes({
												imgID: null,
												imgURL: null,
												imgAlt: null
											})
										}
									>
										{removeImage}
									</Button>
								)}
							</React.Fragment>
						) : (
							<React.Fragment>
								{placeholderImage1}
								<MediaUpload
									onSelect={img => {
										setAttributes({
											imgID: img.id,
											imgURL: img.url,
											imgAlt: img.alt
										});
									}}
									type="image"
									value={imgID}
									render={({ open }) => (
										<Button
											className="components-button button button-medium"
											onClick={open}
											style={{
												fontSize: '11px',
												width: '100%'
											}}
										>
											Upload Image
										</Button>
									)}
								/>
							</React.Fragment>
						)}
					</figure>
					<div className="wpcd-new-pro-style-2-discount-text">
						<OneLineInput
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
					</div>
				</div>
				<div className="wpcd-new-pro-style-2-content">
					<div className="wpcd-new-pro-style-2-title">
						<OneLineInput
							className="editor-plain-text"
							placeholder={__('Sample coupon code')}
							value={couponTitle}
							onChange={value =>
								setAttributes({ couponTitle: value })
							}
						/>
					</div>
					<div className="wpcd-new-pro-style-2-expiry-and-code">
						{showExpiryDate && couponExpires ? (
							<div className="wpcd-new-pro-style-2-expiry">
								Expires in:
								<Timer
									style={{
										color:
											expiryDate > Date.now()
												? 'green'
												: 'red'
									}}
									deadline={expiryTime}
								/>
							</div>
						) : (
							<div className="wpcd-new-pro-style-2-expiry">
								Doesn't expire
							</div>
						)}
						<div>
							{showCode ? (
								<div
									className="wpcd-new-visible-code-variant-1"
									title={`Click here to ${
										couponType === 'Coupon'
											? 'copy '
											: 'get this '
									}${couponType}`}
								>
									<div className="wpcd-new-iconholder">
										{couponType === 'Coupon'
											? scissors
											: pricetag}
									</div>
									<OneLineInput
										style={{
											width: '100%',
											color: '#347baf'
										}}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode: value
											})
										}
									/>
								</div>
							) : (
								<div className="wpcd-new-hidden-code">
									<a
										data-type="code"
										href=""
										title="Click Here to Show Code"
									>
										<OneLineInput
											style={{ width: '100%' }}
											className="code-text-wpcd"
											placeholder={__('COUPONCODE')}
											value={couponCode}
											onChange={value =>
												setAttributes({
													couponCode: value
												})
											}
										/>
									</a>
								</div>
							)}
						</div>
					</div>
					<RichText
						className="wpcd-new-pro-style-2-description"
						style={{ width: '100%' }}
						placeholder={__(
							'This is the description of the coupon code. Additional details of what the coupon or deal is.'
						)}
						value={couponText}
						onChange={value =>
							setAttributes({
								couponText: value
							})
						}
						keepPlaceholderOnFocus={true}
					/>
				</div>
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<div>
							<div
								style={{
									position: 'relative',
									transform: 'translate(-25%,25%)'
								}}
							>
								<Icon icon="admin-links" />
							</div>
							<URLInput
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
								}
							/>
							<IconButton
								icon={'editor-break'}
								label={__('Apply')}
								type={'submit'}
							/>
						</div>
					)}
				</div>
			</div>
		);

		const template3 = (
			<div className="wpcd-new-pro-style-3">
				<OneLineInput
					className="editor-plain-text"
					style={{ fontSize: '22px' }}
					placeholder={__('Sample coupon code')}
					value={couponTitle}
					onChange={value => setAttributes({ couponTitle: value })}
				/>
				<RichText
					style={{ width: '100%' }}
					placeholder={__(
						'This is the description of the coupon code. Additional details of what the coupon or deal is.'
					)}
					value={couponText}
					onChange={value =>
						setAttributes({
							couponText: value
						})
					}
					keepPlaceholderOnFocus={true}
				/>
				<div className="wpcd-new-pro-style-3-expiry-and-code">
					{showExpiryDate && couponExpires ? (
						<div
							className="wpcd-new-pro-style-3-expiry"
							style={{
								color: expiryDate > Date.now() ? 'green' : 'red'
							}}
						>
							{(expiryDate > Date.now()
								? __('Expires on: ')
								: __('Expired on: ')) +
								new Date(expiryDate).toLocaleDateString()}
						</div>
					) : (
						<div style={{ color: 'green' }}>Doesn't expire</div>
					)}

					{showCode ? (
						<div
							className="wpcd-new-visible-code-variant-1"
							title={`Click here to ${
								couponType === 'Coupon' ? 'copy ' : 'get this '
							}${couponType}`}
						>
							<div className="wpcd-new-iconholder">
								{couponType === 'Coupon' ? scissors : pricetag}
							</div>
							<OneLineInput
								style={{ width: '100%', color: '#347baf' }}
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</div>
					) : (
						<div className="wpcd-new-hidden-code">
							<a href="#" title="Click Here to Show Code">
								<OneLineInput
									style={{ width: '100%' }}
									className="code-text-wpcd"
									placeholder={__('COUPONCODE')}
									value={couponCode}
									onChange={value =>
										setAttributes({
											couponCode: value
										})
									}
								/>
							</a>
						</div>
					)}
				</div>
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<div>
							<div
								style={{
									position: 'relative',
									transform: 'translate(-25%,25%)'
								}}
							>
								<Icon icon="admin-links" />
							</div>
							<URLInput
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
								}
							/>
							<IconButton
								icon={'editor-break'}
								label={__('Apply')}
								type={'submit'}
							/>
						</div>
					)}
				</div>
			</div>
		);
		const template4 = (
			<div className="wpcd-new-pro-style-4">
				<div className="wpcd-new-pro-style-4-content">
					<OneLineInput
						className="wpcd-new-pro-style-4-header editor-plain-text"
						style={{ fontSize: '24px', fontWeight: 600 }}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						placeholder={__(
							'This is the description of the coupon code. Additional details of what the coupon or deal is.'
						)}
						value={couponText}
						onChange={value =>
							setAttributes({
								couponText: value
							})
						}
						keepPlaceholderOnFocus={true}
					/>
				</div>

				<div className="wpcd-new-pro-style-4-coupon-container">
					<div className="wpcd-new-pro-style-4-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
						{showCode ? (
							<div
								className="wpcd-new-visible-code-variant-1"
								title={`Click here to ${
									couponType === 'Coupon'
										? 'copy '
										: 'get this '
								}${couponType}`}
							>
								<div className="wpcd-new-iconholder">
									{couponType === 'Coupon'
										? scissors
										: pricetag}
								</div>
								<OneLineInput
									style={{ width: '100%', color: '#347baf' }}
									placeholder={__('COUPONCODE')}
									value={couponCode}
									onChange={value =>
										setAttributes({
											couponCode: value
										})
									}
								/>
							</div>
						) : (
							<div className="wpcd-new-hidden-code">
								<a href="#" title="Click Here to Show Code">
									<OneLineInput
										style={{ width: '100%' }}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode: value
											})
										}
									/>
								</a>
							</div>
						)}
						{showExpiryDate && couponExpires ? (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{
									color:
										expiryDate > Date.now()
											? 'green'
											: 'red'
								}}
							>
								{(expiryDate > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')) +
									new Date(expiryDate).toLocaleDateString()}
							</div>
						) : (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{ color: 'green' }}
							>
								Doesn't expire
							</div>
						)}
						<URLInput
							autoFocus={false}
							className="wpcd-new-url-input-test button-url"
							value={targetURL}
							onChange={value =>
								props.setAttributes({ targetURL: value })
							}
						/>
					</div>

					<div className="wpcd-new-pro-style-4-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText2}
							onChange={value =>
								setAttributes({ discountText2: value })
							}
						/>
						{showCode ? (
							<div
								className="wpcd-new-visible-code-variant-1"
								title={`Click here to ${
									couponType === 'Coupon'
										? 'copy '
										: 'get this '
								}${couponType}`}
							>
								<div className="wpcd-new-iconholder">
									{couponType === 'Coupon'
										? scissors
										: pricetag}
								</div>
								<OneLineInput
									style={{ width: '100%', color: '#347baf' }}
									placeholder={__('COUPONCODE')}
									value={
										couponType === 'Coupon'
											? couponCode2
											: couponCode
									}
									onChange={value =>
										setAttributes(
											couponType === 'Coupon'
												? {
														couponCode2: value
												  }
												: { couponCode: value }
										)
									}
								/>
							</div>
						) : (
							<div className="wpcd-new-hidden-code">
								<a href="#" title="Click Here to Show Code">
									<OneLineInput
										style={{ width: '100%' }}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode2: value
											})
										}
									/>
								</a>
							</div>
						)}
						{showExpiryDate && coupon2Expires ? (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{
									color:
										expiryDate2 > Date.now()
											? 'green'
											: 'red'
								}}
							>
								{(expiryDate2 > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')) +
									new Date(expiryDate2).toLocaleDateString()}
							</div>
						) : (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{ color: 'green' }}
							>
								Doesn't expire
							</div>
						)}
						<URLInput
							autoFocus={false}
							className="wpcd-new-url-input-test button-url"
							value={targetURL2}
							onChange={value =>
								props.setAttributes({ targetURL2: value })
							}
						/>
					</div>

					<div className="wpcd-new-pro-style-4-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText3}
							onChange={value =>
								setAttributes({ discountText3: value })
							}
						/>
						{showCode ? (
							<div
								className="wpcd-new-visible-code-variant-1"
								title={`Click here to ${
									couponType === 'Coupon'
										? 'copy '
										: 'get this '
								}${couponType}`}
							>
								<div className="wpcd-new-iconholder">
									{couponType === 'Coupon'
										? scissors
										: pricetag}
								</div>
								<OneLineInput
									style={{ width: '100%', color: '#347baf' }}
									placeholder={__('COUPONCODE')}
									value={
										couponType === 'Coupon'
											? couponCode3
											: couponCode
									}
									onChange={value =>
										setAttributes(
											couponType === 'Coupon'
												? {
														couponCode3: value
												  }
												: { couponCode: value }
										)
									}
								/>
							</div>
						) : (
							<div className="wpcd-new-hidden-code">
								<a href="#" title="Click Here to Show Code">
									<OneLineInput
										style={{ width: '100%' }}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode3: value
											})
										}
									/>
								</a>
							</div>
						)}
						{showExpiryDate && coupon3Expires ? (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{
									color:
										expiryDate3 > Date.now()
											? 'green'
											: 'red'
								}}
							>
								{(expiryDate3 > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')) +
									new Date(expiryDate3).toLocaleDateString()}
							</div>
						) : (
							<div
								className="wpcd-new-pro-style-4-expiry"
								style={{ color: 'green' }}
							>
								Doesn't expire
							</div>
						)}
						<URLInput
							autoFocus={false}
							className="wpcd-new-url-input-test button-url"
							value={targetURL3}
							onChange={value =>
								props.setAttributes({ targetURL3: value })
							}
						/>
					</div>
				</div>
				{showSocialLinks && socialPanel}
			</div>
		);
		const template5 = (
			<div
				className="wpcd-new-pro-style-5"
				style={{ borderColor: couponColor }}
			>
				<div className="wpcd-new-pro-style-5-main">
					<div className="wpcd-new-pro-style-5-discount-text">
						<OneLineInput
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
					</div>
					<div className="wpcd-new-pro-style-5-content">
						<OneLineInput
							className="editor-plain-text"
							style={{ fontSize: '21px', fontWeight: 600 }}
							placeholder={__('Sample coupon code')}
							value={couponTitle}
							onChange={value =>
								setAttributes({ couponTitle: value })
							}
						/>
						<RichText
							style={{ width: '100%' }}
							placeholder={__(
								'This is the description of the coupon code. Additional details of what the coupon or deal is.'
							)}
							value={couponText}
							onChange={value =>
								setAttributes({
									couponText: value
								})
							}
							keepPlaceholderOnFocus={true}
						/>
					</div>
					{imgID ? (
						<div className="wpcd-new-pro-style-5-imageholder">
							<img src={imgURL} alt={imgAlt} />
							{isSelected && (
								<Button
									style={{
										position: 'absolute',
										top: 0,
										right: 0
									}}
									onClick={() =>
										setAttributes({
											imgID: null,
											imgURL: null,
											imgAlt: null
										})
									}
								>
									{removeImage}
								</Button>
							)}
						</div>
					) : (
						<div className="wpcd-new-pro-style-5-imageholder">
							{placeholderImage2}
							<MediaUpload
								onSelect={img => {
									setAttributes({
										imgID: img.id,
										imgURL: img.url,
										imgAlt: img.alt
									});
								}}
								type="image"
								value={imgID}
								render={({ open }) => (
									<Button
										className="components-button button button-medium"
										onClick={open}
										style={{
											fontSize: '11px',
											width: '100%'
										}}
									>
										Upload Image
									</Button>
								)}
							/>
						</div>
					)}
				</div>

				<div className="wpcd-new-pro-style-5-expiry-and-code">
					<div
						className="wpcd-new-pro-style-5-expiry"
						style={{ backgroundColor: couponColor }}
					>
						{showExpiryDate && couponExpires ? (
							<div
								style={{
									color:
										expiryDate > Date.now()
											? 'white'
											: 'red'
								}}
							>
								{(expiryDate > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')) +
									new Date(expiryDate).toLocaleDateString()}
							</div>
						) : (
							<div
								style={{
									color: 'white'
								}}
							>
								Doesn't expire
							</div>
						)}
					</div>

					{showCode ? (
						<div
							className="wpcd-new-visible-code"
							title={`Click here to ${
								couponType === 'Coupon' ? 'copy ' : 'get this '
							}${couponType}`}
							style={{ borderColor: couponColor }}
						>
							<OneLineInput
								style={{
									width: '100%',
									color: couponColor,
									fontSize: '18px',
									fontWeight: '600px',
									textAlign: 'center',
									textTransform: 'uppercase'
								}}
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</div>
					) : (
						<div
							className="wpcd-new-hidden-code"
							title="Click Here to Show Code"
						>
							<OneLineInput
								style={{
									width: '100%',
									color: couponColor,
									textAlign: 'center'
								}}
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</div>
					)}
				</div>
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
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
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
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
		);

		const template6 = (
			<div
				className="wpcd-new-pro-style-6"
				style={{ borderColor: couponColor }}
			>
				<div className="wpcd-new-ribbon-container">
					<div
						className="wpcd-new-ribbon"
						style={{ backgroundColor: couponColor }}
					>
						<div
							className="wpcd-new-ribbon-before"
							style={{ borderLeftColor: couponColor }}
						/>
						<OneLineInput
							style={{
								fontWeight: 600,
								fontSize: '22px',
								color: 'white'
							}}
							className="editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
						<div
							className="wpcd-new-ribbon-after"
							style={{ borderRightColor: couponColor }}
						/>
					</div>
				</div>
				<div className="wpcd-new-pro-style-6-coupon-details">
					<OneLineInput
						className="editor-plain-text"
						style={{
							fontSize: '22px',
							fontWeight: 'bolder'
						}}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						placeholder={__(
							'This is the description of the coupon code. Additional details of what the coupon or deal is.'
						)}
						value={couponText}
						onChange={value =>
							setAttributes({
								couponText: value
							})
						}
						keepPlaceholderOnFocus={true}
					/>
					<div
						className="wpcd-new-pro-style-6-expiry"
						style={{ borderColor: couponColor }}
					>
						{showExpiryDate && couponExpires ? (
							<React.Fragment>
								Expires in:
								<Timer
									style={{
										color:
											expiryDate > Date.now()
												? 'black'
												: 'red'
									}}
									deadline={expiryTime}
								/>
							</React.Fragment>
						) : (
							<React.Fragment>Doesn't expire</React.Fragment>
						)}
					</div>
				</div>
				<div className="wpcd-new-pro-style-6-image">
					{imgID ? (
						<React.Fragment>
							<img src={imgURL} alt={imgAlt} />
							{isSelected && (
								<Button
									style={{
										position: 'absolute',
										top: 0,
										right: 0
									}}
									onClick={() =>
										setAttributes({
											imgID: null,
											imgURL: null,
											imgAlt: null
										})
									}
								>
									{removeImage}
								</Button>
							)}
						</React.Fragment>
					) : (
						<React.Fragment>
							{placeholderImage2}
							<MediaUpload
								onSelect={img => {
									setAttributes({
										imgID: img.id,
										imgURL: img.url,
										imgAlt: img.alt
									});
								}}
								type="image"
								value={imgID}
								render={({ open }) => (
									<Button
										className="components-button button button-medium"
										onClick={open}
										style={{
											fontSize: '11px',
											width: '100%'
										}}
									>
										Upload Image
									</Button>
								)}
							/>
						</React.Fragment>
					)}
				</div>

				{showCode ? (
					<div
						className="wpcd-new-visible-code"
						title={`Click here to ${
							couponType === 'Coupon' ? 'copy ' : 'get this '
						}${couponType}`}
						style={{
							borderColor: couponColor,
							borderStyle: 'solid'
						}}
					>
						<OneLineInput
							style={{
								width: '100%',
								color: couponColor,
								fontSize: '15px',
								textAlign: 'center'
							}}
							placeholder={__(
								couponType === 'Coupon'
									? 'COUPONCODE'
									: 'Get this right now'
							)}
							value={couponCode}
							onChange={value =>
								setAttributes({
									couponCode: value
								})
							}
						/>
					</div>
				) : (
					<div className="wpcd-new-hidden-code">
						<a
							title="Click Here to Show Code"
							style={{ borderColor: couponColor }}
						>
							<OneLineInput
								style={{
									width: '100%',
									color: couponColor,
									textAlign: 'center'
								}}
								placeholder={__('COUPONCODE')}
								value={couponCode}
								onChange={value =>
									setAttributes({
										couponCode: value
									})
								}
							/>
						</a>
					</div>
				)}
				{showSocialLinks && socialPanel}
				<div className="wpcd-url-input">
					{isSelected && (
						<form
							key={'form-link'}
							onSubmit={event => event.preventDefault()}
							className={`editor-format-toolbar__link-modal-line flex-container`}
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
								autoFocus={false}
								className="button-url"
								value={targetURL}
								onChange={value =>
									props.setAttributes({ targetURL: value })
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
		);

		let template = [
			defaultStyle,
			alternateStyle,
			template1,
			template2,
			template3,
			template4,
			template5,
			template6
		];

		return [
			isSelected && (
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={__('Select coupon type:')}
							value={couponType}
							onChange={selectedType => {
								if (selectedType === 'Deal') {
									setAttributes({
										couponType: selectedType,
										showCode: true
									});
								} else {
									setAttributes({ couponType: selectedType });
								}
							}}
							options={[
								{ value: 'Coupon', label: __('Coupon') },
								{ value: 'Deal', label: __('Deal') },
								{
									value: 'Image Coupon',
									label: __('Image Coupon')
								}
							]}
						/>
						<SelectControl
							label={__('Select coupon style:')}
							value={couponStyle}
							onChange={selectedStyle =>
								setAttributes({
									couponStyle: parseInt(selectedStyle)
								})
							}
							options={[
								{ value: 0, label: __('Default') },
								{ value: 1, label: __('Alternate') },
								{ value: 2, label: __('Style 1') },
								{ value: 3, label: __('Style 2') },
								{ value: 4, label: __('Style 3') },
								{ value: 5, label: __('Style 4') },
								{ value: 6, label: __('Style 5') },
								{ value: 7, label: __('Style 6') }
							]}
						/>
						<PanelRow>
							{couponType === 'Coupon' && (
								<React.Fragment>
									<label>{__('Show code')}</label>
									<FormToggle
										checked={showCode}
										onChange={() =>
											setAttributes({
												showCode: !showCode
											})
										}
									/>
								</React.Fragment>
							)}
						</PanelRow>
						<PanelRow>
							<label>
								{__(
									'Coupon ' +
										(couponStyle == 5
											? '1 expires'
											: 'expires')
								)}
							</label>
							<FormToggle
								checked={couponExpires}
								onChange={() =>
									setAttributes({
										couponExpires: !couponExpires
									})
								}
							/>
						</PanelRow>
						{couponExpires && (
							<React.Fragment>
								<PanelRow>
									<label>{__('Show expiry date')}</label>
									<FormToggle
										checked={showExpiryDate}
										onChange={() =>
											setAttributes({
												showExpiryDate: !showExpiryDate
											})
										}
									/>
								</PanelRow>
								<PanelRow>
									<b>Expiration Date</b>
								</PanelRow>
								<DateTimePicker
									currentDate={expiryTime * 1000}
									onChange={value => {
										setAttributes({
											expiryTime:
												Math.floor(
													Date.parse(value) / 60000
												) * 60
										});
									}}
								/>
							</React.Fragment>
						)}
						{couponStyle == 5 && (
							<React.Fragment>
								<PanelRow>
									<label>{__('Coupon 2 expires')}</label>
									<FormToggle
										checked={coupon2Expires}
										onChange={() =>
											setAttributes({
												coupon2Expires: !coupon2Expires
											})
										}
									/>
								</PanelRow>
								{coupon2Expires && (
									<React.Fragment>
										<PanelRow>
											<b>
												Expiration Date (Second Coupon)
											</b>
										</PanelRow>
										<DateTimePicker
											currentDate={expiryTime2 * 1000}
											onChange={value => {
												setAttributes({
													expiryTime2:
														Math.floor(
															Date.parse(value) /
																60000
														) * 60
												});
											}}
										/>
									</React.Fragment>
								)}

								<PanelRow>
									<label>{__('Coupon 3 expires')}</label>
									<FormToggle
										checked={coupon3Expires}
										onChange={() =>
											setAttributes({
												coupon3Expires: !coupon3Expires
											})
										}
									/>
								</PanelRow>

								{coupon3Expires && (
									<React.Fragment>
										<PanelRow>
											<b>
												Expiration Date (Third Coupon)
											</b>
										</PanelRow>
										<DateTimePicker
											currentDate={expiryTime3 * 1000}
											onChange={value => {
												setAttributes({
													expiryTime3:
														Math.floor(
															Date.parse(value) /
																60000
														) * 60
												});
											}}
										/>
									</React.Fragment>
								)}
							</React.Fragment>
						)}
						{[6, 7].includes(parseInt(couponStyle)) && (
							<React.Fragment>
								<p>Coupon Theme</p>
								<ColorPalette
									value={couponColor}
									onChange={colorValue =>
										setAttributes({
											couponColor: colorValue
										})
									}
									allowReset
								/>
							</React.Fragment>
						)}
						<PanelRow>
							<label>{__('Show social buttons')}</label>
							<FormToggle
								checked={showSocialLinks}
								onChange={() =>
									setAttributes({
										showSocialLinks: !showSocialLinks
									})
								}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			),
			template[couponStyle]
		];
	},

	save(props) {
		return null;
	}
});

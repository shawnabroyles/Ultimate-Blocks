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
	SelectControl
} = wp.components;

import './style.scss';
import './editor.scss';

import React, { Component } from 'react';
import autosize from 'autosize';
import icon, {
	placeholderImage1,
	placeholderImage2,
	removeImage
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
				className={'wpcd-one-line-input ' + className}
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

		let classes = this.props.className;
		if (timeLeft < 1) classes += ' wpcd-countdown-expired';
		return (
			<span className={classes}>{` ${
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
			default: '#'
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
			default: '#'
		},
		targetURL3: {
			type: 'string',
			default: '#'
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
			discountText,
			discountText2,
			discountText3,
			couponText,
			couponExpires,
			showExpiryDate,
			showCode,
			expiryTime,
			expiryTime2,
			expiryTime3,
			couponStyle,
			couponColor,
			imgURL,
			imgID,
			imgAlt
		} = props.attributes;

		const getDateFrom = unixTime =>
			new Date(unixTime * 1000).setHours(0, 0, 0, 0);

		let expiryDate = getDateFrom(expiryTime); //use when only date is required
		let expiryDate2 = getDateFrom(expiryTime2);
		let expiryDate3 = getDateFrom(expiryTime3);

		const alternateStyle = (
			<div className="wpcd-new-grid-container">
				<div className="wpcd-new-grid-one">
					<OneLineInput
						className="wpcd-new-discount-text editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
					<div class="wpcd-new-coupon-type">{couponType}</div>
					{showExpiryDate && (
						<p className="wpcd-new-expire-text">
							{couponExpires
								? (expiryDate > Date.now()
										? __('Expires on: ')
										: __('Expired on: ')) +
								  new Date(expiryDate).toLocaleDateString()
								: __("Doesn't expire")}
						</p>
					)}
				</div>
				<div className="wpcd-new-grid-two">
					<OneLineInput
						className="wpcd-new-title editor-plain-text"
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						className="wpcd-coupon-description"
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
				<div className="wpcd-new-grid-three">
					<a className="wpcd-new-goto-button" href={targetURL}>
						{__('GO TO THE DEAL')}
					</a>
					<a className="wpcd-new-coupon-code" href={targetURL}>
						<OneLineInput
							className="editor-plain-text"
							placeholder={__('COUPONCODE')}
							value={couponCode}
							onChange={value =>
								setAttributes({ couponCode: value })
							}
						/>
					</a>
					{/*<a className="wpcd-new-coupon-code" href={targetURL}>
						{couponCode ? couponCode : 'COUPONCODE'}
                    </a>*/}
				</div>
				<br />
				<div>
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
			<div
				className="wpcd-coupon-preview wpcd-coupon wpcd-coupon-default"
				style={{ display: 'table' }}
			>
				<div className="wpcd-col-1-8">
					<OneLineInput
						className="wpcd-coupon-discount-text editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
					<div className="coupon-type">{couponType}</div>
				</div>
				<div className="wpcd-coupon-content wpcd-col-7-8">
					<div className="wpcd-coupon-header">
						<div className="wpcd-col-3-4">
							<OneLineInput
								className="wpcd-coupon-title editor-plain-text"
								style={{ fontSize: '21px' }}
								placeholder={__('Sample coupon code')}
								value={couponTitle}
								onChange={value =>
									setAttributes({ couponTitle: value })
								}
							/>
						</div>
						<div className="wpcd-col-1-4">
							{showCode ? (
								<div
									className={`wpcd-${couponType.toLowerCase()}-code`}
								>
									<button
										className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
										data-clipboard-text={couponCode}
									>
										<span
											className={`wpcd_${couponType.toLowerCase()}_icon`}
										/>
										<OneLineInput
											style={{ width: '100%' }}
											className={`${couponType.toLowerCase()}-code-button`}
											placeholder={__('COUPONCODE')}
											value={couponCode}
											onChange={value =>
												setAttributes({
													couponCode: value
												})
											}
										/>
									</button>
								</div>
							) : (
								<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
									{/*DISPLAY ON FRONT-END
                                    <span className="get-code-wpcd">
											{__('Show Code')}
										</span>
                                    */}
									<a
										data-type="code"
										href="#"
										className="coupon-button coupon-code-wpcd masterTooltip"
										title="Click Here to Show Code"
										data-position="top center"
										data-inverted=""
										data-aff-url={targetURL}
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

					<div className="wpcd-extra-content">
						<div className="wpcd-col-3-4">
							<div className="wpcd-coupon-description">
								<RichText
									style={{ width: '100%' }}
									className="wpcd-coupon-description"
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
						</div>

						<div className="wpcd-col-1-4">
							{showExpiryDate && couponExpires ? (
								<div className="with-expiration1">
									<div
										className={
											expiryDate > Date.now()
												? 'wpcd-coupon-expire expire-text-block1'
												: 'wpcd-coupon-expired expired-text-block1'
										}
									>
										{expiryDate > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate
											).toLocaleDateString()}
										</span>
									</div>
								</div>
							) : (
								<div className="wpcd-coupon-expire without-expiration1">
									{__("Doesn't expire")}
								</div>
							)}
						</div>
					</div>
				</div>

				<br />
				<div>
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
			<div
				className="wpcd-coupon-preview wpcd-coupon-one"
				style={{ display: 'block' }}
			>
				<div className="wpcd-col-one-1-8">
					<figure
						className="wpcd-coupon-one-img wpcd-get-featured-img"
						style={{ position: 'relative' }}
					>
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
				</div>
				<div className="wpcd-col-one-7-8">
					<OneLineInput
						className="wpcd-coupon-one-title editor-plain-text"
						style={{ fontSize: '22px', fontWeight: 600 }}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						className="wpcd-coupon-description"
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
				<div className="wpcd-col-one-1-4">
					<OneLineInput
						className="wpcd-coupon-one-discount-text editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
					{showCode ? (
						<div>
							<div
								className={`wpcd-${couponType.toLowerCase()}-code`}
							>
								<button
									className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
									title={`Click here to ${
										couponType === 'Coupon'
											? 'copy '
											: 'get this '
									}${couponType}`}
									data-clipboard-text={couponCode}
								>
									<span
										className={`wpcd_${couponType.toLowerCase()}_icon`}
									/>
									<OneLineInput
										style={{ width: '100%' }}
										className={`${couponType.toLowerCase()}-code-button`}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode: value
											})
										}
									/>
								</button>
							</div>
						</div>
					) : (
						<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
							<a
								data-type="code"
								href="#"
								class="coupon-button coupon-code-wpcd masterTooltip"
								title="Click Here to Show Code"
								data-position="top center"
								data-inverted=""
								data-aff-url={targetURL}
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
							{/*<span className="get-code-wpcd">Show Code</span>*/}
						</div>
					)}
					{showExpiryDate && couponExpires ? (
						<div className="with-expiration1">
							<div
								className={
									expiryDate > Date.now()
										? 'wpcd-coupon-one-expire expire-text-block1'
										: 'wpcd-coupon-one-expired expired-text-block1'
								}
							>
								{expiryDate > Date.now()
									? __('Expires on: ')
									: __('Expired on: ')}
								<span className="expiration-date">
									{new Date(expiryDate).toLocaleDateString()}
								</span>
							</div>
						</div>
					) : (
						<div className="wpcd-coupon-one-expire without-expiration1">
							Doesn't expire
						</div>
					)}
				</div>

				<br />
				<div>
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

		const template2 = (
			<div className="wpcd-coupon-preview wpcd-coupon-two">
				<div className="wpcd-col-two-1-4">
					<figure
						className="wpcd-coupon-two-img wpcd-get-fetured-img"
						style={{ position: 'relative' }}
					>
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
					<OneLineInput
						className="wpcd-coupon-two-discount-text editor-plain-text"
						placeholder={__('Discount Text')}
						value={discountText}
						onChange={value =>
							setAttributes({ discountText: value })
						}
					/>
				</div>
				<div className="wpcd-col-two-3-4">
					<div className="wpcd-coupon-two-header">
						<OneLineInput
							className="wpcd-coupon-two-header editor-plain-text"
							style={{ fontSize: '22px', fontWeight: 600 }}
							placeholder={__('Sample coupon code')}
							value={couponTitle}
							onChange={value =>
								setAttributes({ couponTitle: value })
							}
						/>
					</div>
					<div className="wpcd-coupon-two-info">
						<div className="wpcd-coupon-two-title">
							{showExpiryDate && couponExpires ? (
								<b className="expires-on">
									<span>Expires in:</span>
									<Timer
										className="wpcd-coupon-two-countdown"
										deadline={expiryTime}
									/>
								</b>
							) : (
								<b className="never-expire">Doesn't expire</b>
							)}
						</div>
						<div className="wpcd-coupon-two-coupon">
							{showExpiryDate && couponExpires ? (
								<div
									className={`wpcd-${couponType.toLowerCase()}-code`}
								>
									<button
										className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
										data-clipboard-text={couponCode}
									>
										<span
											className={`wpcd_${couponType.toLowerCase()}_icon`}
										/>
										<OneLineInput
											style={{ width: '100%' }}
											className={`${couponType.toLowerCase()}-code-button`}
											placeholder={__('COUPONCODE')}
											value={couponCode}
											onChange={value =>
												setAttributes({
													couponCode: value
												})
											}
										/>
									</button>
								</div>
							) : (
								<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
									<a
										data-type="code"
										href=""
										className="coupon-button coupon-code-wpcd masterTooltip"
										data-position="top center"
										data-inverted=""
										data-aff-url="http://example.com"
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
										{/*<span className="get-code-wpcd">
										Show Code
                                    </span>*/}
									</a>
								</div>
							)}
						</div>
						<div id="clear" />
					</div>
					<div id="clear" />
					<RichText
						style={{ width: '100%' }}
						className="wpcd-coupon-description"
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

				<br />
				<div>
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

		const template3 = (
			<div
				className="wpcd-coupon-preview wpcd-coupon-three"
				style={{ display: 'block' }}
			>
				<div className="wpcd-coupon-three-content">
					<OneLineInput
						className="wpcd-coupon-three-title editor-plain-text"
						style={{ fontSize: '22px' }}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						style={{ width: '100%' }}
						className="wpcd-coupon-description"
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
				<div className="wpcd-coupon-three-info">
					<div className="wpcd-coupon-three-info-left">
						{showExpiryDate && couponExpires ? (
							<div className="with-expiration1">
								<div
									className={
										expiryDate > Date.now()
											? 'wpcd-coupon-three-expire'
											: 'wpcd-coupon-three-expired expired-text-block1'
									}
								>
									<p
										className={
											expiryDate > Date.now()
												? 'wpcd-coupon-three-expire-text'
												: 'wpcd-coupon-three-expired'
										}
									>
										{expiryDate > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate
											).toLocaleDateString()}
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="wpcd-coupon-three-expire without-expiration1">
								<p>Doesn't expire</p>
							</div>
						)}
					</div>

					{showCode ? (
						<div className="wpcd-coupon-three-coupon">
							<div
								className={`wpcd-${couponType.toLowerCase()}-code`}
							>
								<button
									className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
									title={`Click here to ${
										couponType === 'Coupon'
											? 'copy '
											: 'get this '
									}${couponType}`}
									data-clipboard-text={couponCode}
								>
									<span
										className={`wpcd_${couponType.toLowerCase()}_icon`}
									/>
									<OneLineInput
										style={{ width: '100%' }}
										className={`${couponType.toLowerCase()}-code-button`}
										placeholder={__('COUPONCODE')}
										value={couponCode}
										onChange={value =>
											setAttributes({
												couponCode: value
											})
										}
									/>
								</button>
							</div>
						</div>
					) : (
						<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
							<a
								data-type="code"
								href="#"
								class="coupon-button coupon-code-wpcd masterTooltip"
								title="Click Here to Show Code"
								data-position="top center"
								data-inverted=""
								data-aff-url={targetURL}
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
							{/*<span className="get-code-wpcd">Show Code</span>*/}
						</div>
					)}
				</div>

				<br />
				<div>
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
		const template4 = (
			<div className="wpcd-coupon-preview wpcd-coupon-four">
				<div className="wpcd-coupon-four-content">
					<OneLineInput
						className=" editor-plain-text wpcd-coupon-four-title"
						style={{ fontSize: '24px', fontWeight: 600 }}
						placeholder={__('Sample coupon code')}
						value={couponTitle}
						onChange={value =>
							setAttributes({ couponTitle: value })
						}
					/>
					<RichText
						className="wpcd-coupon-description"
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

				<div className="wpcd-coupon-four-info">
					<div className="wpcd-coupon-four-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="wpcd-coupon-four-discount-text editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
						{showCode ? (
							<div>
								<div
									className={`wpcd-${couponType.toLowerCase()}-code`}
								>
									<button
										className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
										data-clipboard-text={couponCode}
									>
										<span
											className={`wpcd_${couponType.toLowerCase()}_icon`}
										/>
										<OneLineInput
											style={{ width: '100%' }}
											className={`${couponType.toLowerCase()}-code-button`}
											placeholder={__('COUPONCODE')}
											value={couponCode}
											onChange={value =>
												setAttributes({
													couponCode: value
												})
											}
										/>
									</button>
								</div>
							</div>
						) : (
							<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
								<a
									data-type="code"
									href="#"
									class="coupon-button coupon-code-wpcd masterTooltip"
									title="Click Here to Show Code"
									data-position="top center"
									data-inverted=""
									data-aff-url={targetURL}
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
								{/*<span className="get-code-wpcd">Show Code</span>*/}
							</div>
						)}
					</div>
					<div className="wpcd-coupon-four-info-left">
						{showExpiryDate && couponExpires ? (
							<div className="with-expiration1">
								<div
									className={
										expiryDate > Date.now()
											? 'wpcd-coupon-four-expire'
											: 'wpcd-coupon-four-expired expired-text-block1'
									}
								>
									<p
										className={
											expiryDate > Date.now()
												? 'wpcd-coupon-four-expire-text'
												: 'wpcd-coupon-four-expired'
										}
									>
										{expiryDate > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate
											).toLocaleDateString()}
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="wpcd-coupon-four-expire without-expiration1">
								<p>Doesn't expire</p>
							</div>
						)}
					</div>
				</div>

				<div className="wpcd-coupon-four-info">
					<div className="wpcd-coupon-four-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="wpcd-coupon-four-discount-text editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText2}
							onChange={value =>
								setAttributes({ discountText2: value })
							}
						/>
						{showCode ? (
							<div>
								<div
									className={`wpcd-${couponType.toLowerCase()}-code`}
								>
									<button
										className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
									>
										<span
											className={`wpcd_${couponType.toLowerCase()}_icon`}
										/>
										<OneLineInput
											style={{ width: '100%' }}
											className={`${couponType.toLowerCase()}-code-button`}
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
									</button>
								</div>
							</div>
						) : (
							<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
								<a
									data-type="code"
									href="#"
									class="coupon-button coupon-code-wpcd masterTooltip"
									title="Click Here to Show Code"
									data-position="top center"
									data-inverted=""
									data-aff-url={targetURL}
								>
									<OneLineInput
										style={{ width: '100%' }}
										className="code-text-wpcd"
										placeholder={__('COUPONCODE')}
										value={couponCode2}
										onChange={value =>
											setAttributes({
												couponCode2: value
											})
										}
									/>
								</a>
								{/*<span className="get-code-wpcd">Show Code</span>*/}
							</div>
						)}
					</div>
					<div className="wpcd-coupon-four-info-left">
						{showExpiryDate && couponExpires ? (
							<div className="with-expiration-4-2">
								<div
									className={
										expiryDate2 > Date.now()
											? 'wpcd-coupon-four-expire'
											: 'wpcd-coupon-four-expired expired-text-block1'
									}
								>
									<p
										className={
											expiryDate2 > Date.now()
												? 'wpcd-coupon-four-expire-text'
												: 'wpcd-coupon-four-expired'
										}
									>
										{expiryDate2 > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate2
											).toLocaleDateString()}
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="wpcd-coupon-four-expire without-expiration1">
								<p>Doesn't expire</p>
							</div>
						)}
					</div>
				</div>

				<div className="wpcd-coupon-four-info">
					<div className="wpcd-coupon-four-coupon">
						<OneLineInput
							style={{ textAlign: 'center' }}
							className="wpcd-coupon-four-discount-text editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText3}
							onChange={value =>
								setAttributes({ discountText3: value })
							}
						/>
						{showCode ? (
							<div>
								<div
									className={`wpcd-${couponType.toLowerCase()}-code`}
								>
									<button
										className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
									>
										<span
											className={`wpcd_${couponType.toLowerCase()}_icon`}
										/>
										<OneLineInput
											style={{ width: '100%' }}
											className={`${couponType.toLowerCase()}-code-button`}
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
									</button>
								</div>
							</div>
						) : (
							<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
								<a
									data-type="code"
									href="#"
									class="coupon-button coupon-code-wpcd masterTooltip"
									title="Click Here to Show Code"
									data-position="top center"
									data-inverted=""
									data-aff-url={targetURL}
								>
									<OneLineInput
										style={{ width: '100%' }}
										className="code-text-wpcd"
										placeholder={__('COUPONCODE')}
										value={couponCode3}
										onChange={value =>
											setAttributes({
												couponCode3: value
											})
										}
									/>
								</a>
								{/*<span className="get-code-wpcd">Show Code</span>*/}
							</div>
						)}
					</div>
					<div className="wpcd-coupon-four-info-left">
						{showExpiryDate && couponExpires ? (
							<div className="with-expiration-4-3">
								<div
									className={
										expiryDate3 > Date.now()
											? 'wpcd-coupon-four-expire'
											: 'wpcd-coupon-four-expired expired-text-block1'
									}
								>
									<p
										className={
											expiryDate3 > Date.now()
												? 'wpcd-coupon-four-expire-text'
												: 'wpcd-coupon-four-expired'
										}
									>
										{expiryDate3 > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate3
											).toLocaleDateString()}
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="wpcd-coupon-four-expire without-expiration1">
								<p>Doesn't expire</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
		const template5 = (
			<div
				className="wpcd-template-five"
				style={{ borderColor: couponColor }}
			>
				<div className="wpcd-template-five-holder">
					<div className="wpcd-template-five-percent-off">
						<OneLineInput
							className="wpcd-coupon-five-discount-text editor-plain-text"
							placeholder={__('Discount Text')}
							value={discountText}
							onChange={value =>
								setAttributes({ discountText: value })
							}
						/>
					</div>
					<div className="wpcd-template-five-pro-img">
						{placeholderImage2}
					</div>

					<div className="wpcd-template-five-texts">
						<OneLineInput
							className="wpcd-coupon-five-title editor-plain-text"
							style={{ fontSize: '21px', fontWeight: 600 }}
							placeholder={__('Sample coupon code')}
							value={couponTitle}
							onChange={value =>
								setAttributes({ couponTitle: value })
							}
						/>
						<RichText
							style={{ width: '100%' }}
							className="wpcd-coupon-description"
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
				</div>

				<div className="extra-wpcd-template-five-holder">
					<div
						className="wpcd-template-five-exp"
						style={{ backgroundColor: couponColor }}
					>
						<div className="with-expiration1">
							{showExpiryDate && couponExpires ? (
								<div className="wpcd-coupon-five-expire expire-text-block1">
									<p
										className={
											expiryDate > Date.now()
												? 'wpcd-coupon-five-expire expired-text-block1'
												: 'wpcd-coupon-five-expired'
										}
									>
										{expiryDate > Date.now()
											? __('Expires on: ')
											: __('Expired on: ')}
										<span className="expiration-date">
											{new Date(
												expiryDate
											).toLocaleDateString()}
										</span>
									</p>
								</div>
							) : (
								<div className="wpcd-coupon-five-expire without-expiration1">
									<p>Doesn't expire</p>
								</div>
							)}
						</div>
					</div>

					{showCode ? (
						<div
							className={`wpcd-${couponType.toLowerCase()}-code`}
						>
							<a
								className={`wpcd-btn masterTooltip wpcd-${couponType.toLowerCase()}-button`}
								title={`Click here to ${
									couponType === 'Coupon'
										? 'copy '
										: 'get this '
								}${couponType}`}
								data-clipboard-text={couponCode}
								style={{ borderColor: couponColor }}
							>
								<OneLineInput
									style={{
										width: '100%',
										color: couponColor,
										fontSize: '15px',
										textAlign: 'center',
										textTransform: 'uppercase'
									}}
									className={`${couponType.toLowerCase()}-code-button`}
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
					) : (
						<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
							<a
								data-type="code"
								href="#"
								className="coupon-button coupon-code-wpcd masterTooltip"
								data-position="top center"
								data-inverted=""
								data-aff-url="http://example.com"
								title="Click Here to Show Code"
							>
								<OneLineInput
									style={{
										width: '100%',
										color: couponColor,
										textAlign: 'center'
									}}
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

				<br />
				<div>
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
				className="wpcd-coupon-six"
				style={{ borderColor: couponColor }}
			>
				<div className="wpcd-coupon-six-holder">
					<div className="wpcd-coupon-six-percent-off">
						<div className="wpcd-for-ribbon">
							<div
								className="wpcd-ribbon"
								style={{ backgroundColor: couponColor }}
							>
								<div
									className="wpcd-ribbon-before"
									style={{ borderLeftColor: couponColor }}
								/>
								<OneLineInput
									style={{
										fontWeight: 600,
										fontSize: '22px',
										color: 'white'
									}}
									className="wpcd-coupon-six-discount-text editor-plain-text"
									placeholder={__('Discount Text')}
									value={discountText}
									onChange={value =>
										setAttributes({ discountText: value })
									}
								/>
								<div
									className="wpcd-ribbon-after"
									style={{ borderRightColor: couponColor }}
								/>
							</div>
						</div>
					</div>
					<div className="wpcd-coupon-six-texts">
						<div className="texts">
							<OneLineInput
								className="editor-plain-text wpcd-coupon-six-title"
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
								className="wpcd-coupon-description"
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
						<div
							className="exp"
							style={{ borderColor: couponColor }}
						>
							{showExpiryDate && couponExpires ? (
								<b className="expires-on">
									<span>Expires in:</span>
									<Timer
										className="wpcd-coupon-two-countdown"
										deadline={expiryTime}
									/>
								</b>
							) : (
								<b className="never-expire">Doesn't expire</b>
							)}
						</div>
					</div>
					<div className="wpcd-coupon-six-img-and-btn">
						<div className="item-img">
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
							<div>
								<div
									className={`wpcd-${couponType.toLowerCase()}-code wpcd-btn-wrap`}
								>
									<a
										className="wpcd-btn masterTooltip"
										href="#"
										title={`Click here to ${
											couponType === 'Coupon'
												? 'copy '
												: 'get this '
										}${couponType}`}
										data-clipboard-text="(GET THIS RIGHT NOW/couponcode)"
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
											className={`${couponType.toLowerCase()}-code-button`}
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
									</a>
								</div>
							</div>
						) : (
							<div className="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
								<div className="wpcd-btn-wrap">
									<a
										data-type="code"
										href="#"
										className="coupon-button coupon-code-wpcd masterTooltip"
										title="Click Here to Show Code"
										data-position="top center"
										data-inverted=""
										data-aff-url="http://example.com"
										style={{ borderColor: couponColor }}
									>
										<OneLineInput
											style={{
												width: '100%',
												color: couponColor,
												textAlign: 'center'
											}}
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
							</div>
						)}
					</div>
				</div>

				<br />
				<div>
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
							<label>{__('Coupon expires')}</label>
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
								{couponStyle == 5 && (
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

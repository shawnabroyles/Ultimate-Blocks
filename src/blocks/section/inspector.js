// import CSS.
import "./editor.scss";
import icons from "./icons/icons";
import map from "lodash/map";

// Setup the block
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

const { MediaUpload, InspectorControls, ColorPalette } =
	wp.blockEditor || wp.editor;

const {
	Button,
	ButtonGroup,
	TabPanel,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	PanelRow
} = wp.components;

export default class Inspector extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				colSection,
				columns,
				currentTab,
				currentTabOverlay,
				currentTabOverlayTab,
				currentTabOverlayMob,
				mobileSizeGrid,
				tabletSizeGrid,
				selectUnits,
				selectUnitsTab,
				selectUnitsMob,
				marginTopWrap,
				marginBottomWrap,
				marginLeftWrap,
				marginRightWrap,
				paddingTopWrap,
				paddingBottomWrap,
				paddingLeftWrap,
				paddingRightWrap,
				marginTopWrapTab,
				marginLeftWrapTab,
				marginRightWrapTab,
				marginBottomWrapTab,
				marginTopWrapMob,
				marginLeftWrapMob,
				marginRightWrapMob,
				marginBottomWrapMob,
				paddingTopWrapTab,
				paddingLeftWrapTab,
				paddingRightWrapTab,
				paddingBottomWrapTab,
				paddingTopWrapMob,
				paddingLeftWrapMob,
				paddingRightWrapMob,
				paddingBottomWrapMob,
				set_tab_bg,
				set_mob_bg,
				set_tab_bgOv,
				set_mob_bgOv,
				gutter,
				wrapColor,
				wrapColorTab,
				wrapColorMob,
				wrapBorderColor,
				wrapBorderStyle,
				wrapBorderSize,
				wrapBorderRadius,
				wrapBackgroundSize,
				wrapBackgroundPosition,
				wrapBackgroundRepeat,
				wrapBackgroundAttachment,
				wrapBackgroundSizeTab,
				wrapBackgroundPositionTab,
				wrapBackgroundRepeatTab,
				wrapBackgroundAttachmentTab,
				wrapBackgroundSizeMob,
				wrapBackgroundPositionMob,
				wrapBackgroundRepeatMob,
				wrapBackgroundAttachmentMob,
				imgID,
				imgURL,
				imgAlt,
				imgIDtab,
				imgURLtab,
				imgAltTab,
				imgIDmob,
				imgURLmob,
				imgAltMob,
				videoID,
				videoURL,
				videoMuted,
				videoLoop,
				selectTab,
				selectTabTablet,
				selectTabMob,
				gradientType,
				gradientAngle,
				gradientPosition,
				wrapBackgroundOverlay,
				wrapBackgroundOverlayCol,
				wrapGradientOverlay,
				wrapGradientOverlayCol,
				wrapGradientLocation,
				wrapGradientSecondCol,
				wrapGradientSecondLocation,
				gradientTypeTab,
				gradientAngleTab,
				gradientPositionTab,
				wrapBackgroundOverlayTab,
				wrapBackgroundOverlayColTab,
				wrapGradientOverlayTab,
				wrapGradientOverlayColTab,
				wrapGradientLocationTab,
				wrapGradientSecondColTab,
				wrapGradientSecondLocationTab,
				gradientTypeMob,
				gradientAngleMob,
				gradientPositionMob,
				wrapBackgroundOverlayMob,
				wrapBackgroundOverlayColMob,
				wrapGradientOverlayMob,
				wrapGradientOverlayColMob,
				wrapGradientLocationMob,
				wrapGradientSecondColMob,
				wrapGradientSecondLocationMob,
				wrapTag,
				textColor
			},
			setAttributes
		} = this.props;

		const onTabSelect = tabName => setAttributes({ currentTab: tabName });

		const onTabSelectOverlay = tabName =>
			setAttributes({ currentTabOverlay: tabName });

		const onTabSelectOverlayTab = tabName => {
			setAttributes({ currentTabOverlayTab: tabName });
		};

		const onTabSelectOverlayMob = tabName => {
			setAttributes({ currentTabOverlayMob: tabName });
		};

		const mobileGridTwo = [
			{ key: "-equal-two", icon: icons.twocol },
			{ key: "-collapse-row", icon: icons.collapserow }
		];

		const tabletGridTwo = [
			{ key: "-equal-two", icon: icons.twocol },
			{ key: "-collapse-row", icon: icons.collapserow }
		];

		const mobileGridThree = [
			{ key: "-equal-three", icon: icons.threecol },
			{ key: "-first-row", icon: icons.firstrow },
			{ key: "-last-row", icon: icons.lastrow },
			{ key: "-collapse-row", icon: icons.collapserowthree }
		];

		const tabletGridThree = [
			{ key: "-equal-three", icon: icons.threecol },
			{ key: "-first-row", icon: icons.firstrow },
			{ key: "-last-row", icon: icons.lastrow },
			{ key: "-collapse-row", icon: icons.collapserowthree }
		];

		const mobileGridFour = [
			{ key: "-equal-four", icon: icons.fourcol },
			{ key: "-two-grid", icon: icons.grid },
			{ key: "-collapse-four-row", icon: icons.collapserowfour }
		];

		const tabletGridFour = [
			{ key: "-equal-four", icon: icons.fourcol },
			{ key: "-two-grid", icon: icons.grid },
			{ key: "-collapse-four-row", icon: icons.collapserowfour }
		];

		const mobileGridFive = [
			{ key: "-equal-two", icon: icons.fivecol },
			{ key: "-collapse-row", icon: icons.collapserowfive }
		];

		const tabletGridFive = [
			{ key: "-equal-two", icon: icons.fivecol },
			{ key: "-collapse-row", icon: icons.collapserowfive }
		];

		const mobileGridSix = [
			{ key: "-equal-two", icon: icons.sixcol },
			{ key: "-collapse-row", icon: icons.collapserowsix }
		];

		const tabletGridSix = [
			{ key: "-equal-two", icon: icons.sixcol },
			{ key: "-collapse-row", icon: icons.collapserowsix }
		];

		const columnTypeTwo = [
			{ key: "equal-two", col: 2, One: "50%", Two: "50%", icon: icons.twocol },
			{
				key: "left-golden",
				col: 2,
				One: "66%",
				Two: "33%",
				icon: icons.twoleftgolden
			},
			{
				key: "right-golden",
				col: 2,
				One: "33%",
				Two: "66%",
				icon: icons.tworightgolden
			}
		];

		const columnTypeThree = [
			{
				key: "equal-three",
				col: 3,
				One: "33%",
				Two: "33%",
				Three: "33%",
				icon: icons.threecol
			},
			{
				key: "left-half",
				col: 3,
				One: "50%",
				Two: "25%",
				Three: "25%",
				icon: icons.lefthalf
			},
			{
				key: "right-half",
				col: 3,
				One: "25%",
				Two: "25%",
				Three: "50%",
				icon: icons.righthalf
			},
			{
				key: "center-half",
				col: 3,
				One: "25%",
				Two: "50%",
				Three: "25%",
				icon: icons.centerhalf
			},
			{
				key: "center-wide",
				col: 3,
				One: "20%",
				Two: "60%",
				Three: "20%",
				icon: icons.widecenter
			},
			{
				key: "center-exwide",
				col: 3,
				One: "15%",
				Two: "70%",
				Three: "15%",
				icon: icons.exwidecenter
			}
		];

		const columnTypeFour = [
			{
				key: "equal-four",
				col: 4,
				One: "25%",
				Two: "25%",
				Three: "25%",
				Four: "25%",
				icon: icons.fourcol
			},
			{
				key: "left-forty",
				col: 4,
				One: "40%",
				Two: "20%",
				Three: "20%",
				Four: "20%",
				icon: icons.lfourforty
			},
			{
				key: "right-forty",
				col: 4,
				One: "20%",
				Two: "20%",
				Three: "20%",
				Four: "40%",
				icon: icons.rfourforty
			}
		];

		const columnTypeFive = [
			{
				key: "equal-five",
				col: 5,
				One: "20%",
				Two: "20%",
				Three: "20%",
				Four: "20%",
				Five: "20%",
				icon: icons.fivecol
			}
		];

		const columnTypeSix = [
			{
				key: "equal-six",
				col: 6,
				One: "16,3%",
				Two: "16,3%",
				Three: "16,3%",
				Four: "16,3%",
				Six: "16,3%",
				icon: icons.sixcol
			}
		];

		let selectTypeColumn;
		let mobileGrid;
		let tabletGrid;

		if (columns == 2) {
			selectTypeColumn = columnTypeTwo;
			mobileGrid = mobileGridTwo;
			tabletGrid = tabletGridTwo;
		} else if (columns == 3) {
			selectTypeColumn = columnTypeThree;
			mobileGrid = mobileGridThree;
			tabletGrid = tabletGridThree;
		} else if (columns == 4) {
			selectTypeColumn = columnTypeFour;
			mobileGrid = mobileGridFour;
			tabletGrid = tabletGridFour;
		} else if (columns == 5) {
			selectTypeColumn = columnTypeFive;
			mobileGrid = mobileGridFive;
			tabletGrid = tabletGridFive;
		} else if (columns == 6) {
			selectTypeColumn = columnTypeSix;
			mobileGrid = mobileGridSix;
			tabletGrid = tabletGridSix;
		}

		const availableUnits = ["px", "vh", "%", "rem", "em"];

		const selectGrid = props => (
			<Fragment>
				<div className="ub-select-layout-grid">
					<p>
						{__("Select column type for column: ")}
						{columns}{" "}
					</p>
					<ButtonGroup aria-label={__("Select Type Column")}>
						{map(
							selectTypeColumn,
							({ key, icon, col, One, Two, Three, Four }) => (
								<Button
									key={key}
									className={
										colSection === key
											? `ub-section-btn-select`
											: `ub-section-btn`
									}
									isSmall
									onClick={_ =>
										setAttributes({
											colSection: key,
											columns: col,
											colWidthOne: One,
											colWidthTwo: Two,
											colWidthThree: Three,
											colWidthFour: Four,
											inspectorTypeColumn: true
										})
									}
								>
									{icon}
								</Button>
							)
						)}
					</ButtonGroup>
					<TabPanel
						className="ub-inspect-tabs"
						activeClass="active-tab"
						initialTabName={currentTab}
						onSelect={onTabSelect}
						tabs={[
							{
								name: "tablet",
								title: __("Tablet"),
								className: "ub-tablet-tab"
							},
							{
								name: "mobile",
								title: __("Mobile"),
								className: "ub-mobile-tab"
							}
						]}
					>
						{tab => {
							let tabout;
							if (tab.name) {
								if ("mobile" === tab.name) {
									tabout = (
										<div>
											<ButtonGroup aria-label={__("Select Type Column")}>
												{map(mobileGrid, ({ key, icon }) => (
													<Button
														key={key}
														className={
															mobileSizeGrid === key
																? `ub-section-btn-select`
																: `ub-section-btn`
														}
														isSmall
														onClick={props =>
															setAttributes({
																mobileSizeGrid: key
															})
														}
													>
														{icon}
													</Button>
												))}
											</ButtonGroup>
											<PanelBody
												title={__("Mobile Margin | Padding")}
												initialOpen={false}
											>
												<div className="ub-layout-wrap-select-units-mob ">
													<style>
														{`.ub-layout-wrap-select-units-mob .components-button-group .components-button:nth-child(${availableUnits.indexOf(
															selectUnitsMob
														) +
															1}) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }`}
													</style>
													<p className="selectUnitsMob">{__("Select units")}</p>
													<ButtonGroup>
														{availableUnits.map(unit => (
															<Button
																onClick={_ => {
																	setAttributes({
																		selectUnitsMob: unit
																	});
																}}
															>
																{unit}
															</Button>
														))}
													</ButtonGroup>
												</div>
												<div className="ub-layout-wrap_margin_box">
													<div className="margin-st_box1">
														<RangeControl
															value={marginTopWrapMob}
															onChange={value =>
																setAttributes({
																	marginTopWrapMob: value
																})
															}
															min={0}
															max={100}
														/>
													</div>
													<div className="margin-st_box2">
														<div className="margin-col-1">
															<RangeControl
																value={marginLeftWrapMob}
																onChange={value =>
																	setAttributes({
																		marginLeftWrapMob: value
																	})
																}
																min={0}
																max={100}
															/>
														</div>
														<div className="margin-col-2">
															<div className="padding-st_box1">
																<p>Padding</p>
																<RangeControl
																	value={paddingTopWrapMob}
																	onChange={value =>
																		setAttributes({
																			paddingTopWrapMob: value
																		})
																	}
																	min={0}
																	max={100}
																/>
															</div>
															<div className="padding-st_box2">
																<div className="padding-col-1">
																	<RangeControl
																		value={paddingLeftWrapMob}
																		onChange={value =>
																			setAttributes({
																				paddingLeftWrapMob: value
																			})
																		}
																		min={0}
																		max={100}
																	/>
																</div>
																<div className="padding-col-2">
																	<p>Content</p>
																</div>
																<div className="padding-col-3">
																	<RangeControl
																		value={paddingRightWrapMob}
																		onChange={value =>
																			setAttributes({
																				paddingRightWrapMob: value
																			})
																		}
																		min={0}
																		max={100}
																	/>
																</div>
															</div>
															<div className="padding-st_box3">
																<RangeControl
																	value={paddingBottomWrapMob}
																	onChange={value =>
																		setAttributes({
																			paddingBottomWrapMob: value
																		})
																	}
																	min={0}
																	max={100}
																/>
															</div>
														</div>
														<div className="margin-col-3">
															<RangeControl
																value={marginRightWrapMob}
																onChange={value =>
																	setAttributes({
																		marginRightWrapMob: value
																	})
																}
																min={0}
																max={100}
															/>
														</div>
													</div>
													<div className="margin-st_box3">
														<RangeControl
															value={marginBottomWrapMob}
															onChange={value =>
																setAttributes({
																	marginBottomWrapMob: value
																})
															}
															min={0}
															max={100}
														/>
													</div>
												</div>
											</PanelBody>
											<PanelBody
												title={__("Mobile Background")}
												initialOpen={false}
											>
												<PanelRow className="ub-set-bg-mob">
													<ToggleControl
														className="ub-set-toggle-control"
														label={__("Set custom background for mobile?")}
														checked={set_mob_bg}
														onChange={set_mob_bg => {
															setAttributes({ set_mob_bg });
														}}
													/>
													{set_mob_bg && (
														<Fragment>
															<p>{__("Background Color")}</p>
															<ColorPalette
																value={wrapColorMob}
																onChange={value =>
																	setAttributes({ wrapColorMob: value })
																}
																allowReset
															/>
															<p>{__("Background Image")}</p>
															<div className="ub-image-inspector-panel">
																{imgURLmob ? (
																	<Fragment>
																		<img
																			src={imgURLmob}
																			id={imgIDmob}
																			alt={imgAltMob}
																		/>
																		<Button
																			className="components-button button button-medium"
																			onClick={_ =>
																				setAttributes({
																					imgURLmob: "",
																					imgIDmob: "",
																					imgAltMob: ""
																				})
																			}
																		>
																			{__("Delete Image")}
																		</Button>
																		<SelectControl
																			label={__("Background Image Size")}
																			value={wrapBackgroundSizeMob}
																			options={[
																				{ value: "cover", label: __("Cover") },
																				{
																					value: "contain",
																					label: __("Contain")
																				},
																				{ value: "auto", label: __("Auto") }
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundSizeMob: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Position")}
																			value={wrapBackgroundPositionMob}
																			options={[
																				{
																					value: "center top",
																					label: __("Center Top")
																				},
																				{
																					value: "center center",
																					label: __("Center Center")
																				},
																				{
																					value: "center bottom",
																					label: __("Center Bottom")
																				},
																				{
																					value: "left top",
																					label: __("Left Top")
																				},
																				{
																					value: "left center",
																					label: __("Left Center")
																				},
																				{
																					value: "left bottom",
																					label: __("Left Bottom")
																				},
																				{
																					value: "right top",
																					label: __("Right Top")
																				},
																				{
																					value: "right center",
																					label: __("Right Center")
																				},
																				{
																					value: "right bottom",
																					label: __("Right Bottom")
																				}
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundPositionMob: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Repeat")}
																			value={wrapBackgroundRepeatMob}
																			options={[
																				{
																					value: "no-repeat",
																					label: __("No Repeat")
																				},
																				{
																					value: "repeat",
																					label: __("Repeat")
																				},
																				{
																					value: "repeat-x",
																					label: __("Repeat-x")
																				},
																				{
																					value: "repeat-y",
																					label: __("Repeat-y")
																				}
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundRepeatMob: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Attachment")}
																			value={wrapBackgroundAttachmentMob}
																			options={[
																				{
																					value: "scroll",
																					label: __("Scroll")
																				},
																				{ value: "fixed", label: __("Fixed") }
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundAttachmentMob: value
																				})
																			}
																		/>
																	</Fragment>
																) : (
																	<MediaUpload
																		onSelect={img =>
																			setAttributes({
																				imgIDmob: img.id,
																				imgURLmob: img.url,
																				imgAltMob: img.alt
																			})
																		}
																		type="image"
																		value={imgIDmob}
																		render={({ open }) => (
																			<Button
																				className="components-button button button-medium"
																				onClick={open}
																			>
																				{__("Upload Image")}
																			</Button>
																		)}
																	/>
																)}
															</div>
														</Fragment>
													)}
												</PanelRow>
											</PanelBody>
											<PanelBody
												className="ub-overlay-setting"
												title={__("Mobile Background Overlay")}
												initialOpen={false}
											>
												<PanelRow className="ub-set-bg-mob">
													<ToggleControl
														className="ub-set-toggle-control"
														label={__(
															"Set custom background overlay for mobile?"
														)}
														checked={set_mob_bgOv}
														onChange={set_mob_bgOv => {
															setAttributes({ set_mob_bgOv });
														}}
													/>
													{set_mob_bgOv && (
														<TabPanel
															className="ub-inspect-tabs"
															activeClass="active-tab"
															initialTabName={currentTabOverlayMob}
															onSelect={onTabSelectOverlayMob}
															tabs={[
																{
																	name: "Standard",
																	title: __("Standard"),
																	className: "ub-standard-tab"
																},
																{
																	name: "Gradient",
																	title: __("Gradient"),
																	className: "ub-gradient-tab"
																}
															]}
														>
															{tab => {
																let tabres;
																if (tab.name) {
																	if ("Standard" == tab.name) {
																		tabres = (
																			<Fragment>
																				<p>{__("Overlay Opacity")}</p>
																				<RangeControl
																					value={wrapBackgroundOverlayMob}
																					onChange={value =>
																						setAttributes({
																							wrapBackgroundOverlayMob: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Overlay Color")}</p>
																				<ColorPalette
																					value={wrapBackgroundOverlayColMob}
																					onChange={value =>
																						setAttributes({
																							wrapBackgroundOverlayColMob: value
																						})
																					}
																					allowReset
																				/>
																				{setAttributes({
																					selectTabMob: tab.name
																				})}
																			</Fragment>
																		);
																	} else if ("Gradient" == tab.name) {
																		tabres = (
																			<Fragment>
																				<p>{__("Overlay Opacity")}</p>
																				<RangeControl
																					value={wrapGradientOverlayMob}
																					onChange={value =>
																						setAttributes({
																							wrapGradientOverlayMob: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Color")}</p>
																				<ColorPalette
																					value={wrapGradientOverlayColMob}
																					onChange={value =>
																						setAttributes({
																							wrapGradientOverlayColMob: value
																						})
																					}
																					allowReset
																				/>
																				<p>{__("Location")}</p>
																				<RangeControl
																					value={wrapGradientLocationMob}
																					onChange={value =>
																						setAttributes({
																							wrapGradientLocationMob: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Second Color")}</p>
																				<ColorPalette
																					value={wrapGradientSecondColMob}
																					onChange={value =>
																						setAttributes({
																							wrapGradientSecondColMob: value
																						})
																					}
																					allowReset
																				/>
																				<p>{__("Location")}</p>
																				<RangeControl
																					value={wrapGradientSecondLocationMob}
																					onChange={value =>
																						setAttributes({
																							wrapGradientSecondLocationMob: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<SelectControl
																					label={__("Gradient Type")}
																					value={gradientTypeMob}
																					options={[
																						{
																							value: "linear",
																							label: __("Linear")
																						},
																						{
																							value: "radial",
																							label: __("Radial")
																						}
																					]}
																					onChange={value =>
																						setAttributes({
																							gradientTypeMob: value
																						})
																					}
																				/>
																				{gradientTypeMob === "linear" ? (
																					<Fragment>
																						<p>{__("Gradient Angle")}</p>
																						<RangeControl
																							value={gradientAngleMob}
																							onChange={value =>
																								setAttributes({
																									gradientAngleMob: value
																								})
																							}
																							min={0}
																							max={360}
																						/>
																					</Fragment>
																				) : (
																					<SelectControl
																						label={__("Gradient Position")}
																						value={gradientPositionMob}
																						options={[
																							{
																								value: "center top",
																								label: __("Center Top")
																							},
																							{
																								value: "center center",
																								label: __("Center Center")
																							},
																							{
																								value: "center bottom",
																								label: __("Center Bottom")
																							},
																							{
																								value: "left top",
																								label: __("Left Top")
																							},
																							{
																								value: "left center",
																								label: __("Left Center")
																							},
																							{
																								value: "left bottom",
																								label: __("Left Bottom")
																							},
																							{
																								value: "right top",
																								label: __("Right Top")
																							},
																							{
																								value: "right center",
																								label: __("Right Center")
																							},
																							{
																								value: "right bottom",
																								label: __("Right Bottom")
																							}
																						]}
																						onChange={value =>
																							setAttributes({
																								gradientPositionMob: value
																							})
																						}
																					/>
																				)}
																			</Fragment>
																		);
																		{
																			setAttributes({ selectTabMob: tab.name });
																		}
																	}
																}
																return <div>{tabres}</div>;
															}}
														</TabPanel>
													)}
												</PanelRow>
											</PanelBody>
										</div>
									);
								} else if ("tablet" === tab.name) {
									tabout = (
										<div>
											<ButtonGroup aria-label={__("Select Type Column")}>
												{map(tabletGrid, ({ key, icon }) => (
													<Button
														key={key}
														className={
															tabletSizeGrid === key
																? `ub-section-btn-select`
																: `ub-section-btn`
														}
														isSmall
														onClick={props =>
															setAttributes({
																tabletSizeGrid: key
															})
														}
													>
														{icon}
													</Button>
												))}
											</ButtonGroup>
											<PanelBody
												title={__("Tablet Margin | Padding")}
												initialOpen={false}
											>
												<div className="ub-layout-wrap-select-units">
													<style>
														{`.ub-layout-wrap-select-units-tab .components-button-group .components-button:nth-child(${availableUnits.indexOf(
															selectUnitsTab
														) +
															1}) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }`}
													</style>
													<p className="selectUnitsTab">{__("Select units")}</p>
													<ButtonGroup>
														{availableUnits.map(unit => (
															<Button
																onClick={_ =>
																	setAttributes({
																		selectUnitsTab: unit
																	})
																}
															>
																{unit}
															</Button>
														))}
													</ButtonGroup>
												</div>
												<div className="ub-layout-wrap_margin_box">
													<div className="margin-st_box1">
														<RangeControl
															value={marginTopWrapTab}
															onChange={value =>
																setAttributes({
																	marginTopWrapTab: value
																})
															}
															min={0}
															max={100}
														/>
													</div>
													<div className="margin-st_box2">
														<div className="margin-col-1">
															<RangeControl
																value={marginLeftWrapTab}
																onChange={value =>
																	setAttributes({
																		marginLeftWrapTab: value
																	})
																}
																min={0}
																max={100}
															/>
														</div>
														<div className="margin-col-2">
															<div className="padding-st_box1">
																<p>{__("Padding")}</p>
																<RangeControl
																	value={paddingTopWrapTab}
																	onChange={value =>
																		setAttributes({
																			paddingTopWrapTab: value
																		})
																	}
																	min={0}
																	max={100}
																/>
															</div>
															<div className="padding-st_box2">
																<div className="padding-col-1">
																	<RangeControl
																		value={paddingLeftWrapTab}
																		onChange={value =>
																			setAttributes({
																				paddingLeftWrapTab: value
																			})
																		}
																		min={0}
																		max={100}
																	/>
																</div>
																<div className="padding-col-2">
																	<p>{__("Content")}</p>
																</div>
																<div className="padding-col-3">
																	<RangeControl
																		value={paddingRightWrapTab}
																		onChange={value =>
																			setAttributes({
																				paddingRightWrapTab: value
																			})
																		}
																		min={0}
																		max={100}
																	/>
																</div>
															</div>
															<div className="padding-st_box3">
																<RangeControl
																	value={paddingBottomWrapTab}
																	onChange={value =>
																		setAttributes({
																			paddingBottomWrapTab: value
																		})
																	}
																	min={0}
																	max={100}
																/>
															</div>
														</div>
														<div className="margin-col-3">
															<RangeControl
																value={marginRightWrapTab}
																onChange={value =>
																	setAttributes({
																		marginRightWrapTab: value
																	})
																}
																min={0}
																max={100}
															/>
														</div>
													</div>
													<div className="margin-st_box3">
														<RangeControl
															value={marginBottomWrapTab}
															onChange={value =>
																setAttributes({
																	marginBottomWrapTab: value
																})
															}
															min={0}
															max={100}
														/>
													</div>
												</div>
											</PanelBody>
											<PanelBody
												title={__("Tablet Background")}
												initialOpen={false}
											>
												<PanelRow className="ub-set-bg-tab">
													<ToggleControl
														className="ub-set-toggle-control"
														label={__("Set custom background for tablet?")}
														checked={set_tab_bg}
														onChange={set_tab_bg => {
															setAttributes({ set_tab_bg });
														}}
													/>
													{set_tab_bg && (
														<Fragment>
															<p>{__("Background Color")}</p>
															<ColorPalette
																value={wrapColorTab}
																onChange={value =>
																	setAttributes({ wrapColorTab: value })
																}
																allowReset
															/>
															<p>{__("Background Image")}</p>
															<div className="ub-image-inspector-panel">
																{imgURLtab ? (
																	<Fragment>
																		<img
																			src={imgURLtab}
																			id={imgIDtab}
																			alt={imgAltTab}
																		/>
																		<Button
																			className="components-button button button-medium"
																			onClick={_ =>
																				setAttributes({
																					imgURLtab: "",
																					imgIDtab: "",
																					imgAltTab: ""
																				})
																			}
																		>
																			{__("Delete Image")}
																		</Button>
																		<SelectControl
																			label={__("Background Image Size")}
																			value={wrapBackgroundSizeTab}
																			options={[
																				{ value: "cover", label: __("Cover") },
																				{
																					value: "contain",
																					label: __("Contain")
																				},
																				{ value: "auto", label: __("Auto") }
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundSizeTab: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Position")}
																			value={wrapBackgroundPositionTab}
																			options={[
																				{
																					value: "center top",
																					label: __("Center Top")
																				},
																				{
																					value: "center center",
																					label: __("Center Center")
																				},
																				{
																					value: "center bottom",
																					label: __("Center Bottom")
																				},
																				{
																					value: "left top",
																					label: __("Left Top")
																				},
																				{
																					value: "left center",
																					label: __("Left Center")
																				},
																				{
																					value: "left bottom",
																					label: __("Left Bottom")
																				},
																				{
																					value: "right top",
																					label: __("Right Top")
																				},
																				{
																					value: "right center",
																					label: __("Right Center")
																				},
																				{
																					value: "right bottom",
																					label: __("Right Bottom")
																				}
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundPositionTab: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Repeat")}
																			value={wrapBackgroundRepeatTab}
																			options={[
																				{
																					value: "no-repeat",
																					label: __("No Repeat")
																				},
																				{
																					value: "repeat",
																					label: __("Repeat")
																				},
																				{
																					value: "repeat-x",
																					label: __("Repeat-x")
																				},
																				{
																					value: "repeat-y",
																					label: __("Repeat-y")
																				}
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundRepeatTab: value
																				})
																			}
																		/>
																		<SelectControl
																			label={__("Background Image Attachment")}
																			value={wrapBackgroundAttachmentTab}
																			options={[
																				{
																					value: "scroll",
																					label: __("Scroll")
																				},
																				{ value: "fixed", label: __("Fixed") }
																			]}
																			onChange={value =>
																				setAttributes({
																					wrapBackgroundAttachmentTab: value
																				})
																			}
																		/>
																	</Fragment>
																) : (
																	<MediaUpload
																		onSelect={img =>
																			setAttributes({
																				imgIDtab: img.id,
																				imgURLtab: img.url,
																				imgAltTab: img.alt
																			})
																		}
																		type="image"
																		value={imgIDtab}
																		render={({ open }) => (
																			<Button
																				className="components-button button button-medium"
																				onClick={open}
																			>
																				{__("Upload Image")}
																			</Button>
																		)}
																	/>
																)}
															</div>
														</Fragment>
													)}
												</PanelRow>
											</PanelBody>
											<PanelBody
												className="ub-overlay-setting"
												title={__("Tablet Background Overlay")}
												initialOpen={false}
											>
												<PanelRow className="ub-set-bg-tab">
													<ToggleControl
														className="ub-set-toggle-control"
														label={__(
															"Set custom background overlay for tablet?"
														)}
														checked={set_tab_bgOv}
														onChange={set_tab_bgOv => {
															setAttributes({ set_tab_bgOv });
														}}
													/>
													{set_tab_bgOv && (
														<TabPanel
															className="ub-inspect-tabs"
															activeClass="active-tab"
															initialTabName={currentTabOverlayTab}
															onSelect={onTabSelectOverlayTab}
															tabs={[
																{
																	name: "Standard",
																	title: __("Standard"),
																	className: "ub-standard-tab"
																},
																{
																	name: "Gradient",
																	title: __("Gradient"),
																	className: "ub-gradient-tab"
																}
															]}
														>
															{tab => {
																let tabres;
																if (tab.name) {
																	if ("Standard" == tab.name) {
																		tabres = (
																			<Fragment>
																				<p>{__("Overlay Opacity")}</p>
																				<RangeControl
																					value={wrapBackgroundOverlayTab}
																					onChange={value =>
																						setAttributes({
																							wrapBackgroundOverlayTab: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Overlay Color")}</p>
																				<ColorPalette
																					value={wrapBackgroundOverlayColTab}
																					onChange={value =>
																						setAttributes({
																							wrapBackgroundOverlayColTab: value
																						})
																					}
																					allowReset
																				/>
																				{setAttributes({
																					selectTabTablet: tab.name
																				})}
																			</Fragment>
																		);
																	} else if ("Gradient" == tab.name) {
																		tabres = (
																			<Fragment>
																				<p>{__("Overlay Opacity")}</p>
																				<RangeControl
																					value={wrapGradientOverlayTab}
																					onChange={value =>
																						setAttributes({
																							wrapGradientOverlayTab: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Color")}</p>
																				<ColorPalette
																					value={wrapGradientOverlayColTab}
																					onChange={value =>
																						setAttributes({
																							wrapGradientOverlayColTab: value
																						})
																					}
																					allowReset
																				/>
																				<p>{__("Location")}</p>
																				<RangeControl
																					value={wrapGradientLocationTab}
																					onChange={value =>
																						setAttributes({
																							wrapGradientLocationTab: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<p>{__("Second Color")}</p>
																				<ColorPalette
																					value={wrapGradientSecondColTab}
																					onChange={value =>
																						setAttributes({
																							wrapGradientSecondColTab: value
																						})
																					}
																					allowReset
																				/>
																				<p>{__("Location")}</p>
																				<RangeControl
																					value={wrapGradientSecondLocationTab}
																					onChange={value =>
																						setAttributes({
																							wrapGradientSecondLocationTab: value
																						})
																					}
																					min={0}
																					max={100}
																				/>
																				<SelectControl
																					label={__("Gradient Type")}
																					value={gradientTypeTab}
																					options={[
																						{
																							value: "linear",
																							label: __("Linear")
																						},
																						{
																							value: "radial",
																							label: __("Radial")
																						}
																					]}
																					onChange={value =>
																						setAttributes({
																							gradientTypeTab: value
																						})
																					}
																				/>
																				{gradientTypeTab === "linear" ? (
																					<Fragment>
																						<p>{__("Gradient Angle")}</p>
																						<RangeControl
																							value={gradientAngleTab}
																							onChange={value =>
																								setAttributes({
																									gradientAngleTab: value
																								})
																							}
																							min={0}
																							max={360}
																						/>
																					</Fragment>
																				) : (
																					<SelectControl
																						label={__("Gradient Position")}
																						value={gradientPositionTab}
																						options={[
																							{
																								value: "center top",
																								label: __("Center Top")
																							},
																							{
																								value: "center center",
																								label: __("Center Center")
																							},
																							{
																								value: "center bottom",
																								label: __("Center Bottom")
																							},
																							{
																								value: "left top",
																								label: __("Left Top")
																							},
																							{
																								value: "left center",
																								label: __("Left Center")
																							},
																							{
																								value: "left bottom",
																								label: __("Left Bottom")
																							},
																							{
																								value: "right top",
																								label: __("Right Top")
																							},
																							{
																								value: "right center",
																								label: __("Right Center")
																							},
																							{
																								value: "right bottom",
																								label: __("Right Bottom")
																							}
																						]}
																						onChange={value =>
																							setAttributes({
																								gradientPositionTab: value
																							})
																						}
																					/>
																				)}
																			</Fragment>
																		);
																		{
																			setAttributes({
																				selectTabTablet: tab.name
																			});
																		}
																	}
																}
																return <div>{tabres}</div>;
															}}
														</TabPanel>
													)}
												</PanelRow>
											</PanelBody>
										</div>
									);
								}
							}
							return <div>{tabout}</div>;
						}}
					</TabPanel>
					<SelectControl
						label={__("Size Gutter")}
						value={gutter}
						options={[
							{ value: "0px", label: __("None 0px") },
							{ value: "4px", label: __("Small 4px") },
							{ value: "12px", label: __("Medium 12px") },
							{ value: "34px", label: __("Large 34px") },
							{ value: "88px", label: __("Huge 88px") }
						]}
						onChange={value => setAttributes({ gutter: value })}
					/>
					<p>Space between each column.</p>
				</div>
			</Fragment>
		);

		const startSetting = (
			<Fragment>
				<PanelBody
					title={__("Margin | Padding | Border Wrap")}
					initialOpen={false}
				>
					<div className="ub-layout-wrap-select-units">
						<style>
							{`.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(${availableUnits.indexOf(
								selectUnits
							) +
								1}) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }`}
						</style>
						<p>{__("Select units")}</p>
						<ButtonGroup>
							{availableUnits.map(unit => (
								<Button
									onClick={_ =>
										setAttributes({
											selectUnits: unit
										})
									}
								>
									{unit}
								</Button>
							))}
						</ButtonGroup>
					</div>
					<div className="ub-layout-wrap_margin_box">
						<div className="margin-st_box1">
							<RangeControl
								value={marginTopWrap}
								onChange={value =>
									setAttributes({
										marginTopWrap: value
									})
								}
								min={0}
								max={100}
							/>
						</div>
						<div className="margin-st_box2">
							<div className="margin-col-1">
								<RangeControl
									value={marginLeftWrap}
									onChange={value =>
										setAttributes({
											marginLeftWrap: value
										})
									}
									min={0}
									max={100}
								/>
							</div>
							<div className="margin-col-2">
								<div className="padding-st_box1">
									<p>Padding</p>
									<RangeControl
										value={paddingTopWrap}
										onChange={value =>
											setAttributes({
												paddingTopWrap: value
											})
										}
										min={0}
										max={100}
									/>
								</div>
								<div className="padding-st_box2">
									<div className="padding-col-1">
										<RangeControl
											value={paddingLeftWrap}
											onChange={value =>
												setAttributes({
													paddingLeftWrap: value
												})
											}
											min={0}
											max={100}
										/>
									</div>
									<div className="padding-col-2">
										<p>Content</p>
									</div>
									<div className="padding-col-3">
										<RangeControl
											value={paddingRightWrap}
											onChange={value =>
												setAttributes({
													paddingRightWrap: value
												})
											}
											min={0}
											max={100}
										/>
									</div>
								</div>
								<div className="padding-st_box3">
									<RangeControl
										value={paddingBottomWrap}
										onChange={value =>
											setAttributes({
												paddingBottomWrap: value
											})
										}
										min={0}
										max={100}
									/>
								</div>
							</div>
							<div className="margin-col-3">
								<RangeControl
									value={marginRightWrap}
									onChange={value =>
										setAttributes({
											marginRightWrap: value
										})
									}
									min={0}
									max={100}
								/>
							</div>
						</div>
						<div className="margin-st_box3">
							<RangeControl
								value={marginBottomWrap}
								onChange={value =>
									setAttributes({
										marginBottomWrap: value
									})
								}
								min={0}
								max={100}
							/>
						</div>
					</div>
					<p>{__("Border Color")}</p>
					<ColorPalette
						value={wrapBorderColor}
						onChange={value =>
							setAttributes({
								wrapBorderColor: value
							})
						}
						allowReset
					/>
					<SelectControl
						label={__("Border Style")}
						value={wrapBorderStyle}
						options={[
							{ value: "none", label: __("None") },
							{ value: "solid", label: __("Solid") },
							{ value: "dotted", label: __("Dotted") },
							{ value: "dashed", label: __("Dashed") },
							{ value: "double", label: __("Double") },
							{ value: "groove", label: __("Groove") },
							{ value: "ridge", label: __("Ridge") },
							{ value: "inset", label: __("Inset") },
							{ value: "Outset", label: __("Outset") }
						]}
						onChange={value => setAttributes({ wrapBorderStyle: value })}
					/>
					<RangeControl
						label={__("Border Size")}
						value={wrapBorderSize}
						onChange={value =>
							setAttributes({
								wrapBorderSize: value
							})
						}
						min={0}
						max={50}
					/>
					<RangeControl
						label={__("Border Radius")}
						value={wrapBorderRadius}
						onChange={value =>
							setAttributes({
								wrapBorderRadius: value
							})
						}
						min={0}
						max={50}
					/>
				</PanelBody>
				<PanelBody title={__("Background Setting Wrap")} initialOpen={false}>
					<p>{__("Background Color")}</p>
					<ColorPalette
						value={wrapColor}
						onChange={value => setAttributes({ wrapColor: value })}
						allowReset
					/>
					<p>{__("Background Image")}</p>
					<div className="ub-image-inspector-panel">
						{imgURL ? (
							<Fragment>
								<img src={imgURL} id={imgID} alt={imgAlt} />
								<Button
									className="components-button button button-medium"
									onClick={_ =>
										setAttributes({
											imgURL: "",
											imgID: "",
											imgAlt: ""
										})
									}
								>
									{__("Delete Image")}
								</Button>
								<SelectControl
									label={__("Background Image Size")}
									value={wrapBackgroundSize}
									options={[
										{ value: "cover", label: __("Cover") },
										{ value: "contain", label: __("Contain") },
										{ value: "auto", label: __("Auto") }
									]}
									onChange={value =>
										setAttributes({ wrapBackgroundSize: value })
									}
								/>
								<SelectControl
									label={__("Background Image Position")}
									value={wrapBackgroundPosition}
									options={[
										{ value: "center top", label: __("Center Top") },
										{ value: "center center", label: __("Center Center") },
										{ value: "center bottom", label: __("Center Bottom") },
										{ value: "left top", label: __("Left Top") },
										{ value: "left center", label: __("Left Center") },
										{ value: "left bottom", label: __("Left Bottom") },
										{ value: "right top", label: __("Right Top") },
										{ value: "right center", label: __("Right Center") },
										{ value: "right bottom", label: __("Right Bottom") }
									]}
									onChange={value =>
										setAttributes({ wrapBackgroundPosition: value })
									}
								/>
								<SelectControl
									label={__("Background Image Repeat")}
									value={wrapBackgroundRepeat}
									options={[
										{ value: "no-repeat", label: __("No Repeat") },
										{ value: "repeat", label: __("Repeat") },
										{ value: "repeat-x", label: __("Repeat-x") },
										{ value: "repeat-y", label: __("Repeat-y") }
									]}
									onChange={value =>
										setAttributes({ wrapBackgroundRepeat: value })
									}
								/>
								<SelectControl
									label={__("Background Image Attachment")}
									value={wrapBackgroundAttachment}
									options={[
										{ value: "scroll", label: __("Scroll") },
										{ value: "fixed", label: __("Fixed") }
									]}
									onChange={value =>
										setAttributes({ wrapBackgroundAttachment: value })
									}
								/>
							</Fragment>
						) : (
							<MediaUpload
								onSelect={img =>
									setAttributes({
										imgID: img.id,
										imgURL: img.url,
										imgAlt: img.alt
									})
								}
								type="image"
								value={imgID}
								render={({ open }) => (
									<Button
										className="components-button button button-medium"
										onClick={open}
									>
										{__("Upload Image")}
									</Button>
								)}
							/>
						)}
					</div>
					<p>{__("Background Video")}</p>
					<div className="ub-video-inspector-panel">
						{videoURL ? (
							<Fragment>
								<video autoplay loop muted id={videoID} src={videoURL} />
								<Button
									className="components-button button button-medium"
									onClick={_ =>
										setAttributes({
											videoURL: "",
											videoID: ""
										})
									}
								>
									{__("Delete Video")}
								</Button>
								<ToggleControl
									label={__("Mute Video")}
									checked={videoMuted}
									onChange={videoMuted => setAttributes({ videoMuted })}
								/>
								<ToggleControl
									label={__("Loop Video")}
									checked={videoLoop}
									onChange={videoLoop => setAttributes({ videoLoop })}
								/>
							</Fragment>
						) : (
							<MediaUpload
								onSelect={video =>
									setAttributes({
										videoID: video.id,
										videoURL: video.url
									})
								}
								type="video"
								allowedTypes={["video"]}
								value={videoID}
								render={({ open }) => (
									<Button
										className="components-button button button-medium"
										onClick={open}
									>
										{__("Upload Video")}
									</Button>
								)}
							/>
						)}
					</div>
				</PanelBody>
				<PanelBody
					className="ub-overlay-setting"
					title={__("Background Overlay Setting")}
					initialOpen={false}
				>
					<TabPanel
						className="ub-inspect-tabs"
						activeClass="active-tab"
						initialTabName={currentTabOverlay}
						onSelect={onTabSelectOverlay}
						tabs={[
							{
								name: "Standard",
								title: __("Standard"),
								className: "ub-standard-tab"
							},
							{
								name: "Gradient",
								title: __("Gradient"),
								className: "ub-gradient-tab"
							}
						]}
					>
						{tab => {
							let tabres;
							if (tab.name) {
								if ("Standard" == tab.name) {
									tabres = (
										<Fragment>
											<p>{__("Overlay Opacity")}</p>
											<RangeControl
												value={wrapBackgroundOverlay}
												onChange={value =>
													setAttributes({ wrapBackgroundOverlay: value })
												}
												min={0}
												max={100}
											/>
											<p>Overlay Color</p>
											<ColorPalette
												value={wrapBackgroundOverlayCol}
												onChange={value =>
													setAttributes({ wrapBackgroundOverlayCol: value })
												}
												allowReset
											/>
											{setAttributes({ selectTab: tab.name })}
										</Fragment>
									);
								} else if ("Gradient" == tab.name) {
									tabres = (
										<Fragment>
											<p>{__("Overlay Opacity")}</p>
											<RangeControl
												value={wrapGradientOverlay}
												onChange={value =>
													setAttributes({ wrapGradientOverlay: value })
												}
												min={0}
												max={100}
											/>
											<p>{__("Color")}</p>
											<ColorPalette
												value={wrapGradientOverlayCol}
												onChange={value =>
													setAttributes({ wrapGradientOverlayCol: value })
												}
												allowReset
											/>
											<p>{"Location"}</p>
											<RangeControl
												value={wrapGradientLocation}
												onChange={value =>
													setAttributes({ wrapGradientLocation: value })
												}
												min={0}
												max={100}
											/>
											<p>{__("Second Color")}</p>
											<ColorPalette
												value={wrapGradientSecondCol}
												onChange={value =>
													setAttributes({ wrapGradientSecondCol: value })
												}
												allowReset
											/>
											<p>{__("Location")}</p>
											<RangeControl
												value={wrapGradientSecondLocation}
												onChange={value =>
													setAttributes({ wrapGradientSecondLocation: value })
												}
												min={0}
												max={100}
											/>
											<SelectControl
												label={__("Gradient Type")}
												value={gradientType}
												options={[
													{ value: "linear", label: __("Linear") },
													{ value: "radial", label: __("Radial") }
												]}
												onChange={value =>
													setAttributes({ gradientType: value })
												}
											/>
											{gradientType === "linear" ? (
												<Fragment>
													<p>{__("Gradient Angle")}</p>
													<RangeControl
														value={gradientAngle}
														onChange={value =>
															setAttributes({ gradientAngle: value })
														}
														min={0}
														max={360}
													/>
												</Fragment>
											) : (
												<SelectControl
													label={__("Gradient Position")}
													value={gradientPosition}
													options={[
														{ value: "center top", label: __("Center Top") },
														{
															value: "center center",
															label: __("Center Center")
														},
														{
															value: "center bottom",
															label: __("Center Bottom")
														},
														{ value: "left top", label: __("Left Top") },
														{ value: "left center", label: __("Left Center") },
														{ value: "left bottom", label: __("Left Bottom") },
														{ value: "right top", label: __("Right Top") },
														{
															value: "right center",
															label: __("Right Center")
														},
														{ value: "right bottom", label: __("Right Bottom") }
													]}
													onChange={value =>
														setAttributes({ gradientPosition: value })
													}
												/>
											)}
										</Fragment>
									);
									{
										setAttributes({ selectTab: tab.name });
									}
								}
							}
							return <div>{tabres}</div>;
						}}
					</TabPanel>
				</PanelBody>
				<PanelBody title={__("Stucture Setting")} initialOpen={false}>
					<SelectControl
						label={__("Wrap HTML tag")}
						value={wrapTag}
						options={[
							{ value: "div", label: __("div") },
							{ value: "header", label: __("header") },
							{ value: "section", label: __("section") },
							{ value: "article", label: __("article") },
							{ value: "main", label: __("main") },
							{ value: "aside", label: __("aside") },
							{ value: "footer", label: __("footer") }
						]}
						onChange={value => setAttributes({ wrapTag: value })}
					/>
				</PanelBody>
				<PanelBody title={__("Text Color Setting")} initialOpen={false}>
					<p>{__("Text Color")}</p>
					<ColorPalette
						value={textColor}
						onChange={value => setAttributes({ textColor: value })}
						allowReset
					/>
				</PanelBody>
			</Fragment>
		);

		return [
			<Fragment>
				<InspectorControls>{selectGrid}</InspectorControls>
				<InspectorControls>{startSetting}</InspectorControls>
			</Fragment>
		];
	}
}

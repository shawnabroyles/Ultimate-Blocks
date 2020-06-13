const { __ } = wp.i18n;
const { Button } = wp.components;
const { InnerBlocks } = wp.blockEditor || wp.editor;

import { Component } from "react";
import {
	oneCol,
	twoCols,
	twoLeftGolden,
	twoRightGolden,
	threeCols,
	leftHalf,
	rightHalf,
	centerHalf,
	wideCenter,
	exWideCenter,
	fourCol,
	lFourForty,
	rFourForty,
	fiveCol,
	sixCol,
} from "../icons";

export class SelectionScreen extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { columnCount, updateColumnCount, setColumnWidths } = this.props;
		return (
			<div>
				{__("Number of columns:")}
				{[...Array(6).keys()].map((a) => (
					<Button
						isSelected={columnCount === a + 1}
						onClick={(_) => updateColumnCount(a + 1)}
					>
						{a + 1}
					</Button>
				))}
				<br />
				{__("Select column style")}
				<div className="ub-section-selector">
					{columnCount === 1 && <div>{oneCol}</div>}
					{columnCount === 2 && [
						<div onClick={(_) => setColumnWidths([50, 50])}>{twoCols}</div>,
						<div onClick={(_) => setColumnWidths([66.67, 33.33])}>
							{twoLeftGolden}
						</div>,
						<div onClick={(_) => setColumnWidths([33.33, 66.67])}>
							{twoRightGolden}
						</div>,
					]}
					{columnCount === 3 && [
						<div onClick={(_) => setColumnWidths([33.33, 33.33, 33.34])}>
							{threeCols}
						</div>,
						<div onClick={(_) => setColumnWidths([50, 25, 25])}>
							{leftHalf}
						</div>,
						<div onClick={(_) => setColumnWidths([25, 25, 50])}>
							{rightHalf}
						</div>,
						<div onClick={(_) => setColumnWidths([25, 50, 25])}>
							{centerHalf}
						</div>,
						<div onClick={(_) => setColumnWidths([20, 60, 20])}>
							{wideCenter}
						</div>,
						<div onClick={(_) => setColumnWidths([15, 70, 15])}>
							{exWideCenter}
						</div>,
					]}
					{columnCount === 4 && [
						<div onClick={(_) => setColumnWidths([25, 25, 25, 25])}>
							{fourCol}
						</div>,
						<div onClick={(_) => setColumnWidths([40, 20, 20, 20])}>
							{lFourForty}
						</div>,
						<div onClick={(_) => setColumnWidths([20, 20, 20, 40])}>
							{rFourForty}
						</div>,
					]}
					{columnCount === 5 && (
						<div onClick={(_) => setColumnWidths(Array(5).fill(20))}>
							{fiveCol}
						</div>
					)}
					{columnCount === 6 && (
						<div
							onClick={(_) =>
								setColumnWidths([...Array(4).fill(16.67), 16.66, 16.66])
							}
						>
							{sixCol}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeHandle: -1,
			mouseIsPressed: false,
			mouseLoc: 0,
		};
	}

	componentDidMount() {
		window.addEventListener("mouseup", this.mouseUp.bind(this));
		window.addEventListener("mousemove", this.mouseMove.bind(this));
	}

	mouseUp() {
		if (this.state.activeHandle > -1) {
			this.setState({ activeHandle: -1 });
			this.props.setAttributes({
				columnWidths: this.props.attributes.columnWidths.map(
					(w) => Math.round(w * 100) / 100
				),
			});
		}
	}

	mouseMove(e) {
		const { activeHandle } = this.state;
		const {
			attributes: { columnWidths },
			setAttributes,
		} = this.props;
		const columnLocs = columnWidths.map((_, i) =>
			columnWidths.reduce((sum, curr, index) => sum + (index <= i ? curr : 0))
		);
		const minimumWidth = 15;

		if (activeHandle > -1) {
			const minVal =
				minimumWidth + (activeHandle === 0 ? 0 : columnLocs[activeHandle - 1]);
			const maxVal =
				(activeHandle < columnLocs.length - 2
					? columnLocs[activeHandle + 1]
					: 100) - minimumWidth;

			const percentage =
				Math.round(
					((e.clientX - this.container.getBoundingClientRect().left) /
						this.container.clientWidth) *
						10000
				) / 100;

			let change = 0;
			if (percentage >= minVal) {
				if (percentage <= maxVal) {
					change = percentage - columnLocs[activeHandle];
				} else {
					change = maxVal - columnLocs[activeHandle];
				}
			} else {
				change = columnLocs[activeHandle] - minVal;
			}
			setAttributes({
				columnWidths: [
					...columnWidths.slice(0, activeHandle),
					columnWidths[activeHandle] + change,
					columnWidths[activeHandle + 1] - change,
					...columnWidths.slice(activeHandle + 2),
				],
			});
		}
	}

	render() {
		const {
			attributes: { columnWidths },
			block,
		} = this.props;

		const { activeHandle } = this.state;

		return (
			<div className="ub-section-container">
				<div className="ub-section-column-backgrounds">
					{block.innerBlocks.map((innerblock) => (
						<div
							style={{ backgroundColor: innerblock.attributes.backgroundColor }}
						></div>
					))}
				</div>
				<div
					className="ub-section-resize-container"
					ref={(container) => {
						this.container = container;
					}}
				>
					{columnWidths.map(
						(c, i) =>
							i < columnWidths.length - 1 && (
								<div>
									<div
										className="ub-section-resize-label-container"
										style={{
											left: `${
												columnWidths.reduce(
													(sum, curr, index) => sum + (index <= i ? curr : 0)
												) - 15
											}%`,
										}}
									>
										<div className="ub-section-resize-labels">
											<div
												className={`ub-section-resize-label ${
													activeHandle === i ? "" : "ub-hide"
												}`}
											>
												{`${Math.round((c + Number.EPSILON) * 100) / 100}%`}
											</div>
											<div
												className={`ub-section-resize-label ${
													activeHandle === i ? "" : "ub-hide"
												}`}
											>
												{`${
													Math.round(
														(columnWidths[i + 1] + Number.EPSILON) * 100
													) / 100
												}%`}
											</div>
										</div>
										<div className="ub-section-resize-labels">
											<div
												className={`ub-section-resize-label ${
													activeHandle === i ? "" : "ub-hide"
												}`}
											>
												{`${Math.round((c + Number.EPSILON) * 100) / 100}%`}
											</div>
											<div
												className={`ub-section-resize-label ${
													activeHandle === i ? "" : "ub-hide"
												}`}
											>
												{`${
													Math.round(
														(columnWidths[i + 1] + Number.EPSILON) * 100
													) / 100
												}%`}
											</div>
										</div>
									</div>
									<div
										className="ub-section-resize-handle"
										style={{
											left: `${columnWidths.reduce(
												(sum, curr, index) => sum + (index <= i ? curr : 0)
											)}%`,
										}}
										onMouseDown={(_) => this.setState({ activeHandle: i })}
									/>
								</div>
							)
					)}
				</div>
				<InnerBlocks
					template={[]} //initially empty
					templateLock={false}
					allowedBlocks={["ub/section-column"]}
				/>
				<style>
					{/**get background color attribute of each child block and use them here */}
					{`#ub-section-${
						block.clientId
					} .ub-section-container > .block-editor-inner-blocks > .block-editor-block-list__layout, #ub-section-${
						block.clientId
					} .ub-section-column-backgrounds{
					grid-template-columns: ${columnWidths.reduce(
						(output, currentNum) => output + `${currentNum}% `,
						""
					)};
					}
				`}
				</style>
			</div>
		);
	}
}

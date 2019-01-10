import icon, { RegularCountdownIcon, CircularCountdownIcon } from './icon';

import { Component } from 'react';

import Circle from './CircularCountdown';

import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, BlockControls } = wp.editor;
const { DateTimePicker, Toolbar, Button } = wp.components;

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = { timeLeft: this.remainingTime() };
	}
	remainingTime = () => {
		return this.props.deadline - Math.floor(Date.now() / 1000);
	};
	componentDidMount() {
		this.tick = setInterval(this.ticker, 1000); //debugging
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
				timeLeft: newProps.deadline - Math.floor(Date.now() / 1000)
			});
			this.tick = setInterval(this.ticker, 1000);
		}
	}
	componentDidUpdate() {
		console.log(this.state.timeLeft);
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

		const defaultFormat = (
			<p>{`${weeks}:${days}:${hours}:${minutes}:${seconds}`}</p>
		);

		const circularFormat = (
			<div className="ub_countdown_circular_container">
				<Circle amount={weeks} total={52} />
				<Circle amount={days} total={7} />
				<Circle amount={hours} total={24} />
				<Circle amount={minutes} total={60} />
				<Circle amount={seconds} total={60} />
				<p>Weeks</p>
				<p>Days</p>
				<p>Hours</p>
				<p>Minutes</p>
				<p>Seconds</p>
				{timeLeft <= 0 && <p>Time's up!</p>}
			</div>
		);

		let selectedFormat;

		switch (this.props.timerStyle) {
			case 'Regular':
				selectedFormat = defaultFormat;
				break;
			case 'Circular':
				selectedFormat = circularFormat;
				break;
			default:
				selectedFormat = defaultFormat;
		}
		return selectedFormat;
	}
}

registerBlockType('ub/countdown', {
	title: __('Countdown'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('Countdown'), __('Timer'), __('Ultimate Blocks')],
	attributes: {
		endDate: {
			type: 'number',
			default: 60000 * (1440 + Math.ceil(Date.now() / 60000)) // 24 hours from Date.now
		},
		style: {
			type: 'string',
			default: 'Regular' //available types: Regular, Circular, Odometer
		}
	},

	edit(props) {
		const { isSelected, setAttributes } = props;
		const { style, endDate } = props.attributes;
		return [
			isSelected && (
				<BlockControls>
					<Toolbar>
						<Button
							onClick={() => setAttributes({ style: 'Regular' })}
						>
							{RegularCountdownIcon}
						</Button>
						<Button
							onClick={() => setAttributes({ style: 'Circular' })}
						>
							{CircularCountdownIcon}
						</Button>
					</Toolbar>
				</BlockControls>
			),
			isSelected && (
				<InspectorControls>
					<DateTimePicker
						currentDate={endDate * 1000}
						onChange={value => {
							console.log(value);
							setAttributes({
								endDate: Math.floor(Date.parse(value) / 1000)
							});
						}}
					/>
				</InspectorControls>
			),
			<Timer timerStyle={style} deadline={endDate} />
		];
	},

	save() {
		return null;
	}
});

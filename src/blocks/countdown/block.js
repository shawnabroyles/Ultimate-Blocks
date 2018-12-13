import icon from './icon';

import { Component } from 'react';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { DateTimePicker } = wp.components;

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = { timeLeft: this.remainingTime() };
	}
	remainingTime = () => {
		return Math.ceil((Date.parse(this.props.deadline) - Date.now()) / 1000);
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
				timeLeft: Math.ceil(
					(Date.parse(newProps.deadline) - Date.now()) / 1000
				)
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
		const days = (timeLeft - hours * 3600 - minutes * 60 - seconds) / 86400;
		return <p>{`${days}:${hours}:${minutes}:${seconds}`}</p>;
	}
}

registerBlockType('ub/countdown', {
	title: __('Countdown'),
	icon: icon,
	category: 'ultimateblocks',
	keywords: [__('Countdown'), __('Timer'), __('Ultimate Blocks')],
	attributes: {
		endDate: {
			type: 'string',
			default: new Date(
				60000 * (1440 + Math.ceil(Date.now() / 60000)) // 24 hours from Date.now
			).toISOString() //should be unix time
		}
	},

	edit(props) {
		const { isSelected, setAttributes } = props;
		const { endDate } = props.attributes;
		return [
			isSelected && (
				<InspectorControls>
					<DateTimePicker
						currentDate={endDate}
						onChange={value => setAttributes({ endDate: value })}
					/>
				</InspectorControls>
			),
			<Timer deadline={endDate} />
		];
	},

	save() {
		return null;
	}
});

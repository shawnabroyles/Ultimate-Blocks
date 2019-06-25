const { RichText } = wp.editor;
import richTextToHTML from '../../common';

export const version_1_1_2 = props => {
	return (
		<div className={props.className}>
			<div className={props.attributes.ub_selected_notify}>
				<p className="ub_notify_text">
					{props.attributes.ub_notify_info}
				</p>
			</div>
		</div>
	);
};

export const version_1_1_4 = props => {
	const { align, ub_notify_info, ub_selected_notify } = props.attributes;
	return (
		<div className={props.className}>
			<div className={ub_selected_notify}>
				<RichText.Content
					tagName="p"
					style={{ textAlign: align }}
					value={ub_notify_info}
				/>
			</div>
		</div>
	);
};

export const version_1_1_5 = props => {
	const { align, ub_notify_info, ub_selected_notify } = props.attributes;
	return (
		<div className={props.className}>
			<div className={ub_selected_notify}>
				<RichText.Content
					tagName="p"
					className={'ub_notify_text'}
					style={{ textAlign: align }}
					value={ub_notify_info}
				/>
			</div>
		</div>
	);
};

const oldAttributes = {
	ub_notify_info: {
		type: 'array',
		source: 'children',
		selector: '.ub_notify_text'
	},
	ub_selected_notify: {
		type: 'string',
		default: 'ub_notify_info'
	},
	align: {
		type: 'string',
		default: 'left'
	}
};

export const convertToNew = sourceVersion => {
	return {
		attributes: oldAttributes,
		migrate: attributes => {
			const { ub_notify_info, ub_selected_notify, align } = attributes;
			return {
				notifyInfo: ub_notify_info
					.map(item =>
						typeof item === 'string' ? item : richTextToHTML(item)
					)
					.join(''),
				selectedNotify: ub_selected_notify,
				align: align
			};
		},
		save: sourceVersion
	};
};

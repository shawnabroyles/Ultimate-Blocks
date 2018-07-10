const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	ColorPalette,
} = wp.editor;
const {
	PanelColor,
	PanelBody,
	TextControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const { attributes, onTargetChange } = this.props;
		// if ( ! attributes.selectedItem ) {
		// 	attributes.selectedItem tableItems[ 0 ];
		// }
		return (
			// <InspectorControls>
			// 	<PanelColor
			// 		title={ __('Active Tab Color' ) }
			// 		colorValue={ this.props.attributes.backgroundColor }
			// 		initialOpen={ true }
			// 	>
			// 		<ColorPalette
			// 			value={ this.props.attributes.backgroundColor }
			// 			onChange={ this.props.onBackgroundColorChange }
			// 			allowReset
			// 		/>
			// 	</PanelColor>
			// </InspectorControls>
			<InspectorControls>
				<PanelBody title={ __( 'Target ID' ) } initialOpen={ false }>
					{ attributes.selectedItem && <TextControl
						label={ __( 'Enter Target ID' ) }
						placeholder="e.g section-1"
						value={ attributes.selectedItem.target }
						onChange={ onTargetChange }
					/> }
				</PanelBody>
			</InspectorControls>
		);
	}
}

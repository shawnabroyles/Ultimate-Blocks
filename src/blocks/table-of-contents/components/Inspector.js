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
		const { attributes, onTargetChange, onTextColorChange } = this.props;
		return (
			<InspectorControls>
				<PanelColor
					title={ __( 'Background Color' ) }
					colorValue={ this.props.attributes.backgroundColor }
					initialOpen={ true }
				>
					<ColorPalette
						value={ this.props.attributes.backgroundColor }
						onChange={ this.props.onBackgroundColorChange }
						allowReset
					/>
				</PanelColor>
				<PanelColor
					title={ __( 'Text Color' ) }
					colorValue={ this.props.attributes.textColor }
					initialOpen={ true }
				>
					<ColorPalette
						value={ this.props.attributes.textColor }
						onChange={ this.props.onTextColorChange }
						allowReset
					/>
				</PanelColor>
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

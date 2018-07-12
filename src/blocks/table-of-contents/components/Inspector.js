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
	DropdownMenu,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const { attributes, onTargetChange, onTextColorChange, onBackgroundColorChange, onBulletStyleChange } = this.props;
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Target ID' ) } initialOpen={ true }>
					{ attributes.selectedItem && <TextControl
						label={ __( 'Html element ID' ) }
						placeholder="e.g #section-1"
						value={ attributes.selectedItem.target }
						onChange={ onTargetChange }
					/> }
				</PanelBody>
				<PanelBody title={ __( 'Bullet Style' ) } initialOpen={ true }>
					<DropdownMenu
						label="Bullet Style"
						controls={ [
							{
								title: 'Disc',
								icon: 'editor-ul',
								onClick: () => onBulletStyleChange( 'disc' )
							},
							{
								title: 'Numeric',
								icon: 'editor-ol',
								onClick: () => onBulletStyleChange( 'numeric' )
							},
						] }
					/>
				</PanelBody>
				<PanelColor
					title={ __( 'Background Color' ) }
					colorValue={ this.props.attributes.backgroundColor }
					initialOpen={ true }
				>
					<ColorPalette
						value={ this.props.attributes.backgroundColor }
						onChange={ onBackgroundColorChange }
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
						onChange={ onTextColorChange }
						allowReset
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}

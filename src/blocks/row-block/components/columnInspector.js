// Setup the block
const { __ } = wp.i18n;

const {
    Component,
    Fragment,
} = wp.element;

const {
    MediaUpload,
    InnerBlocks,
    InspectorControls,
    ColorPalette,
} = wp.blockEditor || wp.editor;

const {
    Button,
    ButtonGroup,
    Tooltip,
    TabPanel,
    TextControl,
    IconButton,
    Dashicon,
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
} = wp.components;

export default class ColumnInspector extends Component {
    constructor(){
        super( ...arguments );
    }

    render() {
       const {
           attributes: {
               columnBgColor,
               columnImgID,
               columnImgURL,
               columnImgAlt,
               columnBgSize,
               columnBgRepeat,
               columnBgPosition,
               columnBgAttachment,
           },
           setAttributes,
       } = this.props;

       const InspectorColStart = (
           <Fragment>
               <p>Background Color</p>
               <ColorPalette
                   value={ columnBgColor }
                   onChange={ value =>
                       setAttributes({ columnBgColor: value })
                   }
                   allowReset
               />
               <p>Background Image</p>
               <div className="ub-image-inspector-panel">
                   { columnImgURL ? (
                       <Fragment>
                           <img src={columnImgURL} id={columnImgID} alt={columnImgAlt}/>
                           <Button
                               className="components-button button button-medium"
                               onClick = {({props}) => {
                                   setAttributes({
                                       columnImgURL: '',
                                       columnImgID: '',
                                       columnImgAlt: '',
                                   })
                               }}
                           >
                               Delete Image
                           </Button>
                           <SelectControl
                               label={ __( 'Background Image Size' ) }
                               value={ columnBgSize }
                               options={ [
                                   { value: 'cover', label: __( 'Cover' ) },
                                   { value: 'contain', label: __( 'Contain' ) },
                                   { value: 'auto', label: __( 'Auto' ) },
                               ] }
                               onChange={ value => setAttributes( { columnBgSize: value } ) }
                           />
                           <SelectControl
                               label={ __( 'Background Image Position' ) }
                               value={ columnBgPosition }
                               options={ [
                                   { value: 'center top', label: __( 'Center Top' ) },
                                   { value: 'center center', label: __( 'Center Center' ) },
                                   { value: 'center bottom', label: __( 'Center Bottom' ) },
                                   { value: 'left top', label: __( 'Left Top' ) },
                                   { value: 'left center', label: __( 'Left Center' ) },
                                   { value: 'left bottom', label: __( 'Left Bottom' ) },
                                   { value: 'right top', label: __( 'Right Top' ) },
                                   { value: 'right center', label: __( 'Right Center' ) },
                                   { value: 'right bottom', label: __( 'Right Bottom' ) },
                               ] }
                               onChange={ value => setAttributes( { columnBgPosition: value } ) }
                           />
                           <SelectControl
                               label={ __( 'Background Image Repeat' ) }
                               value={ columnBgRepeat }
                               options={ [
                                   { value: 'no-repeat', label: __( 'No Repeat' ) },
                                   { value: 'repeat', label: __( 'Repeat' ) },
                                   { value: 'repeat-x', label: __( 'Repeat-x' ) },
                                   { value: 'repeat-y', label: __( 'Repeat-y' ) },
                               ] }
                               onChange={ value => setAttributes( { columnBgRepeat: value } ) }
                           />
                           <SelectControl
                               label={ __( 'Background Image Attachment' ) }
                               value={ columnBgAttachment }
                               options={ [
                                   { value: 'scroll', label: __( 'Scroll' ) },
                                   { value: 'fixed', label: __( 'Fixed' ) },
                               ] }
                               onChange={ value => setAttributes( { columnBgAttachment: value } ) }
                           />
                       </Fragment>
                   ) : (
                       <MediaUpload
                           onSelect={img =>
                               setAttributes({
                                   columnImgID: img.id,
                                   columnImgURL: img.url,
                                   columnImgAlt: img.alt
                               })
                           }
                           type="image"
                           value={columnImgID}
                           render={({open}) => (
                               <Button
                                   className="components-button button button-medium"
                                   onClick={open}
                               >
                                   {__('Upload Image')}
                               </Button>
                           )}
                       />
                   )}
               </div>
           </Fragment>
       );

       return[
           <Fragment>
              <InspectorControls>
                  {InspectorColStart}
              </InspectorControls>
           </Fragment>
        ]
    }
}
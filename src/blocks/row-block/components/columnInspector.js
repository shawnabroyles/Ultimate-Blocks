//Import icons layout
import icons from '../icons/icons';

//Import External
import map from 'lodash/map';

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
               columnBorderColor,
               columnBorderStyle,
               columnBorderSize,
               columnBorderRadius,
               columnBorderTop,
               columnBorderLeft,
               columnBorderRight,
               columnBorderBottom,
               columnBrTopRadius,
               columnBrLeftRadius,
               columnBrRightRadius,
               columnBrBottomRadius,
               columnPaddingTop,
               columnPaddingRight,
               columnPaddingLeft,
               columnPaddingBottom,
               columnMarginTop,
               columnMarginRight,
               columnMarginLeft,
               columnMarginBottom,
               onControlBrSize,
               onControlBrRadius,
           },
           setAttributes,
       } = this.props;

        const controlTypesSize = [
            { key: 'linked', name: __( 'Linked' ), icon: icons.linked },
            { key: 'individual', name: __( 'Individual' ), icon: icons.individual },
        ];

        const controlTypesRadius = [
            { key: 'linked', name: __( 'Linked' ), icon: icons.radiuslinked },
            { key: 'individual', name: __( 'Individual' ), icon: icons.radiusindividual },
        ];

       const InspectorColumn = (
           <Fragment>
               <div className='ub-start-panel'>
                  <p>{ __( 'Background Color' ) }</p>
                  <ColorPalette
                      value={ columnBgColor }
                      onChange={ value =>
                          setAttributes({ columnBgColor: value })
                      }
                      allowReset
                  />
                  <p>{ __( 'Background Image' ) }</p>
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
               </div>
               <PanelBody
                   title={ __( 'Border Setting Column' ) }
                   initialOpen={ false }
               >
                   <p>{ __( 'Border Color' )}</p>
                   <ColorPalette
                       value={ columnBorderColor }
                       onChange={ value =>
                           setAttributes({
                               columnBorderColor: value
                           })
                       }
                       allowReset
                   />
                   <SelectControl
                       label={ __( 'Border Style' ) }
                       value={ columnBorderStyle }
                       options={ [
                           { value: 'none', label: __( 'None' ) },
                           { value: 'solid', label: __( 'Solid' ) },
                           { value: 'dotted', label: __( 'Dotted' ) },
                           { value: 'dashed', label: __( 'Dashed' ) },
                           { value: 'double', label: __( 'Double' ) },
                           { value: 'groove', label: __( 'Groove' ) },
                           { value: 'ridge', label: __( 'Ridge' ) },
                           { value: 'inset', label: __( 'Inset' ) },
                           { value: 'Outset', label: __( 'Outset' ) },
                       ] }
                       onChange={ value => setAttributes( { columnBorderStyle: value } ) }
                   />
                   <ButtonGroup className="ub-size-type-options" aria-label={ __( 'Control Type' ) }>
                       { map( controlTypesSize, ( { name, key, icon } ) => (
                           <Tooltip text={ name }>
                               { key === 'linked' ?
                                   <Button
                                       key={ key }
                                       className="ub-size-btn"
                                       isSmall
                                       onClick={ () => setAttributes( {
                                               onControlBrSize: true,
                                           } )
                                       }
                                   >
                                       { icon }
                                   </Button> :
                                   <Button
                                       key={ key }
                                       className="ub-size-btn"
                                       isSmall
                                       onClick={ () => setAttributes( {
                                           onControlBrSize: false,
                                       } )
                                       }
                                   >
                                       { icon }
                                   </Button>
                               }
                           </Tooltip>
                       ) ) }
                   </ButtonGroup>
                           { onControlBrSize ? (
                           <div className='ub-border-control'>
                               <RangeControl
                                   label = {__( 'Border Size' )}
                                   value={ columnBorderSize }
                                   onChange={ value => {
                                       setAttributes({
                                           columnBorderSize: value
                                       });
                                   }}
                                   min={ 0 }
                                   max={ 200 }
                               />
                           </div>
                   ) : (
                       <div className='ub-border-control-idividual'>
                           <p>{ __( 'Border Size' ) }</p>
                           <RangeControl
                               label={ icons.outlinetop }
                               value={ columnBorderTop }
                               onChange={ value => {
                                   setAttributes({
                                       columnBorderTop: value
                                   });
                               }}
                               min={ 0 }
                               max={ 50 }
                           />
                           <RangeControl
                               label={ icons.outlineright }
                               value={ columnBorderRight }
                               onChange={ value => {
                                  setAttributes({
                                      columnBorderRight: value
                                  });
                               }}
                               min={ 0 }
                               max={ 50 }
                           />
                           <RangeControl
                               label={ icons.outlineleft }
                               value={ columnBorderBottom }
                               onChange={ value => {
                               setAttributes({
                                       columnBorderBottom: value
                                   });
                               }}
                               min={ 0 }
                               max={ 50 }
                           />
                           <RangeControl
                               label={ icons.outlinebottom }
                               value={ columnBorderLeft }
                               onChange={ value => {
                               setAttributes({
                                      columnBorderLeft: value
                                  });
                               }}
                               min={ 0 }
                               max={ 50 }
                           />
                       </div>
                   )}
                   <ButtonGroup className="ub-size-type-options" aria-label={ __( 'Control Type' ) }>
                       { map( controlTypesRadius, ( { name, key, icon } ) => (
                           <Tooltip text={ name }>
                               { key === 'linked' ?
                                   <Button
                                       key={key}
                                       className="ub-size-btn"
                                       isSmall
                                       aria-pressed={key}
                                       onClick={(props) => setAttributes({
                                           onControlBrRadius: true,
                                       })
                                       }
                                   >
                                       {icon}
                                   </Button> :
                                   <Button
                                       key={key}
                                       className="ub-size-btn"
                                       isSmall
                                       aria-pressed={key}
                                       onClick={(props) => setAttributes({
                                           onControlBrRadius: false,
                                       })
                                       }
                                   >
                                       {icon}
                                   </Button>
                               }
                           </Tooltip>
                       ) ) }
                   </ButtonGroup>
                   { onControlBrRadius ? (
                       <div className='ub-border-control'>
                           <RangeControl
                           label = {__( 'Border Radius' )}
                           value = { columnBorderRadius }
                           onChange={ value => {
                               setAttributes({
                                   columnBorderRadius: value
                               });
                           }}
                           min={ 0 }
                           max={ 200 }
                           />
                       </div>
                   ) : (
                       <div className='ub-border-control-linked'>
                           <p>{ __( 'Border Radius' ) }</p>
                           <RangeControl
                               label={ icons.outlinetop }
                               value={ columnBrTopRadius }
                               onChange={ value => {
                                   setAttributes({
                                       columnBrTopRadius: value
                                   });
                               }}
                               min={ 0 }
                               max={ 200 }
                           />
                           <RangeControl
                               label={ icons.outlineright }
                               value={ columnBrRightRadius }
                               onChange={ value => {
                                   setAttributes({
                                       columnBrRightRadius: value
                                   });
                               }}
                               min={ 0 }
                               max={ 200 }
                           />
                           <RangeControl
                               label={ icons.outlineleft }
                               value={ columnBrBottomRadius }
                               onChange={ value => {
                                   setAttributes({
                                       columnBrBottomRadius: value
                                   });
                               }}
                               min={ 0 }
                               max={ 200 }
                           />
                           <RangeControl
                               label={ icons.outlinebottom }
                               value={ columnBrLeftRadius }
                               onChange={ value => {
                                   setAttributes({
                                       columnBrLeftRadius: value
                                   });
                               }}
                               min={ 0 }
                               max={ 200 }
                           />
                       </div>
                       )}
               </PanelBody>
               <PanelBody
                   title={ __( 'Margin | Padding Column' ) }
                   initialOpen={ false }
               >
                   <div className='ub-margin-padding-panel'>
                       <p>{ __( 'Padding (px)' )}</p>
                       <RangeControl
                           label={ icons.outlinetop }
                           value={ columnPaddingTop }
                           onChange={ value => {
                               setAttributes({
                                   columnPaddingTop: value
                               });
                           }}
                           min={ 0 }
                           max={ 500 }
                       />
                       <RangeControl
                           label={ icons.outlineright }
                           value={ columnPaddingRight }
                           onChange={ value => {
                               setAttributes({
                                   columnPaddingRight: value
                               });
                           }}
                           min={ 0 }
                           max={ 500 }
                       />
                       <RangeControl
                           label={ icons.outlineleft }
                           value={ columnPaddingLeft }
                           onChange={ value => {
                               setAttributes({
                                   columnPaddingLeft: value
                               });
                           }}
                           min={ 0 }
                           max={ 500 }
                       />
                       <RangeControl
                           label={ icons.outlinebottom }
                           value={ columnPaddingBottom }
                           onChange={ value => {
                               setAttributes({
                                   columnPaddingBottom: value
                               });
                           }}
                           min={ 0 }
                           max={ 500 }
                       />
                       <p>{ __( 'Margin (px)' )}</p>
                       <RangeControl
                           label={ icons.outlinetop }
                           value={ columnMarginTop }
                           onChange={ value => {
                               setAttributes({
                                   columnMarginTop: value
                               });
                           }}
                           min={ -200 }
                           max={ 200 }
                       />
                       <RangeControl
                           label={ icons.outlineright }
                           value={ columnMarginRight }
                           onChange={ value => {
                               setAttributes({
                                   columnMarginRight: value
                               });
                           }}
                           min={ -200 }
                           max={ 200 }
                       />
                       <RangeControl
                           label={ icons.outlineleft }
                           value={ columnMarginLeft }
                           onChange={ value => {
                               setAttributes({
                                   columnMarginLeft: value
                               });
                           }}
                           min={ -200 }
                           max={ 200 }
                       />
                       <RangeControl
                           label={ icons.outlinebottom }
                           value={ columnMarginBottom }
                           onChange={ value => {
                               setAttributes({
                                   columnMarginBottom: value
                               });
                           }}
                           min={ -200 }
                           max={ 200 }
                       />
                   </div>
               </PanelBody>
           </Fragment>
       );

       return[
           <Fragment>
              <InspectorControls>
                  {InspectorColumn}
              </InspectorControls>
           </Fragment>
        ]
    }
}
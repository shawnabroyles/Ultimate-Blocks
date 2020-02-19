//Import icons layout
import icons from './icons/icons';

// Import External
import map from 'lodash/map';
import times from 'lodash/times';
import { Resizable } from 're-resizable';
import ContainerDimensions from 'react-container-dimensions';
import classnames from 'classnames';

// Setup the block
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { Component, Fragment } = wp.element;
const {
    Button,
    ButtonGroup,
    Tooltip,
    Toolbar,
    IconButton,
} = wp.components;

const {
    MediaUpload,
    InnerBlocks,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.blockEditor || wp.editor;

export default class SectionEditor extends Component {

    constructor() {
        super( ...arguments );
        this.state = {
            firstWidth: null,
            secondWidth: null,
            threeWidth: null,
            ResizeColWidthOne: null,
            ResizeColWidthTwo: null,
            ResizeColWidthThree: null,
            display: 'none',
            displaythree: 'none',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            attributes: {
                columns,
                inspectorTypeColumn,
            }
        } = this.props;

        if(prevProps !== this.props){
            if(inspectorTypeColumn){
                if(columns === 2){
                    this.setState({
                        ResizeColWidthOne: null,
                        ResizeColWidthTwo: null,
                    })
                } else if(columns === 3){
                    this.setState({
                        ResizeColWidthOne: null,
                        ResizeColWidthTwo: null,
                        ResizeColWidthThree: null,
                    })
                }
            }
        }
    }

    render(){
        const {
            attributes:{
                colSection,
                columns,
                startOptions,
                wrapAlignment,
                wrapVerticalAligment,
                colWidthOne,
                colWidthTwo,
                colWidthThree,
                colWidthFour,
                colWidthFive,
                colWidthSix,
                selectUnits,
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                gutter,
                wrapBorderColor,
                wrapBorderStyle,
                wrapBorderSize,
                wrapBorderRadius,
                wrapColor,
                wrapBackgroundSize,
                wrapBackgroundPosition,
                wrapBackgroundRepeat,
                wrapBackgroundAttachment,
                imgID,
                imgURL,
                imgAlt,
                videoID,
                videoURL,
                selectTab,
                gradientType,
                gradientAngle,
                gradientPosition,
                wrapGradientOverlay,
                wrapGradientOverlayCol,
                wrapGradientSecondCol,
                wrapGradientLocation,
                wrapGradientSecondLocation,
                wrapBackgroundOverlay,
                wrapBackgroundOverlayCol,
                wrapTag,
                textColor,
            },
            block:{clientId},
            setAttributes,
        } = this.props;

        const createColumn = col => {
            createBlock('ub/section-column', {} );
            return times( col, col => [ 'ub/section-column', {} ] );
        };

        const startSectionOptions = [
            { key: 'equal', col: 1, name: __( 'Size: 100%' ), One: '100%', icon: icons.row },
            { key: 'equal-two', col: 2, name: __( 'Size: 50%|50%' ), One: '50%', Two: '50%', icon: icons.twocol },
            { key: 'left-golden', col: 2, name: __( 'Size: 66%|33%' ), One: '66%', Two: '33%', icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, name: __( 'Size: 33%|66%' ), One: '33%', Two: '66%', icon: icons.tworightgolden },
            { key: 'equal-three', col: 3, name: __( 'Size: 33%|33%|33%' ), One: '33%', Two: '33%', Three: '33%', icon: icons.threecol },
            { key: 'left-half', col: 3, name: __( 'Size: 50%|25%|25%' ), One: '50%', Two: '25%', Three: '25%', icon: icons.lefthalf },
            { key: 'right-half', col: 3, name: __( 'Size: 25%|25%|50%' ), One: '25%', Two: '25%', Three: '50%', icon: icons.righthalf },
            { key: 'center-half', col: 3, name: __( 'Size: 25%|50%|25%' ), One: '25%', Two: '50%', Three: '25%', icon: icons.centerhalf },
            { key: 'center-wide', col: 3, name: __( 'Size: 20%|60%|20%' ), One: '20%', Two: '60%', Three: '20%', icon: icons.widecenter },
            { key: 'center-exwide', col: 3, name: __( 'Size: 15%|70%|15%' ), One: '15%', Two: '70%', Three: '15%', icon: icons.exwidecenter },
            { key: 'equal-four', col: 4, name: __( 'Size: 25%|25%|25%|25%' ), One: '25%', Two: '25%', Three: '25%', Four: '25%', icon: icons.fourcol },
            { key: 'left-forty', col: 4, name: __( 'Size: 40%|20%|20%|20%' ), One: '40%', Two: '20%', Three: '20%', Four: '20%', icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Size: 20%|20%|20%|40%' ), One: '20%', Two: '20%', Three: '20%', Four: '20%', icon: icons.rfourforty },
            { key: 'equal-five', col: 5, name: __( 'Size: 5-|20%|' ), One: '20%', Two: '20%', Three: '20%', Four: '20%', Five: '20%', icon: icons.fivecol },
            { key: 'equal-six', col: 6, name: __( 'Size: 6-|16%|' ), One: '16.66%', Two: '16.66%', Three: '16.66%', Four: '16.66%', Five: '16.66%', Six: '16.66%', icon: icons.sixcol },
        ];

        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        return[
            <Fragment>
                <BlockControls>
                    <BlockAlignmentToolbar
                        value={ wrapAlignment }
                        controls={ [ 'center', 'wide', 'full' ] }
                        onChange={ value => setAttributes( { wrapAlignment: value } ) }
                    />
                    <Toolbar>
                        <MediaUpload
                            onSelect={ img =>
                                setAttributes({
                                    imgID: img.id,
                                    imgURL: img.url,
                                }) }
                            type="image"
                            value={ null }
                            render={ ( { open } ) => 
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Background Image' ) }
                                    icon="format-image"
                                    onClick={ open }
                                />
                            }
                        />
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __( 'Vertical Align Top' ) }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': wrapVerticalAligment === 'flex-start' },
                                ) }
                                onClick={ _ => setAttributes( { wrapVerticalAligment: 'flex-start' } ) }
                            >
                                { icons.wrapVerticalTop }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __( 'Vertical Align Middle' ) }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': wrapVerticalAligment === 'center' },
                                ) }
                                onClick={ _ => setAttributes( { wrapVerticalAligment: 'center' } ) }
                            >
                                { icons.wrapVerticalMiddle }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __( 'Vertical Align Bottom' ) }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': wrapVerticalAligment === 'flex-end' },
                                ) }
                                onClick={ _ => setAttributes( { wrapVerticalAligment: 'flex-end' } ) }
                            >
                                { icons.wrapVerticalBottom }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __( 'Inner Columns Full Height' ) }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': wrapVerticalAligment === 'space-between' },
                                ) }
                                onClick={ () => setAttributes( { wrapVerticalAligment: 'space-between' } ) }
                            >
                                { icons.wrapVerticalFullHeight }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                </BlockControls>
                <div className="ub-section-editor-video-wrap">
                    <video className="ub-editor-video" playsinline src={videoURL}></video>
                </div>
                <div className={( selectTab === 'Standard' ? 'ub-section-editor-overlay' : 'ub-section-editor-gradient')} style={
                    (selectTab === 'Standard' ? {
                            backgroundColor: wrapBackgroundOverlayCol,
                            opacity: (wrapBackgroundOverlay == 100 ? 1 : `${wrapBackgroundOverlay / 100}`)
                        } :
                        {
                            backgroundImage: `${gradientType}-gradient(${gradientType === 'radial' ? 'at ' : ''}${gradientType === 'linear' ? gradientAngle : gradientPosition }${gradientType === 'linear' ? 'deg' : ''},
                                                ${wrapGradientOverlayCol} ${wrapGradientLocation}%,
                                                ${wrapGradientSecondCol} ${wrapGradientSecondLocation}%)`,
                            opacity: (wrapGradientOverlay == 100 ? 1 : `${wrapGradientOverlay / 100}`)
                        } )
                }>
                </div>
                <div className={`ub-section-overhad-wrap wrapVertical${wrapVerticalAligment}`} style={{
                    backgroundImage: ( imgURL ? `url( ${imgURL} )` : undefined ),
                    backgroundColor: ( wrapColor ? wrapColor : undefined ),
                    backgroundSize: wrapBackgroundSize,
                    backgroundPosition: wrapBackgroundPosition,
                    backgroundRepeat: wrapBackgroundRepeat,
                    backgroundAttachment: wrapBackgroundAttachment,
                    marginTop: `${marginTopWrap}${selectUnits}`,
                    marginLeft: `${marginLeftWrap}${selectUnits}`,
                    marginBottom: `${marginBottomWrap}${selectUnits}`,
                    marginRight: `${marginRightWrap}${selectUnits}`,
                    paddingLeft: paddingLeftWrap,
                    paddingRight: paddingRightWrap,
                    border: `${wrapBorderSize}px ${wrapBorderStyle}${wrapBorderColor}`,
                    borderRadius: `${wrapBorderRadius}px`,
                    color: textColor,
                }}>
                    { !colSection &&(
                       <div className='ub-section-block-wrap'>
                         <div className="ub-select-section">
                           <div className="ub-select-section-title">
                               { __( 'Select section' ) }
                           </div>
                           <ButtonGroup aria-label={ __( 'Column Section' ) }>
                               { map( startSectionOptions, ( { name, key, icon, col, One, Two, Three, Four, Five, Six } ) => (
                                   <Tooltip text={ name }>
                                       <Button
                                           key={ key }
                                           className="ub-section-btn"
                                           isSmall
                                           onClick={ _ => setAttributes( {
                                               colSection: key,
                                               columns: col,
                                               colWidthOne: One,
                                               colWidthTwo: Two,
                                               colWidthThree: Three,
                                               colWidthFour: Four,
                                               colWidthFive: Five,
                                               colWidthSix: Six,
                                           } ) }
                                       >
                                           { icon }
                                       </Button>
                                   </Tooltip>
                               ) ) }
                           </ButtonGroup>
                       </div>
                    </div>)}
                    { colSection && 1 === columns &&(
                        <Fragment>
                            <div className="ub-section-column-padding-top" style={ { height: paddingTopWrap } }></div>
                            <div className="ub-section-column-wrap">
                                <div>
                                    <InnerBlocks
                                        template={createColumn( columns )}
                                        templateLock={'all'}
                                        renderAppender={ _ => null }
                                    />
                                </div>
                            </div>
                            <div className="ub-section-column-padding-bottom" style={ { height: paddingBottomWrap } }></div>
                        </Fragment>
                    )}
                    { colSection && columns && columns !== 1 && columns < 4 &&(
                        <Fragment>
                             <div className="ub-section-column-padding-top" style={ { height: paddingTopWrap } }></div>
                             <div className="ub-section-column-wrap">
                                 <style>
                                     { columns && columns === 2 && (
                                     <Fragment>
                                         { ( !this.state.ResizeColWidthOne ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( colWidthOne ) }%; margin-right: ${ gutter }; }` :`#block-${clientId} .ub-section-column-wrap > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/section-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthOne ) }%; margin-right: ${ gutter }; }` ) }
                                         { ( !this.state.ResizeColWidthTwo ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( colWidthTwo ) }%; }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/section-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthTwo) }%; }` ) }
                                     </Fragment>
                                     )}
                                     { columns && columns === 3 && (
                                         <Fragment>
                                             { ( !this.state.ResizeColWidthOne ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( colWidthOne ) }%; margin-right: ${ gutter };  }` :`#block-${clientId} .ub-section-column-wrap > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/section-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthOne ) }%; margin-right: ${ gutter }; }` ) }
                                             { ( !this.state.ResizeColWidthTwo ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( colWidthTwo ) }%; margin-right: ${ gutter };  }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/section-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthTwo ) }%; margin-right: ${ gutter }; }` ) }
                                             { ( !this.state.ResizeColWidthThree ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(3) { flex: 0 1 ${ parseFloat( colWidthThree ) }%;  }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/section-column"]:nth-child(3) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthThree ) }%; }` ) }
                                         </Fragment>
                                     )}
                                 </style>
                                 <ContainerDimensions>{({width}) =>
                                     <Resizable
                                         style={style}
                                         className="ub-editor-row-column_left"
                                         minWidth="15%"
                                         maxWidth={ columns === 2 ? "90%" : !this.state.ResizeColWidthThree ? ( ( Math.round ( parseFloat ( colWidthOne ) ) ) + ( Math.round ( parseFloat ( colWidthTwo ) ) ) ) - 15 + '%' : ( ( Math.round( parseFloat( this.state.ResizeColWidthOne ) ) ) + ( Math.round( parseFloat( this.state.ResizeColWidthTwo ) ) ) ) - 15 + '%' }
                                         size={{ width:  ( !this.state.ResizeColWidthOne ? colWidthOne : this.state.ResizeColWidthOne + '%' )}}
                                         enable={{right:true, bottom:true}}
                                         handleClasses={ { right: 'ub_handle-right'} }
                                         grid={ [ width / 1000, 1 ] }
                                         onResize = {( event, direction, elt ) => {
                                             let firstCol;
                                             let secondCol;
                                             let sumCol;
                                             let sumColstate;
                                             if ( columns === 2 ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
                                             } else if ( columns === 3 ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 sumCol = ( Math.round( parseFloat( colWidthOne ) ) ) + ( Math.round( parseFloat( colWidthTwo ) ) ) ;
                                                 sumColstate = this.state.ResizeColWidthOne + this.state.ResizeColWidthTwo ;
                                                 secondCol = ( Math.round( ( ( ! this.state.ResizeColWidthOne ? sumCol : sumColstate ) - firstCol ) * 10 ) / 10 );
                                             }
                                             this.setState( {
                                                 display: 'block',
                                                 firstWidth: firstCol,
                                                 secondWidth: secondCol,
                                                 ResizeColWidthOne: firstCol,
                                                 ResizeColWidthTwo: secondCol,
                                             } );
                                         }}
                                         onResizeStop = {( event, direction, elt ) => {
                                             let firstCol;
                                             let secondCol;
                                             let sumCol;
                                             if ( columns === 2 ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
                                             } else if ( columns === 3 ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 sumCol = ( Math.round( parseFloat( this.state.ResizeColWidthOne ) ) ) + ( Math.round( parseFloat( this.state.ResizeColWidthTwo ) ) ) ;
                                                 secondCol =  ( Math.round( ( sumCol - firstCol  ) * 10 ) / 10 );
                                             }
                                             this.setState( {
                                                 display: 'none',
                                                 firstWidth: null,
                                                 secondWidth: null,
                                                 ResizeColWidthOne: firstCol,
                                                 ResizeColWidthTwo: secondCol,
                                             } );
                                             setAttributes({
                                                 colWidthOne: this.state.ResizeColWidthOne+'%',
                                                 colWidthTwo: this.state.ResizeColWidthTwo+'%',
                                                 inspectorTypeColumn: false,
                                             });
                                         }}
                                         axis="x"
                                     ><span className="left-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? colWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="left-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? colWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="right-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? colWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="right-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? colWidthTwo : this.state.secondWidth + '%'}</span>
                                     </Resizable>
                                     }</ContainerDimensions>
                                 { 3 === columns &&
                                     <ContainerDimensions>
                                         {({width}) =>
                                             <Resizable
                                                 style={style}
                                                 className="ub-editor-row-column_right"
                                                 minWidth= { !this.state.ResizeColWidthOne ? ( ( ( Math.round ( parseFloat ( colWidthOne ) ) ) + ( Math.round ( parseFloat ( colWidthTwo ) ) ) ) - ( Math.round ( parseFloat ( colWidthOne ) ) ) + 10  ) + '%' : ( ( ( Math.round ( parseFloat ( this.state.ResizeColWidthOne ) ) ) + ( Math.round ( parseFloat ( this.state.ResizeColWidthTwo ) ) ) ) - ( Math.round ( parseFloat ( this.state.ResizeColWidthTwo ) ) ) + 15  ) + '%' }
                                                 maxWidth= "90%"
                                                 size={{ width:  ( !this.state.ResizeColWidthThree ? ( parseFloat ( colWidthOne ) ) + ( parseFloat ( colWidthTwo ) ) + '%' : ( (! this.state.ResizeColWidthOne ? ( parseFloat ( colWidthOne ) ) : this.state.ResizeColWidthOne ) + this.state.ResizeColWidthTwo ) + '%' )}}
                                                 enable={{right: true}}
                                                 handleClasses={ {right: 'ub_handle-left'} }
                                                 grid={ [ width / 1000, 1 ] }
                                                 onResize = {(event, direction, elt) => {
                                                     let secondColStart;
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columns === 3 ) {
                                                         secondColStart = Math.round(parseFloat(elt.style.width) * 10) / 10;
                                                         secondCol = Math.round( ( secondColStart - ( parseFloat ( this.state.ResizeColWidthOne ? this.state.ResizeColWidthOne : colWidthOne ) ) ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - ( parseFloat ( ! this.state.ResizeColWidthOne ? colWidthOne : this.state.ResizeColWidthOne ) + secondCol ) ) * 10 ) / 10;
                                                     }
                                                     this.setState( {
                                                         displaythree: 'block',
                                                         secondWidth: secondCol,
                                                         threeWidth: threeCol,
                                                         ResizeColWidthTwo: secondCol,
                                                         ResizeColWidthThree: threeCol,
                                                     } );
                                                     setAttributes( {
                                                         colWidthThree: this.state.ResizeColWidthThree+'%',
                                                     } );
                                                 }}
                                                 onResizeStop = {(event, direction, elt) => {
                                                     let firstCol;
                                                     let secondColStart;
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columns === 3 ) {
                                                         firstCol = !this.state.ResizeColWidthOne ? parseFloat( colWidthOne ) : this.state.ResizeColWidthOne;
                                                         secondColStart = Math.round(parseFloat(elt.style.width) * 10) / 10;
                                                         secondCol = Math.round( ( secondColStart - ( parseFloat ( this.state.ResizeColWidthOne ? this.state.ResizeColWidthOne : colWidthOne ) ) ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - ( parseFloat ( ! this.state.ResizeColWidthOne ? colWidthOne : this.state.ResizeColWidthOne ) + secondCol ) ) * 10 ) / 10;
                                                     }
                                                     this.setState( {
                                                         displaythree: 'none',
                                                         secondWidth: null,
                                                         threeWidth: null,
                                                         ResizeColWidthOne: firstCol,
                                                         ResizeColWidthTwo: secondCol,
                                                         ResizeColWidthThree: threeCol,
                                                     } );
                                                     setAttributes( {
                                                         colWidthTwo: this.state.ResizeColWidthTwo+'%',
                                                         colWidthThree: this.state.ResizeColWidthThree+'%',
                                                         inspectorTypeColumn: false,
                                                         } );
                                                 }}
                                                 axis="x"
                                             >
                                                 <span className="left-column-width-size-top" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthTwo ? colWidthOne : this.state.secondWidth + '%'}</span>
                                                 <span className="left-column-width-size-bottom" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthTwo ? colWidthOne : this.state.secondWidth + '%'}</span>
                                                 <span className="right-column-width-size-top" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthThree ? colWidthTwo : this.state.threeWidth + '%'}</span>
                                                 <span className="right-column-width-size-bottom" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthThree ? colWidthTwo : this.state.threeWidth + '%'}</span>
                                             </Resizable>
                                         }</ContainerDimensions>
                                 }
                                 <InnerBlocks
                                     template= {createColumn( columns )}
                                     templateLock={'all'}
                                     renderAppender={ _ => null }
                                 />
                             </div>
                             <div className="ub-section-column-padding-bottom" style={ { height: paddingBottomWrap } }></div>
                        </Fragment>
                    )}
                    { colSection && columns && columns > 3 &&(
                        <Fragment>
                            <div className="ub-section-column-padding-top" style={ { height: paddingTopWrap } }></div>
                            <div className="ub-section-column-wrap">
                                <style>
                                    <Fragment>
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:not(nth-child(6)) { flex: 1; margin-right: ${ gutter }; justify-content: center; overflow-wrap: break-word; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/section-column"]:nth-child(6) { flex: 1; justify-content: center; overflow-wrap: break-word; }` }
                                    </Fragment>
                                </style>
                                <InnerBlocks
                                    template={createColumn( columns )}
                                    templateLock={'all'}
                                    renderAppender={ _ => null }
                                />
                            </div>
                            <div className="ub-section-column-padding-bottom" style={ { height: paddingBottomWrap } }></div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        ]
    }
}
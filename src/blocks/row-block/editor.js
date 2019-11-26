//Import icons layout
import icons from './icons/icons';

// Import External
import map from 'lodash/map';
import times from 'lodash/times';
import { Resizable } from 're-resizable';
import ContainerDimensions from 'react-container-dimensions';

// Setup the block
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { Component, Fragment } = wp.element;
const {
    Button,
    ButtonGroup,
    Tooltip,
} = wp.components;

const {
    InnerBlocks,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.blockEditor || wp.editor;

const ALLOWED_BLOCKS = [ 'ub/row-column' ];

export default class RowEditor extends Component {

    constructor() {
        console.log('constructor');
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

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            attributes: {
                columns,
                inspectorTypeColumn,
            }
        } = this.props;

        if(prevProps !== this.props){
            if(inspectorTypeColumn && columns == 2){
                this.setState({
                    ResizeColWidthOne: null,
                    ResizeColWidthTwo: null,
                })
            } else if (inspectorTypeColumn && columns == 3){
                this.setState({
                    ResizeColWidthOne: null,
                    ResizeColWidthTwo: null,
                    ResizeColWidthThree: null,
                })
            }
        }
    }

    render(){
    console.log('render');
        const {
            attributes:{
                colSection,
                columns,
                startOptions,
                blockAlignment,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                ColWidthFive,
                ColWidthSix,
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                wrapColor,
                wrapBackgoundSize,
                wrapBackgroundPosition,
                wrapBackgroundRepeat,
                wrapBackgroundAttachment,
                imgID,
                imgURL,
                imgAlt,
                wrapTag,
            },
            block:{clientId},
            setAttributes,
        } = this.props;

        const createColumn = (col) => {
            createBlock('ub/row-column', {} );
            return times( col, col => [ 'ub/row-column', {} ] );
        };

        console.log(clientId);

        console.log(this.state);

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
            { key: 'left-forty', col: 4, name: __( 'Size: 40%|20%|20%|20%' ), One: '40%', Two: '20%%', Three: '20%', Four: '20%', icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Size: 20%|20%|20%|40%' ), One: '20%', Two: '20%', Three: '20%', Four: '20%', icon: icons.rfourforty },
            { key: 'equal-five', col: 5, name: __( 'Size: 5-|20%|' ), One: '20%', Two: '20%', Three: '20%', Four: '20%', Five: '20%', icon: icons.fivecol },
            { key: 'equal-six', col: 6, name: __( 'Size: 6-|16%|' ), One: '16,3%', Two: '16,3%', Three: '16,3%', Four: '16,3%', Six: '16,3%', icon: icons.sixcol },
        ];

        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        const BackgroundStyle = {
            backgroundImage: ( imgURL ? `url( ${imgURL} )` : undefined ),
            backgroundColor: ( wrapColor ? wrapColor : undefined ),
            backgroundSize: wrapBackgoundSize,
            backgroundPosition: wrapBackgroundPosition,
            backgroundRepeat: wrapBackgroundRepeat,
            backgroundAttachment: wrapBackgroundAttachment,
            paddingTop: paddingTopWrap,
            paddingBottom: paddingBottomWrap,
            paddingLeft: paddingLeftWrap,
            paddingRight: paddingRightWrap,
        }

        return[
            <Fragment>
                <BlockControls>
                    <BlockAlignmentToolbar
                        value={ blockAlignment }
                        controls={ [ 'center', 'wide', 'full' ] }
                        onChange={ value => setAttributes( { blockAlignment: value } ) }
                    />
                </BlockControls>
                <div className='ub-section-overhad-wrap' style={{
                    marginTop: marginTopWrap,
                    marginBottom: marginBottomWrap,
                    marginLeft: marginLeftWrap,
                    marginRight: marginRightWrap,
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
                                           onClick={ (props) => setAttributes( {
                                               colSection: key,
                                               columns: col,
                                               ColWidthOne: One,
                                               ColWidthTwo: Two,
                                               ColWidthThree: Three,
                                               ColWidthFour: Four,
                                               ColWidthFive: Five,
                                               ColWidthSix: Six,
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
                        <div className="ub-section-column-wrap" style={ {
                        } }>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                backgroundImage: ( imgURL ? `url( ${imgURL} )` : undefined ),
                                backgroundColor: ( wrapColor ? wrapColor : undefined ),
                                backgroundSize: wrapBackgoundSize,
                                backgroundPosition: wrapBackgroundPosition,
                                backgroundRepeat: wrapBackgroundRepeat,
                                backgroundAttachment: wrapBackgroundAttachment,
                                paddingTop: paddingTopWrap,
                                paddingBottom: paddingBottomWrap,
                                paddingLeft: paddingLeftWrap,
                                paddingRight: paddingRightWrap,
                            }}>
                                <InnerBlocks
                                    template={createColumn( columns )}
                                    templateLock={'all'}
                                    renderAppender={ ()=> (null) }
                                />
                            </div>
                        </div>
                    )}
                    { colSection && columns && 1 !== columns && 4 !== columns && 5 !== columns && 6 !== columns &&(
                        <Fragment>
                             <div className="ub-section-column-wrap" style={BackgroundStyle}>
                                 <style>
                                     { columns && columns === 2 && (
                                     <Fragment>
                                         { ( !this.state.ResizeColWidthOne ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( ColWidthOne ) }%; }` :`#block-${clientId} .ub-section-column-wrap > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthOne ) }%; overflow: hidden }` ) }
                                         { ( !this.state.ResizeColWidthTwo ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( ColWidthTwo ) }%; }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthTwo) }%; overflow: hidden }` ) }
                                     </Fragment>
                                     )}
                                     { columns && columns === 3 && (
                                         <Fragment>
                                             { ( !this.state.ResizeColWidthOne ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( ColWidthOne ) }%; }` :`#block-${clientId} .ub-section-column-wrap > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthOne ) }%; overflow: hidden }` ) }
                                             { ( !this.state.ResizeColWidthTwo ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( ColWidthTwo ) }%; }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthTwo ) }%; overflow: hidden }` ) }
                                             { ( !this.state.ResizeColWidthThree ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(3) { flex: 0 1 ${ parseFloat( ColWidthThree ) }%; }` :`#block-${clientId} .ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(3) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthThree ) }%; overflow: hidden }` ) }
                                         </Fragment>
                                     )}
                                 </style>
                                 <ContainerDimensions>{({width}) =>
                                     <Resizable
                                         style={style}
                                         className="ub-editor-row-column_left"
                                         minWidth="15%"
                                         maxWidth={ columns === 2 ? "90%" : !this.state.ResizeColWidthThree ? ( ( Math.round ( parseFloat ( ColWidthOne ) ) ) + ( Math.round ( parseFloat ( ColWidthTwo ) ) ) ) - 15 + '%' : ( ( Math.round( parseFloat( this.state.ResizeColWidthOne ) ) ) + ( Math.round( parseFloat( this.state.ResizeColWidthTwo ) ) ) ) - 15 + '%' }
                                         size={{ width:  ( !this.state.ResizeColWidthOne ? ColWidthOne : this.state.ResizeColWidthOne + '%' )}}
                                         enable={{right:true, bottom:true}}
                                         handleClasses={ {
                                             right: 'ub_handle-right',
                                         } }
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
                                                 sumCol = ( Math.round( parseFloat( ColWidthOne ) ) ) + ( Math.round( parseFloat( ColWidthTwo ) ) ) ;
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
                                                 ColWidthOne: this.state.ResizeColWidthOne+'%',
                                                 ColWidthTwo: this.state.ResizeColWidthTwo+'%',
                                                 inspectorTypeColumn: false,
                                             });
                                         }}
                                         axis="x"
                                     ><span className="left-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="left-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="right-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="right-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                     </Resizable>
                                     }</ContainerDimensions>
                                 { 3 === columns &&(
                                     <ContainerDimensions>
                                         {({width}) =>
                                             <Resizable
                                                 style={style}
                                                 className="ub-editor-row-column_right"
                                                 minWidth= { !this.state.ResizeColWidthOne ? ( ( ( Math.round ( parseFloat ( ColWidthOne ) ) ) + ( Math.round ( parseFloat ( ColWidthTwo ) ) ) ) - ( Math.round ( parseFloat ( ColWidthOne ) ) ) + 10  ) + '%' : ( ( ( Math.round ( parseFloat ( this.state.ResizeColWidthOne ) ) ) + ( Math.round ( parseFloat ( this.state.ResizeColWidthTwo ) ) ) ) - ( Math.round ( parseFloat ( this.state.ResizeColWidthTwo ) ) ) + 15  ) + '%' }
                                                 maxWidth= "90%"
                                                 size={{ width:  ( !this.state.ResizeColWidthThree ? ( parseFloat ( ColWidthOne ) ) + ( parseFloat ( ColWidthTwo ) ) + '%' : ( (! this.state.ResizeColWidthOne ? ( parseFloat ( ColWidthOne ) ) : this.state.ResizeColWidthOne ) + this.state.ResizeColWidthTwo ) + '%' )}}
                                                 enable={{right:true}}
                                                 handleClasses={ {
                                                     right: 'ub_handle-left',
                                                 } }
                                                 grid={ [ width / 1000, 1 ] }
                                                 onResize = {(event, direction, elt) => {
                                                     let secondColStart;
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columns === 3 ) {
                                                         secondColStart = Math.round(parseFloat(elt.style.width) * 10) / 10;
                                                         secondCol = Math.round( ( secondColStart - ( parseFloat ( this.state.ResizeColWidthOne ? this.state.ResizeColWidthOne : ColWidthOne ) ) ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - ( parseFloat ( ! this.state.ResizeColWidthOne ? ColWidthOne : this.state.ResizeColWidthOne ) + secondCol ) ) * 10 ) / 10;
                                                     }
                                                     this.setState( {
                                                         displaythree: 'block',
                                                         secondWidth: secondCol,
                                                         threeWidth: threeCol,
                                                         ResizeColWidthTwo: secondCol,
                                                         ResizeColWidthThree: threeCol,
                                                     } );
                                                     setAttributes( {
                                                         ColWidthThree: this.state.ResizeColWidthThree+'%',
                                                         mode: 'edit',
                                                     } );
                                                 }}
                                                 onResizeStop = {(event, direction, elt) => {
                                                     let firstCol;
                                                     let secondColStart;
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columns === 3 ) {
                                                         firstCol = !this.state.ResizeColWidthOne ? parseFloat( ColWidthOne ) : this.state.ResizeColWidthOne;
                                                         secondColStart = Math.round(parseFloat(elt.style.width) * 10) / 10;
                                                         secondCol = Math.round( ( secondColStart - ( parseFloat ( this.state.ResizeColWidthOne ? this.state.ResizeColWidthOne : ColWidthOne ) ) ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - ( parseFloat ( ! this.state.ResizeColWidthOne ? ColWidthOne : this.state.ResizeColWidthOne ) + secondCol ) ) * 10 ) / 10;
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
                                                             ColWidthThree: this.state.ResizeColWidthThree+'%',
                                                         } );
                                                 }}
                                                 axis="x"
                                             >
                                                 <span className="left-column-width-size-top" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthTwo ? ColWidthOne : this.state.secondWidth + '%'}</span>
                                                 <span className="left-column-width-size-bottom" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthTwo ? ColWidthOne : this.state.secondWidth + '%'}</span>
                                                 <span className="right-column-width-size-top" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthThree ? ColWidthTwo : this.state.threeWidth + '%'}</span>
                                                 <span className="right-column-width-size-bottom" style={{ display: this.state.displaythree }}>{!this.state.ResizeColWidthThree ? ColWidthTwo : this.state.threeWidth + '%'}</span>
                                             </Resizable>
                                         }</ContainerDimensions>
                                 )}
                                 <InnerBlocks
                                     template= {createColumn( columns )}
                                     templateLock={'all'}
                                     renderAppender={ ()=> (null) }
                                 />
                             </div>
                        </Fragment>
                    )}
                    { colSection && columns && 1 !== columns && 2 !== columns && 3 !== columns &&(
                        <Fragment>
                            <div className="ub-section-column-wrap" style={BackgroundStyle}>
                                <style>
                                    <Fragment>
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( ColWidthOne ) }%; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( ColWidthTwo ) }%; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(3) { flex: 0 1 ${ parseFloat( ColWidthThree ) }%; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(4) { flex: 0 1 ${ parseFloat( ColWidthFour ) }%; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(5) { flex: 0 1 ${ parseFloat( ColWidthFive ) }%; }` }
                                        { `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(6) { flex: 0 1 ${ parseFloat( ColWidthSix ) }%; }` }
                                    </Fragment>
                                </style>
                                <InnerBlocks
                                    template={createColumn( columns )}
                                    templateLock={'all'}
                                    renderAppender={ ()=> (null) }
                                />
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        ]
    }
}
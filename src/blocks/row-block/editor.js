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
            attributes:{
                colSection,
                mode,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                ColWidthFive,
                ColWidthSix,
            },
            setAttributes,
        } = this.props;

        if( prevProps !== this.props ) {
            if ('equal-two' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '50%'});
                    setAttributes({ColWidthTwo: '50%'});
                }
            } else if ('left-golden' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '66.6%'});
                    setAttributes({ColWidthTwo: '33.3%'});
                }
            } else if ('right-golden' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '33.3%'});
                    setAttributes({ColWidthTwo: '66%.6'});
                }
            } else if ('equal-three' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '33.3%'});
                    setAttributes({ColWidthTwo: '33.3%'});
                    setAttributes({ColWidthThree: '33.3%'});
                }
            } else if ('left-half' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '50%'});
                    setAttributes({ColWidthTwo: '25%'});
                    setAttributes({ColWidthThree: '25%'});
                }
            } else if ('right-half' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '25%'});
                    setAttributes({ColWidthTwo: '25%'});
                    setAttributes({ColWidthThree: '50%'});
                }
            } else if ('center-half' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '25%'});
                    setAttributes({ColWidthTwo: '50%'});
                    setAttributes({ColWidthThree: '25%'});
                }
            } else if ('center-wide' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '20%'});
                    setAttributes({ColWidthTwo: '60%'});
                    setAttributes({ColWidthThree: '20%'});
                }
            } else if ('center-exwide' === colSection) {
                if( mode === '' ) {
                    setAttributes({ColWidthOne: '15%'});
                    setAttributes({ColWidthTwo: '70%'});
                    setAttributes({ColWidthThree: '15%'});
                }
            } else if ('equal-four' === colSection) {
                setAttributes({ColWidthOne: '25%'});
                setAttributes({ColWidthTwo: '25%'});
                setAttributes({ColWidthThree: '25%'});
                setAttributes({ColWidthFour: '25%'});
            } else if ('left-forty' === colSection) {
                setAttributes({ColWidthOne: '40%'});
                setAttributes({ColWidthTwo: '20%'});
                setAttributes({ColWidthThree: '20%'});
                setAttributes({ColWidthFour: '20%'});
            } else if ('right-forty' === colSection) {
                setAttributes({ColWidthOne: '20%'});
                setAttributes({ColWidthTwo: '20%'});
                setAttributes({ColWidthThree: '20%'});
                setAttributes({ColWidthFour: '40%'});
            } else if ('equal-five' === colSection) {
                setAttributes({ColWidthOne: '20%'});
                setAttributes({ColWidthTwo: '20%'});
                setAttributes({ColWidthThree: '20%'});
                setAttributes({ColWidthFour: '20%'});
                setAttributes({ColWidthFive: '20%'});
            } else if ('equal-six' === colSection) {
                setAttributes({ColWidthOne: '16.2%'});
                setAttributes({ColWidthTwo: '16.2%'});
                setAttributes({ColWidthThree: '16.2%'});
                setAttributes({ColWidthFour: '16.2%'});
                setAttributes({ColWidthFive: '16.2%'});
                setAttributes({ColWidthSix: '16.2%'});
            }
        }
    }


    render(){
    console.log('render');
        const {
            attributes:{
                colSection,
                columns,
                mode,
                startOptions,
                blockAlignment,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                ColWidthFive,
                ColWidthSix,
                wrapColor,
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
            { key: 'equal', col: 1, name: __( 'Size: 100%' ), icon: icons.row },
            { key: 'equal-two', col: 2, name: __( 'Size: 50%|50%' ), icon: icons.twocol },
            { key: 'left-golden', col: 2, name: __( 'Size: 66%|33%' ), icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, name: __( 'Size: 33%|66%' ), icon: icons.tworightgolden },
            { key: 'equal-three', col: 3, name: __( 'Size: 33%|33%|33%' ), icon: icons.threecol },
            { key: 'left-half', col: 3, name: __( 'Size: 50%|25%|25%' ), icon: icons.lefthalf },
            { key: 'right-half', col: 3, name: __( 'Size: 25%|25%|50%' ), icon: icons.righthalf },
            { key: 'center-half', col: 3, name: __( 'Size: 25%|50%|25%' ), icon: icons.centerhalf },
            { key: 'center-wide', col: 3, name: __( 'Size: 20%|60%|20%' ), icon: icons.widecenter },
            { key: 'center-exwide', col: 3, name: __( 'Size: 15%|70%|15%' ), icon: icons.exwidecenter },
            { key: 'equal-four', col: 4, name: __( 'Size: 25%|25%|25%|25%' ), icon: icons.fourcol },
            { key: 'left-forty', col: 4, name: __( 'Size: 40%|20%|20%|20%' ), icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Size: 20%|20%|20%|40%' ), icon: icons.rfourforty },
            { key: 'equal-five', col: 5, name: __( 'Size: 5-|20%|' ), icon: icons.fivecol },
            { key: 'equal-six', col: 6, name: __( 'Size: 6-|16%|' ), icon: icons.sixcol },
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
                        value={ blockAlignment }
                        controls={ [ 'center', 'wide', 'full' ] }
                        onChange={ value => setAttributes( { blockAlignment: value } ) }
                    />
                </BlockControls>
                <div className='ub-section-overhad-wrap'>
                    { !colSection &&(
                       <div className='ub-section-block-wrap'>
                         <div className="ub-select-section">
                           <div className="ub-select-section-title">
                               { __( 'Select section' ) }
                           </div>
                           <ButtonGroup aria-label={ __( 'Column Section' ) }>
                               { map( startSectionOptions, ( { name, key, icon, col } ) => (
                                   <Tooltip text={ name }>
                                       <Button
                                           key={ key }
                                           className="ub-section-btn"
                                           isSmall
                                           onClick={ (props) => setAttributes( {
                                               colSection: key,
                                               columns: col,
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
                        <div className="ub-section-column-wrap" style={ { background: wrapColor } }>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
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
                             <div className="ub-section-column-wrap" style={ { background: wrapColor } }>
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
                                                 mode: 'edit',
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
                            <div className="ub-section-column-wrap" style={ { background: wrapColor } }>
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
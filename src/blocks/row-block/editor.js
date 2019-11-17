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
        console.log('componentDidUpdate');
    }


    render(){
    console.log('render');
        const {
            attributes:{
                colSection,
                columns,
                startOptions,
                columnsUnlocked,
                blockAlignment,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                ColWidthFive,
                ColWidthSix,
            },
            block:{clientId},
            setAttributes,
        } = this.props;

        const createColumn = (col) => {
            createBlock('ub/row-column',{});
            return times( col, col => ['ub/row-column',{}]);
        };

        console.log(this.state);

        const startSectionOptions = [
            { key: 'equal', col: 1, name: __( 'Size: 100%' ), icon: icons.row },
            { key: 'equal-two', col: 2, name: __( 'Size: 50%|50%' ), icon: icons.twocol },
            { key: 'left-golden', col: 2, name: __( 'Size: 66%|33%' ), icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, name: __( 'Size: 33%|66%' ), icon: icons.tworightgolden },
            { key: 'equal-three', col: 3, name: __( 'Size: 25%|25%|25%' ), icon: icons.threecol },
            { key: 'left-half', col: 3, name: __( 'Size: 50%|25%|25%' ), icon: icons.lefthalf },
            { key: 'right-half', col: 3, name: __( 'Size: 25%|25%|25%' ), icon: icons.righthalf },
            { key: 'center-half', col: 3, name: __( 'Size: 25%|50%|25%' ), icon: icons.centerhalf },
            { key: 'center-wide', col: 3, name: __( 'Size: 20%|60%|20%' ), icon: icons.widecenter },
            { key: 'center-exwide', col: 3, name: __( 'Size: 15%|70%|15%' ), icon: icons.exwidecenter },
            { key: 'equal-four', col: 4, name: __( 'Size: 25%|25%|25%|25%' ), icon: icons.fourcol },
            { key: 'left-forty', col: 4, name: __( 'Size: 40%|20%|20%|20%' ), icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Size: 20%|20%|20%|40%' ), icon: icons.rfourforty },
            { key: 'equal-five', col: 5, name: __( 'Size: 5-|20%|' ), icon: icons.fivecol },
            { key: 'equal-six', col: 6, name: __( 'Size: 6-|16%|' ), icon: icons.sixcol },
        ];

        if('equal-two' === colSection){
            setAttributes({ColWidthOne: '50%'});
            setAttributes({ColWidthTwo: '50%'});
        }else if('left-golden' === colSection){
            setAttributes({ColWidthOne: '66%'});
            setAttributes({ColWidthTwo: '33%'});
        }else if('right-golden' === colSection){
            setAttributes({ColWidthOne: '33%'});
            setAttributes({ColWidthTwo: '66%'});
        }else if('equal-three' === colSection){
            setAttributes({ColWidthOne: '33%'});
            setAttributes({ColWidthTwo: '33%'});
            setAttributes({ColWidthThree: '33%'});
        }else if('left-half' === colSection){
            setAttributes({ColWidthOne: '50%'});
            setAttributes({ColWidthTwo: '25%'});
            setAttributes({ColWidthThree: '25%'});
        }else if('right-half' === colSection){
            setAttributes({ColWidthOne: '25%'});
            setAttributes({ColWidthTwo: '25%'});
            setAttributes({ColWidthThree: '50%'});
        }else if('center-half' === colSection){
            setAttributes({ColWidthOne: '25%'});
            setAttributes({ColWidthTwo: '50%'});
            setAttributes({ColWidthThree: '25%'});
        }else if('center-wide' === colSection){
            setAttributes({ColWidthOne: '20%'});
            setAttributes({ColWidthTwo: '60%'});
            setAttributes({ColWidthThree: '20%'});
        }else if('center-exwide' === colSection){
            setAttributes({ColWidthOne: '15%'});
            setAttributes({ColWidthTwo: '70%'});
            setAttributes({ColWidthThree: '15%'});
        }else if('equal-four' === colSection){
            setAttributes({ColWidthOne: '25%'});
            setAttributes({ColWidthTwo: '25%'});
            setAttributes({ColWidthThree: '25%'});
            setAttributes({ColWidthFour: '25%'});
        }else if('left-forty' === colSection){
            setAttributes({ColWidthOne: '40%'});
            setAttributes({ColWidthTwo: '20%'});
            setAttributes({ColWidthThree: '20%'});
            setAttributes({ColWidthFour: '20%'});
        }else if('right-forty' === colSection){
            setAttributes({ColWidthOne: '20%'});
            setAttributes({ColWidthTwo: '20%'});
            setAttributes({ColWidthThree: '20%'});
            setAttributes({ColWidthFour: '40%'});
        }else if('equal-five' === colSection){
            setAttributes({ColWidthOne: '20%'});
            setAttributes({ColWidthTwo: '20%'});
            setAttributes({ColWidthThree: '20%'});
            setAttributes({ColWidthFour: '20%'});
            setAttributes({ColWidthFive: '20%'});
        }else if('equal-six' === colSection){
            setAttributes({ColWidthOne: '16.2%'});
            setAttributes({ColWidthTwo: '16.2%'});
            setAttributes({ColWidthThree: '16.2%'});
            setAttributes({ColWidthFour: '16.2%'});
            setAttributes({ColWidthFive: '16.2%'});
            setAttributes({ColWidthSix: '16.2%'});
        }

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
                        console.log('Let start'),
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
                                                startOptions: false,
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
                        <div className="ub-section-column-wrap">
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
                             <div className="ub-section-column-wrap">
                                 <style>
                                     <Fragment>
                                         { ( !this.state.ResizeColWidthOne ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( ColWidthOne ) }%; }` :`.ub-section-column-wrap > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(1) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthOne ) }%; }`  ) }
                                         { ( !this.state.ResizeColWidthTwo ? `#block-${clientId} .ub-section-column-wrap [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( ColWidthTwo ) }%; }` :`.ub-section-column-wrap  > .editor-inner-blocks > .editor-block-list__layout > [data-type="ub/row-column"]:nth-child(2) { flex: 0 1 ${ parseFloat( this.state.ResizeColWidthTwo)  }%; }` ) }
                                     </Fragment>
                                 </style>
                                 <ContainerDimensions>{({width}) =>
                                     <Resizable
                                         style={style}
                                         className="ub-editor-row-column_left"
                                         minWidth="10%"
                                         maxWidth="90%"
                                         size={{ width:  ( !this.state.ResizeColWidthOne ? ColWidthOne : this.state.ResizeColWidthOne + '%' )}}
                                         enable={{right:true}}
                                         handleClasses={ {
                                             right: 'ub_handle-right',
                                         } }
                                         grid={ ( columnsUnlocked ? [ width / 1000, 1 ] : [ width / 20, 1 ] ) }
                                         onResize = {( event, direction, elt ) => {
                                             let firstCol;
                                             let secondCol;
                                             if ( columnsUnlocked ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
                                             } else {
                                                 firstCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                 secondCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
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
                                             if ( columnsUnlocked ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
                                             } else {
                                                 firstCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                 secondCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
                                             }
                                             this.setState( {
                                                 firstWidth: null,
                                                 secondWidth: null,
                                                 ResizeColWidthOne: firstCol,
                                                 ResizeColWidthTwo: secondCol,
                                                 display: 'none',
                                             } );
                                         }}
                                         axis="x"
                                     ><span className="left-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="left-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthOne ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="right-column-width-size-top" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="right-column-width-size-bottom" style={{ display: this.state.display }}>{!this.state.ResizeColWidthTwo ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                     </Resizable>
                                 }</ContainerDimensions>
                                 <InnerBlocks
                                     template= {createColumn( columns )}
                                     templateLock={'all'}
                                     renderAppender={ ()=> (null) }
                                 />
                                 { 3 === columns &&(
                                     <ContainerDimensions>
                                         {({width}) =>
                                             <Resizable
                                                 style={style}
                                                 className="ub-editor-row-column_right"
                                                 minWidth="10%"
                                                 maxWidth="90%"
                                                 size={{ width:  ( !this.state.ResizeColWidthOne ? ColWidthThree : this.state.ResizeColWidthOne + '%' )}}
                                                 enable={{left:true}}
                                                 handleClasses={ {
                                                     left: 'ub_handle-left',
                                                 } }
                                                 grid={ ( columnsUnlocked ? [ width / 1000, 1 ] : [ width / 20, 1 ] ) }
                                                 onResize = {(event, direction, elt) => {
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columnsUnlocked ) {
                                                         secondCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - secondCol ) * 10 ) / 10;
                                                     } else {
                                                         secondCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                         threeCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
                                                     }
                                                     this.setState( {
                                                         displaythree: 'block',
                                                         secondWidth: secondCol,
                                                         threeWidth: threeCol,
                                                     } );
                                                 }}
                                                 onResizeStop = {(event, direction, elt) => {
                                                     let secondCol;
                                                     let threeCol;
                                                     if ( columnsUnlocked ) {
                                                         secondCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - secondCol ) * 10 ) / 10;
                                                     } else {
                                                         secondCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                         threeCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
                                                     }
                                                     this.setState( {
                                                         secondWidth: null,
                                                         threeWidth: null,
                                                         ResizeColWidthThree: threeCol,
                                                         displaythree: 'none',
                                                     } );
                                                 }}
                                                 axis="x"
                                             >
                                             </Resizable>
                                         }</ContainerDimensions>
                                 )}
                             </div>
                        </Fragment>
                    )}
                    { colSection && columns && 1 !== columns && 2 !== columns && 3 !== columns &&(
                        <Fragment>
                            <div className="ub-section-column-wrap">
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
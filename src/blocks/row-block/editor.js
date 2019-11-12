//Import icons layout
import icons from './icons/icons';

// Import External
import map from 'lodash/map';
import { Resizable } from 're-resizable';
import ContainerDimensions from 'react-container-dimensions';

// Setup the block
const { __ } = wp.i18n;
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

export default class RowEditor extends Component {

    constructor() {
        super( ...arguments );
        this.state = {
            firstWidth: null,
            secondWidth: null,
            threeWidth: null,
            display: 'none',
            displaythree: 'none',
        };
    }

    render(){
        const {
            attributes:{
                colSection,
                columns,
                columnsUnlocked,
                blockAlignment,
                firstColumnWidth,
                secondColumnWidth,
                threeColumnWidth,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                ColWidthFive,
                ColWidthSix,
            },
            setAttributes,
        } = this.props;

        console.log(this.props);

        const startSectionOptions = [
            { key: 'equal', col: 1, name: __( 'Row' ), icon: icons.row },
            { key: 'equal-two', col: 2, name: __( 'Two: Equal' ), icon: icons.twocol },
            { key: 'left-golden', col: 2, name: __( 'Two: Left Heavy 66/33' ), icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, name: __( 'Two: Right Heavy 33/66' ), icon: icons.tworightgolden },
            { key: 'equal-three', col: 3, name: __( 'Three: Equal' ), icon: icons.threecol },
            { key: 'left-half', col: 3, name: __( 'Three: Left Heavy 50/25/25' ), icon: icons.lefthalf },
            { key: 'right-half', col: 3, name: __( 'Three: Right Heavy 25/25/50' ), icon: icons.righthalf },
            { key: 'center-half', col: 3, name: __( 'Three: Center Heavy 25/50/25' ), icon: icons.centerhalf },
            { key: 'center-wide', col: 3, name: __( 'Three: Wide Center 20/60/20' ), icon: icons.widecenter },
            { key: 'center-exwide', col: 3, name: __( 'Three: Wider Center 15/70/15' ), icon: icons.exwidecenter },
            { key: 'equal-four', col: 4, name: __( 'Four: Equal' ), icon: icons.fourcol },
            { key: 'left-forty', col: 4, name: __( 'Four: Left Heavy 40/20/20/20' ), icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Four: Right Heavy 20/20/20/40' ), icon: icons.rfourforty },
            { key: 'equal-five', col: 5, name: __( 'Five: Equal' ), icon: icons.fivecol },
            { key: 'equal-six', col: 6, name: __( 'Six: Equal' ), icon: icons.sixcol },
        ];

        if('equal' === colSection){
            setAttributes({ColWidthOne: '100%'});
        }else if('equal-two' === colSection){
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
                    { !colSection &&(<div className='ub-section-block-wrap'>
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
                                            onClick={ () => setAttributes( {
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
                        <div className="ub-section-column-wrap">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}>
                                {<InnerBlocks/>}
                            </div>
                        </div>
                    )}
                    { colSection && columns && 1 !== columns && 4 !== columns && 5 !== columns && 6 !== columns &&(
                        <Fragment>
                             <div className="ub-section-column-wrap">
                                 <ContainerDimensions>{({width}) =>
                                     <Resizable
                                         style={style}
                                         className="ub-editor-row-column"
                                         minWidth="10%"
                                         maxWidth="90%"
                                         size={{ width:  ( ! firstColumnWidth ? ColWidthOne : firstColumnWidth + '%' )}}
                                         enable={{right:true}}
                                         handleClasses={ {
                                             right: 'ub_handle-right',
                                         } }
                                         grid={ ( columnsUnlocked ? [ width / 1000, 1 ] : [ width / 20, 1 ] ) }
                                         onResize = {( event, direction, elt ) => {
                                             let firstCol;
                                             let secondCol;
                                             this.setState({
                                                 display: 'block',
                                             });
                                             if ( columnsUnlocked ) {
                                                 firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                 secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
                                             } else {
                                                 firstCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                 secondCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
                                             }
                                             this.setState( {
                                                 firstWidth: firstCol,
                                             } );
                                             this.setState( {
                                                 secondWidth: secondCol,
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
                                             setAttributes( { firstColumnWidth: firstCol } );
                                             setAttributes( { secondColumnWidth: secondCol } );
                                             this.setState( {
                                                 firstWidth: null,
                                                 secondWidth: null,
                                                 display: 'none',
                                             } );
                                         }}
                                         axis="x"
                                     ><InnerBlocks/>
                                         <span className="left-column-width-size-top" style={{ display: this.state.display }}>{! firstColumnWidth ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="left-column-width-size-bottom" style={{ display: this.state.display }}>{! firstColumnWidth ? ColWidthOne : this.state.firstWidth + '%'}</span>
                                         <span className="right-column-width-size-top" style={{ display: this.state.display }}>{! secondColumnWidth ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="right-column-width-size-bottom" style={{ display: this.state.display }}>{! secondColumnWidth ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                     </Resizable>
                                 }</ContainerDimensions>
                                 <ContainerDimensions>
                                 {({width}) =>
                                     <Resizable
                                         style={style}
                                         className="ub-editor-row-column"
                                         size={ { width:  ( ! secondColumnWidth ? ColWidthTwo : secondColumnWidth + '%' ) }}
                                         enable={{
                                             top: false,
                                             right: false,
                                             bottom: true,
                                             left: false,
                                             topRight: false,
                                             bottomRight: false,
                                             bottomLeft: false,
                                             topLeft: false,
                                         }}
                                     >
                                         <InnerBlocks/>
                                         <span className="left-column-width-size-top" style={{ display: this.state.displaythree }}>{! secondColumnWidth ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="left-column-width-size-bottom" style={{ display: this.state.displaythree }}>{! secondColumnWidth ? ColWidthTwo : this.state.secondWidth + '%'}</span>
                                         <span className="right-column-width-size-top" style={{ display: this.state.displaythree }}>{! threeColumnWidth ? ColWidthOne : this.state.threeWidth + '%'}</span>
                                         <span className="right-column-width-size-bottom" style={{ display: this.state.displaythree }}>{! threeColumnWidth ? ColWidthOne : this.state.threeWidth + '%'}</span>
                                     </Resizable>
                                 }</ContainerDimensions>
                                 { 3 === columns &&(
                                     <ContainerDimensions>
                                         {({width}) =>
                                             <Resizable
                                                 style={style}
                                                 className="ub-editor-row-column"
                                                 minWidth="10%"
                                                 maxWidth="90%"
                                                 size={{ width:  ( ! threeColumnWidth ? ColWidthThree : threeColumnWidth + '%' )}}
                                                 enable={{left:true}}
                                                 handleClasses={ {
                                                     left: 'ub_handle-left',
                                                 } }
                                                 grid={ ( columnsUnlocked ? [ width / 1000, 1 ] : [ width / 20, 1 ] ) }
                                                 onResize = {(event, direction, elt) => {
                                                     let secondCol;
                                                     let threeCol;
                                                     this.setState({
                                                         displaythree: 'block',
                                                     });
                                                     if ( columnsUnlocked ) {
                                                         secondCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
                                                         threeCol = Math.round( ( 100 - secondCol ) * 10 ) / 10;
                                                     } else {
                                                         secondCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
                                                         threeCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
                                                     }
                                                     this.setState( {
                                                         secondWidth: secondCol,
                                                     } );
                                                     this.setState( {
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
                                                     setAttributes( { secondColumnWidth: secondCol } );
                                                     setAttributes( { threeColumnWidth: threeCol } );
                                                     this.setState( {
                                                         firstWidth: null,
                                                         threeWidth: null,
                                                         displaythree: 'none',
                                                     } );
                                                 }}
                                                 axis="x"
                                             >
                                              <InnerBlocks/>
                                             </Resizable>
                                         }</ContainerDimensions>
                                 )}
                             </div>
                        </Fragment>
                    )}
                    { colSection && columns && 1 !== columns && 2 !== columns && 3 !== columns &&(
                        <Fragment>
                            <div className="ub-section-column-wrap">
                                <Resizable
                                    style={style}
                                    className="ub-editor-row-column"
                                    size={{ width: ColWidthOne }}
                                >
                                    <InnerBlocks/>
                                </Resizable>
                                <Resizable
                                    style={style}
                                    className="ub-editor-row-column"
                                    size={{ width: ColWidthTwo }}
                                >
                                    <InnerBlocks/>
                                </Resizable>
                                <Resizable
                                    style={style}
                                    className="ub-editor-row-column"
                                    size={{ width: ColWidthThree }}
                                >
                                    <InnerBlocks/>
                                </Resizable>
                                <Resizable
                                    style={style}
                                    className="ub-editor-row-column"
                                    size={{ width: ColWidthFour }}
                                >
                                    <InnerBlocks/>
                                </Resizable>
                                {5 === columns &&(
                                    <Resizable
                                        style={style}
                                        className="ub-editor-row-column"
                                        size={{ width: ColWidthFive }}
                                    >
                                        <InnerBlocks/>
                                    </Resizable>
                                )}
                                {6 === columns &&(
                                    <Fragment>
                                        <Resizable
                                            style={style}
                                            className="ub-editor-row-column"
                                            size={{ width: ColWidthSix }}
                                        >
                                            <InnerBlocks/>
                                        </Resizable>
                                        <Resizable
                                        style={style}
                                        className="ub-editor-row-column"
                                        size={{ width: ColWidthSix }}
                                        >
                                        <InnerBlocks/>
                                        </Resizable>
                                    </Fragment>
                                )}
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        ]
    }
}
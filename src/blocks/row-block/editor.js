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
    InnerBlocks
} = wp.blockEditor || wp.editor;

export default class RowEditor extends Component {
    render(){
        const {
            attributes:{
                colSection,
                columns,
                columnsUnlocked,
            },
            setAttributes,
        } = this.props;

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

        const ColWidthOne = '';
        const ColWidthTwo = '';
        const ColWidthThree = '';

        if('equal' === colSection){
            this.ColWidthOne = '100%';
        }else if('equal-two' === colSection){
            this.ColWidthOne = '50%';
            this.ColWidthTwo = '50%';
        }else if('left-golden' === colSection){
            this.ColWidthOne = '66%';
            this.ColWidthTwo = '33%';
        }else if('right-golden' === colSection){
            this.ColWidthOne = '33%';
            this.ColWidthTwo = '66%'
        }else if('equal-three' === colSection){
            this.ColWidthOne = '33%';
            this.ColWidthTwo = '66%';
            this.ColWidthThree = ''
        }else if('left-half' === colSection){
            this.ColWidthOne = '50%';
            this.ColWidthTwo = '25%';
            this.ColWidthThree = '25%'
        }else if('right-half' === colSection){
            this.ColWidthOne = '25%';
            this.ColWidthTwo = '25%';
            this.ColWidthThree = '50%'
        }else if('center-half' === colSection){
            this.ColWidthOne = '25%';
            this.ColWidthTwo = '50%';
            this.ColWidthThree = '25%'
        }else if('center-wide' === colSection){
            this.ColWidthOne = '20%';
            this.ColWidthTwo = '60%';
            this.ColWidthThree = '20%'
        }else if('center-exwide' === colSection){
            this.ColWidthOne = '15%';
            this.ColWidthTwo = '70%';
            this.ColWidthThree = '15%'
        }else if('equal-four' === colSection){
            this.ColWidthOne = '20%';
            this.ColWidthTwo = '20%';
            this.ColWidthThree = '20%';
            this.ColWidthFour = '20%'
        }else if('left-forty' === colSection){
            this.ColWidthOne = '40%';
            this.ColWidthTwo = '20%';
            this.ColWidthThree = '20%';
            this.ColWidthFour = '20%'
        }else if('left-forty' === colSection){
            this.ColWidthOne = '20%';
            this.ColWidthTwo = '20%';
            this.ColWidthThree = '20%';
            this.ColWidthFour = '40%'
        }

        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
        };

        return[
            <Fragment>
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
                    { colSection &&(
                        <div className="ub-section-column-wrap" style={{ width: this.ColWidthOne}}>
                            <ContainerDimensions>
                                {({width}) =>
                                    <Resizable
                                        style={style}
                                        className="ub-editor-row-column_resizer"
                                        minWidth="10%"
                                        maxWidth="100%"
                                        size={{ width: '100%'}}
                                        enable={{right:true}}
                                        handleClasses={ {
                                            right: 'ub_handle-right',
                                        } }
                                        onResizeStart ={()=>{}}
                                        onResize = {()=>{}}
                                        onResizeStop = { ()=>{}}
                                        axis="x"
                                    ><InnerBlocks/>
                                    </Resizable>
                                }</ContainerDimensions>
                        </div>
                    )}
                    { colSection && 2 === columns &&(
                        <div className="ub-section-column-wrap" style={{ width: this.ColWidthTwo}}>
                            <Resizable
                                style={style}
                                className="ub-editor-row-column"
                                size={{ width: '100%' }}
                                enable={{right:false, left:false}}
                                onResizeStart ={()=>{}}
                                onResize = {()=>{}}
                                onResizeStop = { ()=>{}}
                            >
                                <InnerBlocks/>
                            </Resizable>
                        </div>
                    )}
                    { colSection && 3 === columns &&(
                        <Fragment>
                        <div className="ub-section-column-wrap" style={{ width: this.ColWidthTwo}}>
                            <Resizable
                                style={style}
                                className="ub-editor-row-column"
                                size={{ width: '100%' }}
                                enable={{right:false, left:false}}
                                onResizeStart ={()=>{}}
                                onResize = {()=>{}}
                                onResizeStop = { ()=>{}}
                            >
                                <InnerBlocks/>
                            </Resizable>
                        </div>
                        <div className="ub-section-column-wrap" style={{ width: this.ColWidthThree}}>
                            <Resizable
                                style={style}
                                className="ub-editor-row-column"
                                size={{ width: '100%' }}
                                enable={{right:false, left:false}}
                                onResizeStart ={()=>{}}
                                onResize = {()=>{}}
                                onResizeStop = { ()=>{}}
                            >
                                <InnerBlocks/>
                            </Resizable>
                        </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        ]
    }
}
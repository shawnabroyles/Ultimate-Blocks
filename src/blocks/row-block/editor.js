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
            { key: 'equal', col: 2, name: __( 'Two: Equal' ), icon: icons.twocol },
            { key: 'left-golden', col: 2, name: __( 'Two: Left Heavy 66/33' ), icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, name: __( 'Two: Right Heavy 33/66' ), icon: icons.tworightgolden },
            { key: 'equal', col: 3, name: __( 'Three: Equal' ), icon: icons.threecol },
            { key: 'left-half', col: 3, name: __( 'Three: Left Heavy 50/25/25' ), icon: icons.lefthalf },
            { key: 'right-half', col: 3, name: __( 'Three: Right Heavy 25/25/50' ), icon: icons.righthalf },
            { key: 'center-half', col: 3, name: __( 'Three: Center Heavy 25/50/25' ), icon: icons.centerhalf },
            { key: 'center-wide', col: 3, name: __( 'Three: Wide Center 20/60/20' ), icon: icons.widecenter },
            { key: 'center-exwide', col: 3, name: __( 'Three: Wider Center 15/70/15' ), icon: icons.exwidecenter },
            { key: 'equal', col: 4, name: __( 'Four: Equal' ), icon: icons.fourcol },
            { key: 'left-forty', col: 4, name: __( 'Four: Left Heavy 40/20/20/20' ), icon: icons.lfourforty },
            { key: 'right-forty', col: 4, name: __( 'Four: Right Heavy 20/20/20/40' ), icon: icons.rfourforty },
            { key: 'equal', col: 5, name: __( 'Five: Equal' ), icon: icons.fivecol },
            { key: 'equal', col: 6, name: __( 'Six: Equal' ), icon: icons.sixcol },
        ];

        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0"
        };

        return[
            <Fragment>
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
                    <ContainerDimensions>
                        {({width}) =>
                            <Fragment>
                                <Resizable
                                    style={style}
                                    defaultSize={{
                                        width: 100,
                                        height: 100
                                    }}
                                >
                                    Test block
                                </Resizable>
                                <Resizable
                                style={style}
                                defaultSize={{
                                width: 100,
                                height: 100
                                }}
                                >
                                Test block two
                                </Resizable>
                            </Fragment>
                        }
                    </ContainerDimensions>
                )}
            </Fragment>
        ]
    }
}
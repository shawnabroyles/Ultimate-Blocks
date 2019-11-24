// import CSS.
import './editor.scss';
import icons from "./icons/icons";
import map from "lodash/map";

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
    Toolbar,
    ToggleControl,
    SelectControl,
} = wp.components;

export default class Inspector extends Component {
    constructor(){
        super( ...arguments );
    }

    render(){
        const {
            attributes: {
                startOptions,
                colSection,
                columns,
                mode,
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                borderWrap,
                wrapColor,
                gutter,
                wrapTag,
            },
            setAttributes,
        } = this.props;

        console.log(this.props);

        const columnTypeTwo = [
            { key: 'equal-two', col: 2, icon: icons.twocol },
            { key: 'left-golden', col: 2, icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, icon: icons.tworightgolden },
        ];

        const columnTypeThree = [
            { key: 'equal-three', col: 3, icon: icons.threecol },
            { key: 'left-half', col: 3, icon: icons.lefthalf },
            { key: 'right-half', col: 3, icon: icons.righthalf },
            { key: 'center-half', col: 3, icon: icons.centerhalf },
            { key: 'center-wide', col: 3, icon: icons.widecenter },
            { key: 'center-exwide', col: 3, icon: icons.exwidecenter },
        ];

        const columnTypeFour = [
            { key: 'equal-four', col: 4, icon: icons.fourcol },
            { key: 'left-forty', col: 4, icon: icons.lfourforty },
            { key: 'right-forty', col: 4, icon: icons.rfourforty }
        ];

        const columnTypeFive = [

        ];

        const columnTypeSix = [

        ];

        let selectTypeColumn;

        if( columns == 2 ){
            selectTypeColumn = columnTypeTwo;
        } else if ( columns == 3 ){
            selectTypeColumn = columnTypeThree;
        } else if ( columns == 4 ){
            selectTypeColumn == columnTypeFive;
        }

        const selectGrid = (props) => (
            <Fragment>
                <div className="ub-select-layout-grid">
                    <p>Select column type for column: {columns} </p>
                    <ButtonGroup aria-label={ __( 'Select Type Column' ) }>
                        { map( selectTypeColumn, ( { key, icon, col } ) => (
                            <Button
                                key={ key }
                                className="ub-section-btn"
                                isSmall
                                onClick={ (props) => setAttributes( {
                                    colSection: key,
                                    columns: col,
                                    mode: '',
                                } ) }
                            >
                                { icon }
                            </Button>
                        ) ) }
                    </ButtonGroup>
                    <SelectControl
                        label={ __( 'Size Gutter' ) }
                        value={ gutter }
                        options={ [
                            { value: 'None', label: __( 'None 0px' ) },
                            { value: 'Small', label: __( 'Small 4px' ) },
                            { value: 'Medium', label: __( 'Medium 12px' ) },
                            { value: 'Large', label: __( 'Large 34px' ) },
                            { value: 'Huge', label: __( 'Huge 88px' ) },
                        ] }
                        onChange={ value => setAttributes( { gutter: value } ) }
                    />
                    <p>Space between each column.</p>
                </div>
            </Fragment>
        )

        const startSetting = (
            <Fragment>
                <PanelBody
                    title={ __( 'Margin | Padding | Border Wrap' ) }
                    initialOpen={ false }
                >
                    <div className="ub-layout-wrap_margin_box">
                        <div className="margin-st_box1">
                            <RangeControl
                               value={ marginTopWrap }
                               onChange={ value => {
                                   setAttributes({
                                       marginTopWrap: value
                                   });
                               }}
                               min={ 0 }
                               max={ 100 }
                            />
                        </div>
                        <div className="margin-st_box2">
                            <div className="margin-col-1">
                                <RangeControl
                                    value={ marginLeftWrap }
                                    onChange={ value => {
                                        setAttributes({
                                            marginLeftWrap: value
                                        });
                                    }}
                                    min={ 0 }
                                    max={ 100 }
                                />
                            </div>
                            <div className="margin-col-2">
                                <div className="padding-st_box1">
                                    <p>Padding</p>
                                    <RangeControl
                                        value={ paddingTopWrap }
                                        onChange={ value => {
                                            setAttributes({
                                                paddingTopWrap: value
                                            });
                                        }}
                                        min={ 0 }
                                        max={ 100 }
                                    />
                                </div>
                                <div className="padding-st_box2">
                                    <div className="padding-col-1">
                                        <RangeControl
                                            value={ paddingLeftWrap }
                                            onChange={ value => {
                                                setAttributes({
                                                    paddingLeftWrap: value
                                                });
                                            }}
                                            min={ 0 }
                                            max={ 100 }
                                        />
                                    </div>
                                    <div className="padding-col-2">
                                        <p>Content</p>
                                    </div>
                                    <div className="padding-col-3">
                                        <RangeControl
                                            value={ paddingRightWrap }
                                            onChange={ value => {
                                                setAttributes({
                                                    paddingRightWrap: value
                                                });
                                            }}
                                            min={ 0 }
                                            max={ 100 }
                                        />
                                    </div>
                                </div>
                                <div className="padding-st_box3">
                                    <RangeControl
                                        value={ paddingBottomWrap }
                                        onChange={ value => {
                                            setAttributes({
                                                paddingBottomWrap: value
                                            });
                                        }}
                                        min={ 0 }
                                        max={ 100 }
                                    />
                                </div>
                            </div>
                            <div className="margin-col-3">
                                <RangeControl
                                    value={ marginRightWrap }
                                    onChange={ value => {
                                        setAttributes({
                                            marginRightWrap: value
                                        });
                                    }}
                                    min={ 0 }
                                    max={ 100 }
                                />
                            </div>
                        </div>
                        <div className="margin-st_box3">
                            <RangeControl
                               value={ marginBottomWrap }
                               onChange={ value => {
                                   setAttributes({
                                       marginBottomWrap: value
                                   });
                               }}
                               min={ 0 }
                               max={ 100 }
                            />
                        </div>
                    </div>
                    <RangeControl
                        label = {__( 'Border Size' )}
                        value={ borderWrap }
                        onChange={ value => {
                            setAttributes({
                                borderWrap: value
                            });
                        }}
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Background Setting Wrap' ) }
                    initialOpen={ false }
                >
                    <ColorPalette
                        value={wrapColor}
                        onChange={colorBackground =>
                            setAttributes({ wrapColor: colorBackground })
                        }
                        allowReset
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Stucture Setting' ) }
                    initialOpen={ false }
                >
                    <SelectControl
                        label={ __( 'Wrap HTML tag' ) }
                        value={ wrapTag }
                        options={ [
                            { value: 'div', label: __( 'div' ) },
                            { value: 'header', label: __( 'header' ) },
                            { value: 'section', label: __( 'section' ) },
                            { value: 'article', label: __( 'article' ) },
                            { value: 'main', label: __( 'main' ) },
                            { value: 'aside', label: __( 'aside' ) },
                            { value: 'footer', label: __( 'footer' ) },
                        ] }
                        onChange={ value => setAttributes( { wrapTag: value } ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Text Color Setting' ) }
                    initialOpen={ false }
                >

                </PanelBody>
            </Fragment>
        );

        return[
            <Fragment>
                <InspectorControls>
                    {selectGrid}
                </InspectorControls>
                <InspectorControls>
                    {startSetting}
                </InspectorControls>
            </Fragment>
        ]
    }
}
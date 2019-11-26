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
                inspectorTypeColumn,
                ColWidthOne,
                ColWidthTwo,
                ColWidthThree,
                ColWidthFour,
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                borderWrap,
                gutter,
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
            setAttributes,
        } = this.props;

        console.log(this.props);

        const columnTypeTwo = [
            { key: 'equal-two', col: 2, One: '50%', Two: '50%', icon: icons.twocol },
            { key: 'left-golden', col: 2, One: '66%', Two: '33%', icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, One: '33%', Two: '66%', icon: icons.tworightgolden },
        ];

        const columnTypeThree = [
            { key: 'equal-three', col: 3, One: '33%', Two: '33%', Three: '33%', icon: icons.threecol },
            { key: 'left-half', col: 3, One: '50%', Two: '25%', Three: '25%', icon: icons.lefthalf },
            { key: 'right-half', col: 3, One: '25%', Two: '25%', Three: '50%', icon: icons.righthalf },
            { key: 'center-half', col: 3, One: '25%', Two: '50%', Three: '25%', icon: icons.centerhalf },
            { key: 'center-wide', col: 3, One: '20%', Two: '60%', Three: '20%', icon: icons.widecenter },
            { key: 'center-exwide', col: 3, One: '15%', Two: '70%', Three: '15%', icon: icons.exwidecenter },
        ];

        const columnTypeFour = [
            { key: 'equal-four', col: 4, One: '25%', Two: '25%', Three: '25%', Four: '25%', icon: icons.fourcol },
            { key: 'left-forty', col: 4, One: '40%', Two: '20%', Three: '20%', Four: '20%', icon: icons.lfourforty },
            { key: 'right-forty', col: 4, One: '20%', Two: '20%', Three: '20%', Four: '40%', icon: icons.rfourforty }
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
            selectTypeColumn == columnTypeFour;
        }

        const selectGrid = (props) => (
            <Fragment>
                <div className="ub-select-layout-grid">
                    <p>Select column type for column: {columns} </p>
                    <ButtonGroup aria-label={ __( 'Select Type Column' ) }>
                        { map( selectTypeColumn, ( { key, icon, col, One, Two, Three, Four } ) => (
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
                                    inspectorTypeColumn: true,
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
                    <p>Background Color</p>
                    <ColorPalette
                        value={wrapColor}
                        onChange={colorBackground =>
                            setAttributes({ wrapColor: colorBackground })
                        }
                        allowReset
                    />
                    <p>Background Image</p>
                    <div>
                    { imgURL ? (
                        <Fragment>
                            <img src={imgURL} id={imgID} alt={imgAlt}/>
                            <Button
                                className="components-button button button-medium"
                                onClick = {({props}) => {
                                      setAttributes({
                                          imgURL: '',
                                          imgID: '',
                                          imgAlt: '',
                                      })
                                }}
                            >
                            Delete image
                            </Button>
                            <SelectControl
                                label={ __( 'Background Image Size' ) }
                                value={ wrapBackgoundSize }
                                options={ [
                                    { value: 'cover', label: __( 'Cover' ) },
                                    { value: 'contain', label: __( 'Contain' ) },
                                    { value: 'auto', label: __( 'Auto' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgoundSize: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Position' ) }
                                value={ wrapBackgroundPosition }
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
                                onChange={ value => setAttributes( { wrapBackgoundPosition: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Repeat' ) }
                                value={ wrapBackgroundRepeat }
                                options={ [
                                    { value: 'no-repeat', label: __( 'No Repeat' ) },
                                    { value: 'repeat', label: __( 'Repeat' ) },
                                    { value: 'repeat-x', label: __( 'Repeat-x' ) },
                                    { value: 'repeat-y', label: __( 'Repeat-y' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundRepeat: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Attachment' ) }
                                value={ wrapBackgroundAttachment }
                                options={ [
                                    { value: 'scroll', label: __( 'Scroll' ) },
                                    { value: 'fixed', label: __( 'Fixed' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundAttachment: value } ) }
                            />
                        </Fragment>
                    ) : (
                        <MediaUpload
                            onSelect={img =>
                                setAttributes({
                                    imgID: img.id,
                                    imgURL: img.url,
                                    imgAlt: img.alt
                                })
                            }
                            type="image"
                            value={imgID}
                            render={({open}) => (
                                <Button
                                    className="components-button button button-medium"
                                    onClick={open}
                                >
                                    {__('Upload Image')}
                                </Button>
                            )}
                        />)
                    }
                    </div>
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
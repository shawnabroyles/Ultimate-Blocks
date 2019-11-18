// import CSS.
import './editor.scss';

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
} = wp.blockEditor;

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
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                WrapTag,
                borderWrap,
            },
            setAttributes,
        } = this.props;

        console.log(this.props);

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
                                <div className="margin-st_box3">
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
                />
                <PanelBody
                    title={ __( 'Stucture Setting' ) }
                    initialOpen={ false }
                >
                    <SelectControl
                        label={ __( 'Wrap HTML tag' ) }
                        value={ WrapTag }
                        options={ [
                            { value: 'div', label: __( 'div' ) },
                            { value: 'header', label: __( 'header' ) },
                            { value: 'section', label: __( 'section' ) },
                            { value: 'article', label: __( 'article' ) },
                            { value: 'main', label: __( 'main' ) },
                            { value: 'aside', label: __( 'aside' ) },
                            { value: 'footer', label: __( 'footer' ) },
                        ] }
                        onChange={ value => setAttributes( { WrapTag: value } ) }
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
                    {startSetting}
                </InspectorControls>
            </Fragment>
        ]
    }
}
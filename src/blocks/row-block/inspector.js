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
            },
            setAttributes,
        } = this.props;

        const startSetting = (
            <Fragment>
                <PanelBody
                    title={ __( 'Margin/Padding/Border Wrap' ) }
                    initialOpen={ false }
                >
                    <div className="ub-layout-wrap_margin_box">
                        <div className="margin-st_box1">
                            <p>Margin</p>
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
                        <div className="margin-st_box2"></div>
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
                </PanelBody>
                <PanelBody
                    title={ __( 'Padding Wrap' ) }
                    initialOpen={ false }
                />
                <PanelBody
                    title={ __( 'Background Setting Wrap' ) }
                    initialOpen={ false }
                />
            </Fragment>
        );

        return[
            <Fragment>
                <InspectorControls>
                    {startOptions &&(startSetting)}
                </InspectorControls>
            </Fragment>
        ]
    }
}
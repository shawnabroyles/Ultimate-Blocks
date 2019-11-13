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
            },
            setAttributes,
        } = this.props;

        const startSetting = (
            <Fragment>
                <PanelBody
                    title={ __( 'Margin Wrap' ) }
                    initialOpen={ false }
                />
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
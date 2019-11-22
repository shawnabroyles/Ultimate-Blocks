/**
 * BLOCK: Column
 */

// Import style
import '../editor.scss';
import icons from "../icons/icons";

const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { InnerBlocks } = wp.blockEditor || wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'ub/row-column', {
    title: __('Column', 'ultimate-blocks'),
    parent: __('ub/row-block'),
    icon: icons.menuIcon,
    category: 'ultimateblocks',
    attributes: {
        id_column: {
            type: 'string',
            default: '',
        },
    },
    supports: {
        inserter: false,
        reusable: false
    },
    edit: withSelect((select, ownProps) => ({
        block: (
            select('core/block-editor') || select('core/editor')
        ).getBlock(ownProps.clientId)
    }))( props => {
        const {
            attributes:{
              id_column,
            },
            block:{
              clientId
            },
            setAttributes,
        } = props;

        const {block} = props;

        setAttributes({ id_column: clientId});

        console.log(props);
        return(
           <div className='ub-single-column'>
              <InnerBlocks
                  templateLock={false}
              />
           </div>
        );
    }),
    save:() => <InnerBlocks.Content />
});
/**
 * BLOCK: Section
 */

// Import icon.
import icons from './icons/icons';

// Import style
import './style.scss';
import './editor.scss';

// Import attributes
import attributes from './attributes';

// Import Inspector and Editor
import Inspector from './inspector'
import RowEditor from './editor';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { Fragment } = wp.element;

export default registerBlockType( 'ub/row-block', {
    title: __('Row Block', 'ultimate-blocks'),
    description: __(
        'Row Block',
        'ultimate-blocks'
    ),
    icon: icons.menuIcon,
    category: 'ultimateblocks',
    keywords: [
        __('row-block', 'ultimate-blocks'),
        __('row', 'ultimate-blocks'),
        __('Ultimate Blocks', 'ultimate-blocks')
    ],
    attributes,
    edit: withSelect((select, ownProps) => ({
        block: (
            select('core/block-editor') || select('core/editor')
        ).getBlock(ownProps.clientId)
    }))( props => {
        const { block } = props;
        const { setAttributes } = props;
        return(
           <Fragment>
               <Inspector {...props}/>
               <RowEditor {...props}/>
           </Fragment>
        )
    }),
    save: () => null
});

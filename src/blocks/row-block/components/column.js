/**
 * BLOCK: Column
 */

// Import style
import '../editor.scss';
import icons from "../icons/icons";

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor || wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'ub/row-column', {
    title: __('Column', 'ultimate-blocks'),
    parent: __('ub/row-block'),
    icon: icons.menuIcon,
    category: 'ultimateblocks',
    attributes: {},
    supports: {
        inserter: false,
        reusable: false
    },
    edit(props) {
        return(
           <div className='ub-single-column'>
              <InnerBlocks
                  templateLock={false}
              />
           </div>
        );
    },
    save: () => <InnerBlocks.Content />
});
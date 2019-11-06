// Import icon.
import icons from './icons/icons';

import attributes from "./attributes";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

export default registerBlockType( 'ub/row-block', {
    title: __('Row Block', 'ultimate-blocks'),
    description: __(
        'Row Block',
        'ultimate-blocks'
    ),
    icon: icons,
    category: 'ultimateblocks',
    keywords: [
        __('row-block', 'ultimate-blocks'),
        __('row', 'ultimate-blocks'),
        __('Ultimate Blocks', 'ultimate-blocks')
    ],
    attributes,
    edit: () => {
        return('Row block')
    },
    save: () => null
});

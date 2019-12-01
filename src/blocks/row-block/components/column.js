/**
 * BLOCK: Column
 */

// Import style
import '../editor.scss';
import icons from "../icons/icons";
import ColumnInspector from "./columnInspector";

const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { InnerBlocks } = wp.blockEditor || wp.editor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

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
        columnBgColor: {
            type: 'string',
            default: '',
        },
        columnImgID: {
            type: 'number'
        },
        columnImgURL: {
            type: 'string',
            default: '',
        },
        columnImgAlt: {
            type: 'string',
            default: '',
        },
        columnBgSize: {
            type: 'string',
            default: 'cover',
        },
        columnBgPosition: {
            type: 'string',
            default: 'center center',
        },
        columnBgRepeat: {
            type: 'string',
            default: 'no-repeat',
        },
        columnBgAttachment: {
            type: 'string',
            default: 'scroll',
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
                columnBgColor,
                columnImgID,
                columnImgURL,
                columnImgAlt,
                columnBgSize,
                columnBgRepeat,
                columnBgPosition,
                columnBgAttachment,
            },
            block:{
              clientId
            },
            setAttributes,
            isSelected,
        } = props;

        const {block} = props;

        setAttributes({ id_column: clientId});

        console.log(props);
        return(
           <Fragment>
               {isSelected && <ColumnInspector {...props}/>}
               <div className='ub-single-column' style={{
                   backgroundImage: ( columnImgURL ? `url( ${columnImgURL} )` : undefined ),
                   backgroundColor: columnBgColor,
                   backgroundSize: columnBgSize,
                   backgroundPosition: columnBgPosition,
                   backgroundRepeat: columnBgRepeat,
                   backgroundAttachment: columnBgAttachment,
               }}>
                  <InnerBlocks
                      templateLock={false}
                  />
               </div>
           </Fragment>
        );
    }),
    save:() => <InnerBlocks.Content />
});
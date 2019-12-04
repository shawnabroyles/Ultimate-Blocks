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
        columnBorderStyle: {
            type: 'string',
            default: 'solid',
        },
        columnBorderSize: {
            type: 'number',
            default: 0
        },
        columnBorderRadius: {
            type: 'number',
            default: 0,
        },
        columnBorderColor: {
            type: 'string',
            default: '#ffffff',
        },
        columnBorderTop: {
            type: 'number',
            default: 0,
        },
        columnBorderLeft: {
            type: 'number',
            default: 0,
        },
        columnBorderRight: {
            type: 'number',
            default: 0,
        },
        columnBorderBottom: {
            type: 'number',
            default: 0,
        },
        columnBrTopRadius: {
            type: 'number',
            default: 0,
        },
        columnBrLeftRadius: {
            type: 'number',
            default: 0,
        },
        columnBrRightRadius: {
            type: 'number',
            default: 0,
        },
        columnBrBottomRadius: {
            type: 'number',
            default: 0,
        },
        columnPaddingTop: {
            type: 'number',
            default: 0,
        },
        columnPaddingRight: {
            type: 'number',
            default: 0,
        },
        columnPaddingLeft: {
            type: 'number',
            default: 0,
        },
        columnPaddingBottom: {
            type: 'number',
            default: 0,
        },
        columnMarginTop: {
            type: 'number',
            default: 0,
        },
        columnMarginRight: {
            type: 'number',
            default: 0,
        },
        columnMarginLeft: {
            type: 'number',
            default: 0,
        },
        columnMarginBottom: {
            type: 'number',
            default: 0,
        },
        onControlBrSize: {
            type: 'bool',
            default: true,
        },
        onControlBrRadius: {
            type: 'bool',
            default: true,
        }
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
                columnBorderColor,
                columnBorderStyle,
                columnBorderSize,
                columnBorderRadius,
                columnBorderTop,
                columnBorderLeft,
                columnBorderRight,
                columnBorderBottom,
                columnBrTopRadius,
                columnBrLeftRadius,
                columnBrRightRadius,
                columnBrBottomRadius,
                columnPaddingTop,
                columnPaddingRight,
                columnPaddingLeft,
                columnPaddingBottom,
                columnMarginTop,
                columnMarginRight,
                columnMarginLeft,
                columnMarginBottom,
                onControlBrSize,
                onControlBrRadius,
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
               <div className='ub-single-column-wrap' style={{
                   margin: `${columnMarginTop}px ${columnMarginRight}px ${columnMarginBottom}px ${columnMarginLeft}px`,
               }}>
                   <div className='ub-single-column' style={{
                       padding: `${columnPaddingTop}px ${columnPaddingRight}px ${columnPaddingBottom}px ${columnPaddingLeft}px`,
                       backgroundImage: ( columnImgURL ? `url( ${columnImgURL} )` : undefined ),
                       backgroundColor: columnBgColor,
                       backgroundSize: columnBgSize,
                       backgroundPosition: columnBgPosition,
                       backgroundRepeat: columnBgRepeat,
                       backgroundAttachment: columnBgAttachment,
                       borderColor: columnBorderColor,
                       borderStyle: columnBorderStyle,
                       borderWidth: ( !onControlBrSize ? `${columnBorderTop}px ${columnBorderRight}px ${columnBorderBottom}px ${columnBorderLeft}px` : `${columnBorderSize}px`),
                       borderRadius: ( !onControlBrRadius ? `${columnBrTopRadius}px ${columnBrRightRadius}px ${columnBrBottomRadius}px ${columnBrLeftRadius}px` : `${columnBorderRadius}px`),
                   }}>
                      <InnerBlocks
                          templateLock={false}
                      />
                   </div>
               </div>
           </Fragment>
        );
    }),
    save:() => <InnerBlocks.Content />
});
/**
 * BLOCK: divider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import Inspector from './components/Inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
} = wp.editor;

const {
} = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ub/table-of-contents', {

	title: __( 'Table of contents' ),
	icon: 'editor-table',
	category: 'layout',
	keywords: [
		__( 'Table' ),
		__( 'Content' ),
		__( 'Ultimate Blocks' ),
	],
	attributes: {
		tableItems: {
			type: 'string',
			default: '[]',
		},
		selectedItem: {
			type: Object,
			default: null,
		},
	},

	edit: function( props ) {
		const { className, setAttributes, attributes, isSelected } = props;

		let tableItems = JSON.parse( attributes.tableItems ) || [];
		if ( ! tableItems || tableItems.length === 0 ) {
			tableItems = [];
			tableItems.push( {
				heading: 'Table of content Heading',
				target: '#',
				path: [ 0 ],
			} );
			tableItems.push( {
				heading: 'Table of content Heading',
				target: '#',
				path: [ 1 ],
			} );
			setAttributes( { selectedItem: tableItems[ 0 ] } );
			setAttributes( { tableItems: JSON.stringify( tableItems ) } );
		}

		const onChangeItemTitle = ( content, item ) => {
			item.heading = content;
			setAttributes( { tableItems: JSON.stringify( tableItems ) } );
		};

		const addTableItem = ( parent ) => {
			if ( parent === tableItems ) {
				parent.push( {
					heading: 'Table of content Heading ',
					target: '#',
					path: [ tableItems.length ],
				} );
				setAttributes( { tableItems: JSON.stringify( tableItems ) } );
				return;
			}
			if ( ! parent.childrens ) {
				parent.childrens = [];
			}
			const childPath = parent.path.slice( 0 );
			childPath.push( parent.childrens.length );
			parent.childrens.push( {
				heading: 'Table of content Heading ',
				target: '#',
				path: childPath,
			} );
			setAttributes( { tableItems: JSON.stringify( tableItems ) } );
		};

		const findSelectedItemObj = ( item, path ) => {
			if ( ! path || path.length === 0 ) {
				return item;
			}
			if ( ! item.childrens ) {
				return findSelectedItemObj( item[ path.shift() ], path );
			}
			return findSelectedItemObj( item.childrens[ path.shift() ], path );
		};

		const removeFromTree = ( parent, childNameToRemove ) => {
			parent.childrens = parent.childrens
				.filter( ( child ) => child !== childNameToRemove )
				.map( ( child ) => {
					if ( child.childrens ) {
						return removeFromTree( child, childNameToRemove );
					}
					return child;
				} );
			return parent;
		};

		const removeTableItem = ( item ) => {
			const tableItemsFiltered = tableItems.filter( ( child ) => {
				if ( item === child ) {
					return false;
				}
				if ( child.childrens ) {
					removeFromTree( child, item );
				}
				return true;
			} );

			setAttributes( { tableItems: JSON.stringify( tableItemsFiltered ) } );
		};

		const selectItem = ( item ) => {
			setAttributes( { selectedItem: item } );
		};

		const onTargetChange = ( targetId ) => {
			const selectedItemObj = findSelectedItemObj( tableItems, attributes.selectedItem.path.slice( 0 ) );
			selectedItemObj.target = targetId;
			setAttributes( {
				selectedItem: selectedItemObj,
				tableItems: JSON.stringify( tableItems )
			} );
		};

		const generateItems = ( items ) => {
			return items.map( ( item, itemIndex ) => {
				return <li className={ className + '-table-item' } key={ itemIndex }>
					<div className={ className + '-table-item-heading-wrap' } onClick={ () => selectItem( item ) }>
						<RichText
							tagName="h3"
							className={ className + '-table-item-heading' }
							value={ item.heading }
							formattingControls={ [ 'bold', 'italic' ] }
							onChange={ ( content ) => onChangeItemTitle( content, item ) }
							placeholder="Tab Title"
						/>
						<div className={ className + '-table-item-heading-actions' }>
							<span title="Add Child Heading" className={ 'dashicons dashicons-plus' } onClick={ () => addTableItem( item ) }></span>
							{ ( items.length > 1 || tableItems !== items ) && <span title="Remove Heading" className={ 'dashicons dashicons-minus' } onClick={ () => removeTableItem( item ) }></span> }
						</div>
					</div>
					{ item.childrens && item.childrens.length > 0 && <ul className={ className + '-table-items' }>
						{ generateItems( item.childrens ) }
					</ul> }
				</li>;
			} );
		};

		return [
			isSelected && <Inspector { ...{ attributes, onTargetChange, tableItems } } key="inspector" />,
			<div className={ className } key="table-of-content">
				<ul className={ className + '-table-items' }>
					{
						generateItems( tableItems )
					}
				</ul>
				<div className={ className + '-add-btn-wrap' }><button className="components-button is-button is-default" onClick={ () => addTableItem( tableItems ) }>ADD HEADING</button></div>
			</div>,
		];
	},

	save: function() {
	},
} );

/**
 * BLOCK: divider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {

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
	},

	edit: function() {
		return <p> Hello World </p>;
	},

	save: function() {
	},
} );

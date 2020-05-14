<?php

function ub_render_section_column_block($attributes, $content){
    extract($attributes);
    return '<div className="ub-section-column" id="ub-section-column-'.$blockID.'">'.$content.'</div>';
}

function ub_register_section_column_block() {
	if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
		register_block_type( 'ub/section-column', array(
            'attributes' =>$defaultValues['ub/section-column']['attributes'],
            'render_callback' => 'ub_render_section_column_block'));
    }
}

function ub_render_section_block($attributes, $content){
    extract($attributes);
    return '<div class="ub-section-container" id="ub-section-'.$blockID.'">'.$content.'</div>';
}

function ub_register_section_block() {
	if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
		register_block_type( 'ub/section', array(
            'attributes' =>$defaultValues['ub/section']['attributes'],
            'render_callback' => 'ub_render_section_block'));
    }
}

add_action('init', 'ub_register_section_column_block');
add_action('init', 'ub_register_section_block');
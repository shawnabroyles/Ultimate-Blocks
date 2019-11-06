<?php
function ub_render_row_block(){
    return(
        '<div>This is row-block</div>'
    );
}

function ub_register_row_block() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname( dirname(__DIR__) ) . '/defaults.php';
        register_block_type( 'ub/row-block', array(
            'attributes' => $defaultValues['ub/row-block']['attributes'],
            'render_callback' => 'ub_render_row_block'));
    }
}

add_action('init', 'ub_register_row_block');
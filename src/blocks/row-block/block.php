<?php
function ub_render_row_block($attributes, $contents){
    $section_block_name = 'wp-block-ub-section-block';
    extract($attributes);

    return (
        '<div class="'.$section_block_name.'" style="margin:'.$attributes['marginTopWrap'].'px '.$attributes['marginRightWrap'].'px '.$attributes['marginBottomWrap'].'px '.$attributes['marginLeftWrap'].'px'.'">'.$contents.'</div>'
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
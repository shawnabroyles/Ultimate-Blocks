<?php

function ub_render_row_column($attributes, $content){
    extract($attributes);
    return '<div class="ub-single-wrap" id="ub-row-column-'.$blockID.'"><div class="ub-single-column">'
        . $content . '</div></div>';
}

function ub_register_row_column() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/row-column', array(
            'attributes' => $defaultValues['ub/row-column']['attributes'],
            'render_callback' => 'ub_render_row_column'));
    }
}

function ub_render_row_block($attributes, $content){
    extract($attributes);
    return '<'.$wrapTag.' id="ub-section-'.$blockID.'" class="ub-section-block-wrap align'.$wrapAlignment.'">' . 
                '<div class="ub-section-block-video-wrap">
                    <video class="ub-block-video" autoplay '.($videoLoop ? 'loop' : '' ).' '.($videoMuted ? 'muted' : '' ).' src="'. $videoURL.'">
                    </video>
                </div>'.
               ($selectTab === 'Standart' ? '<div class="ub-section-block-overlay"></div>' :
                   '<div class="ub-section-block-gradient"></div>').
               '<div class="ub-single-block ub-tab'.$tabletSizeGrid.' ub-mobile'.$mobileSizeGrid.'">' . $content . '</div>'
            . '</'.$wrapTag.'>';
}

function ub_register_row_block() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/row-block', array(
            'attributes' => $defaultValues['ub/row-block']['attributes'],
            'render_callback' => 'ub_render_row_block'));
    }
}

add_action('init', 'ub_register_row_column');
add_action('init', 'ub_register_row_block');
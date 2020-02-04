<?php

function ub_render_section_column($attributes, $content){
    extract($attributes);
    return '<div class="ub-single-wrap" id="ub-section-column-'.$blockID.'"><div class="ub-single-column">'
        . $content . '</div></div>';
}

function ub_register_section_column() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/section-column', array(
            'attributes' => $defaultValues['ub/section-column']['attributes'],
            'render_callback' => 'ub_render_section_column'));
    }
}

function ub_render_section($attributes, $content){
    extract($attributes);
    return '<'.$wrapTag.' id="ub-section-'.$blockID.'" class="ub-section-block-wrap align'.$wrapAlignment.'">' . 
                '<div class="ub-section-block-video-wrap">
                    <video class="ub-block-video" autoplay '.($videoLoop ? 'loop' : '' ).' '.($videoMuted ? 'muted' : '' ).' src="'. $videoURL.'">
                    </video>
                </div>'.
               ($selectTab === 'Standard' ? '<div class="ub-section-block-overlay"></div>' :
                   '<div class="ub-section-block-gradient"></div>').
               ($selectTabTablet === 'Standard' ? '<div class="ub-section-block-overlay-tab"></div>' :
                   '<div class="ub-section-block-gradient-tab"></div>').
               ($selectTabMob === 'Standard' ? '<div class="ub-section-block-overlay-mob"></div>' :
                   '<div class="ub-section-block-gradient-mob"></div>').
               '<div class="ub-single-block ub-tab'.$tabletSizeGrid.' ub-mobile'.$mobileSizeGrid.'">' . $content . '</div>'
            . '</'.$wrapTag.'>';
}

function ub_register_section() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/section', array(
            'attributes' => $defaultValues['ub/section']['attributes'],
            'render_callback' => 'ub_render_section'));
    }
}

add_action('init', 'ub_register_section_column');
add_action('init', 'ub_register_section');
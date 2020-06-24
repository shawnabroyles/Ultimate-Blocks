<?php

function ub_render_section_column_block($attributes, $content){
    extract($attributes);
    return '<div class="ub-section-column" id="ub-section-column-'.$blockID.'">'.$content.'</div>';
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
    $tabletLayoutClassName = '';
    $mobileLayoutClassName = '';

    switch ($tabletLayout){
        default:
            $tabletLayoutClassName = '';
        break;
        case 'rows':
            $tabletLayoutClassName = 'ub-section-tablet-row';
        break;
        case 'columns':
            $tabletLayoutClassName = 'ub-section-tablet-column';
        break;
        case 'wide first row':
            $tabletLayoutClassName = 'ub-section-tablet-wide-first';
        break;
        case 'wide last row':
            $tabletLayoutClassName = 'ub-section-tablet-wide-last';
        break;
        case 'quadrants':
            $tabletLayoutClassName = 'ub-section-tablet-quadrants';
        break;
    }
    switch ($mobileLayout){
        default:
            $mobileLayoutClassName = '';
        break;
        case 'rows':
            $mobileLayoutClassName = 'ub-section-mobile-row';
        break;
        case 'columns':
            $mobileLayoutClassName = 'ub-section-mobile-column';
        break;
        case 'wide first row':
            $mobileLayoutClassName = 'ub-section-mobile-wide-first';
        break;
        case 'wide last row':
            $mobileLayoutClassName = 'ub-section-mobile-wide-last';
        break;
        case 'quadrants':
            $mobileLayoutClassName = 'ub-section-mobile-quadrants';
        break;
    }
    return '<'.$wrapper.' class="ub-section-container' . 
        ($tabletLayoutClassName == '' ? '' : ' ' . $tabletLayoutClassName) .
        ($mobileLayoutClassName == '' ? '' : ' ' . $mobileLayoutClassName) .
        '" id="ub-section-'.$blockID.'">'.$content.'</'.$wrapper.'>';
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
<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( !function_exists( 'get_current_screen' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/screen.php' );
}

/**
 * Check if the current page is the Gutenberg block editor.
 * @return bool
 */
function ub_check_is_gutenberg_page() {

	// The Gutenberg plugin is on.
    if ( function_exists( 'is_gutenberg_page' ) && is_gutenberg_page() ) { 
        return true;
    }
	
	// Gutenberg page on WordPress 5+.
	$current_screen = get_current_screen();
	if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
        return true;
	}
	
    return false;

}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */

function ub_load_assets() {
    wp_enqueue_style(
        'ultimate_blocks-cgb-style-css', // Handle.
        plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
        array(), // Dependency to include the CSS after it.
        Ultimate_Blocks_Constants::plugin_version()  // Version: latest version number.
    );
}

function ultimate_blocks_cgb_block_assets() {
	// Styles.
	if ( is_singular() and has_blocks() ){
        require_once plugin_dir_path(__FILE__) . 'common.php';
        
        $presentBlocks = ub_getPresentBlocks();

        foreach( $presentBlocks as $block ){
            if( strpos($block['blockName'], 'ub/' )===0){
                ub_load_assets();
                break;
            }
        }
    }
    elseif ( ub_check_is_gutenberg_page() ){
        ub_load_assets();
    }
} // End function ultimate_blocks_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'ultimate_blocks_cgb_block_assets' );

function ub_include_block_attribute_css() {
    require plugin_dir_path(__FILE__) . 'defaults.php';
    require_once plugin_dir_path(__FILE__) . 'common.php';

    $presentBlocks = ub_getPresentBlocks();
    $blockStylesheets = "";

    $hasNoSmoothScroll = true;

    foreach( $presentBlocks as $block ){
        if(array_key_exists($block['blockName'], $defaultValues)){
            $attributes = array_merge(array_map(function($attribute){
                return $attribute['default'];
            }, $defaultValues[$block['blockName']]['attributes']), $block['attrs']);
        }

        if(isset($attributes) && array_key_exists('blockID', $attributes) && $attributes['blockID'] != ''){
            switch ($block['blockName']){
                default:
                    //nothing could be done
                    break;
                case 'ub/button':
                    $prefix = '#ub-button-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' a{' . PHP_EOL;
                    if($attributes['buttonIsTransparent']){
                        $blockStylesheets .= 'background-color: transparent;' . PHP_EOL . 
                        'color: '.$attributes['buttonColor'].';' . PHP_EOL .
                        'border: 3px solid '.$attributes['buttonColor'].';';
                    }
                    else{
                        $blockStylesheets .= 'background-color: '.$attributes['buttonColor'].';' . PHP_EOL . 
                        'color: '.$attributes['buttonTextColor'].';' . PHP_EOL .
                        'border: none;';
                    }
                    $blockStylesheets .= 'border-radius: '.($attributes['buttonRounded'] ? '60' : '0').'px;' . PHP_EOL .
                    '}' . PHP_EOL . 

                    $prefix . ' a:hover{' . PHP_EOL;
                    if($attributes['buttonIsTransparent']){
                        $blockStylesheets .= 'color: '.$attributes['buttonHoverColor'].';' . PHP_EOL .
                        'border: 3px solid '.$attributes['buttonHoverColor'].';';
                    }
                    else{
                        $blockStylesheets .= 'background-color: '.$attributes['buttonHoverColor'].';' . PHP_EOL . 
                        'color: '.$attributes['buttonTextHoverColor'].';' . PHP_EOL .
                        'border: none;';
                    }
                    $blockStylesheets .= '}' . PHP_EOL . 
                    $prefix. ' ub-button-content-holder{' . PHP_EOL .
                        'flex-direction: '.($attributes['iconPosition']=='left'?'row':'row-reverse').';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/call-to-action-block':
                    $prefix = '#ub_call_to_action_' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '{' . PHP_EOL .
                        'background-color: '.$attributes['ctaBackgroundColor'].';' . PHP_EOL . 
                        'border-width: '.$attributes['ctaBorderSize'].'px;' . PHP_EOL . 
                        'border-color: '.$attributes['ctaBorderColor'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_call_to_action_headline_text{' . PHP_EOL .
                        'font-size: '.$attributes['headFontSize'].'px;' . PHP_EOL .
                        'color: '.$attributes['headColor'].';' . PHP_EOL .
                        'text-align: '.$attributes['headAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .ub_cta_content_text{' . PHP_EOL .
                        'font-size: '.$attributes['contentFontSize'].'px;' . PHP_EOL .
                        'color: '.$attributes['contentColor'].';' . PHP_EOL .
                        'text-align: '.$attributes['contentAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_cta_button{' . PHP_EOL .
                        'background-color: '.$attributes['buttonColor'].';' . PHP_EOL .
                        'width: '.$attributes['buttonWidth'].'px;' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_cta_button_text{' . PHP_EOL .
                        'color: '.$attributes['buttonTextColor'].';' . PHP_EOL .
                        'font-size: '.$attributes['buttonFontSize'].'px;' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/click-to-tweet':
                    $prefix = '#ub_click_to_tweet_' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '{' . PHP_EOL .
                        'border-color: '.$attributes['borderColor'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_tweet{' . PHP_EOL .
                        'color: '.$attributes['tweetColor'].';' . PHP_EOL .
                        'font-size: '.$attributes['tweetFontSize'].'px;' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/content-filter-block':
                    $prefix = '#ub-content-filter-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .ub-content-filter-tag{' . PHP_EOL .
                        'background-color: ' . $attributes['buttonColor'] . ';' . PHP_EOL .
                        'color: ' . $attributes['buttonTextColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub-content-filter-tag.ub-selected{' . PHP_EOL .
                        'background-color: ' . $attributes['activeButtonColor'] . ';' . PHP_EOL .
                        'color: ' . $attributes['activeButtonTextColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/content-toggle-block':
                    $attributes = array_merge($attributes,
                        array_map(function($attribute){
                            return $attribute['default'];
                        }, $defaultValues['ub/content-toggle-panel-block']['attributes']),
                        $block['innerBlocks'][0]['attrs']);
                    $prefix = '#ub-content-toggle-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .wp-block-ub-content-toggle-accordion{' . PHP_EOL .
                        'border-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .wp-block-ub-content-toggle-accordion-title-wrap{' . PHP_EOL .
                        'background-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .wp-block-ub-content-toggle-accordion-title{' . PHP_EOL .
                        'color: ' . $attributes['titleColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/countdown':
                    $blockStylesheets .= '#ub_countdown_'. $attributes['blockID'] . '{' . PHP_EOL .
                        'text-align: ' . $attributes['messageAlign'] . PHP_EOL .
                    '}';
                    break;
                case 'ub/divider':
                    $blockStylesheets .= '#ub_divider_' . $attributes['blockID'] . '{' . PHP_EOL .
                                        'border-top: '.$attributes['borderSize'].'px '.$attributes['borderStyle'].' '.$attributes['borderColor'] .';' . PHP_EOL .
                                        'margin-top: '.$attributes['borderHeight'].'px;' . PHP_EOL .
                                        'margin-bottom: '.$attributes['borderHeight'].'px;' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/expand':
                    $blockStylesheets .= '#ub-expand-' . $attributes['blockID'] . ' .ub-expand-toggle-button{' . PHP_EOL .
                        'text-align: '.$attributes['toggleAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/feature-box-block':
                    $prefix = '#ub_feature_box_' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .ub_feature_one_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title1Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_feature_two_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title2Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_feature_three_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title3Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_feature_one_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body1Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. ' .ub_feature_two_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body2Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_feature_three_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body3Align'] . ';' . PHP_EOL .
                    '}' ;
                    break;
                case 'ub/image-slider':
                    $prefix = '#ub_image_slider_' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '{' . PHP_EOL .
                        'min-height: ' . (25+ (count(json_decode($attributes['images'], true)) > 0) ? $attributes['sliderHeight'] : 200 ) . 'px;' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .flickity-slider img{' . PHP_EOL .
                        'max-height: ' . $attributes['sliderHeight'] . 'px;' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/notification-box-block':
                    $blockStylesheets .= '#ub-notification-box-' . $attributes['blockID'] . ' .ub_notify_text{' . PHP_EOL .
                        'text-align: ' . $attributes['align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/number-box-block':
                    $prefix = '#ub-number-box-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .ub_number_one_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title1Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. ' .ub_number_two_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title2Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. ' .ub_number_three_title{' . PHP_EOL .
                        'text-align: ' . $attributes['title3Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_number_one_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body1Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_number_two_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body2Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. ' .ub_number_three_body{' . PHP_EOL .
                        'text-align: ' . $attributes['body3Align'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_number_column{' . PHP_EOL .
                        'text-align: ' . $attributes['borderColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_number_box_number{' . PHP_EOL .
                        'background-color: ' . $attributes['numberBackground'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_number_box_number>p{' . PHP_EOL .
                        'color: ' . $attributes['numberColor'] . ';' . PHP_EOL .
                    '}';
                    break;
                case 'ub/progress-bar':
                    $prefix = '#ub-progress-bar-'. $attributes['blockID'];
                    $blockStylesheets .=  $prefix . ' .ub_progress-bar-text p{' . PHP_EOL .
                        'text-align: ' . $attributes['detailAlign'] . ';' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .ub_progress-bar-text p{' . PHP_EOL .
                        'text-align: ' . $attributes['detailAlign'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;

                    if($attributes['barType']=='linear'){
                        $blockStylesheets .= $prefix . ' .ub_progress-bar-line-path{' . PHP_EOL .
                            'stroke-dashoffset: 100px;' . PHP_EOL .
                        '}' . PHP_EOL .
                        $prefix . ' .ub_progress-bar-label{' . PHP_EOL .
                            'width: '.$attributes['percentage'].'%;' . PHP_EOL;
                    }
                    else{
                        $circleRadius = 50 - ($attributes['barThickness'] + 3)/2;
                        $circlePathLength = $circleRadius * M_PI * 2;
                        $blockStylesheets .= '#ub-progress-bar-'. $attributes['blockID'] . ' .ub_progress-bar-container{' . PHP_EOL .
                            'height: 150px;' . PHP_EOL . 'width: 150px;' . PHP_EOL .
                        '}' . PHP_EOL .
                        $prefix . ' .ub_progress-bar-circle-trail{' . PHP_EOL . 
                            'stroke-dasharray: '.$circlePathLength.'px,'.$circlePathLength.'px' . PHP_EOL . 
                        '}' . PHP_EOL .
                        $prefix . ' .ub_progress-bar-circle-path{' . PHP_EOL .
                            'stroke-dasharray: 0px, '.$circlePathLength.'px' . PHP_EOL .
                        '}' . PHP_EOL .
                        $prefix . ' .ub_progress-bar-label{' . PHP_EOL;                                
                    }
                    $blockStylesheets .= 'visibility: hidden;' . PHP_EOL . 
                    '}' . PHP_EOL .
                    $prefix . '.ub_progress-bar-filled .ub_progress-bar-label{' . PHP_EOL . 
                        'visibility: visible;' . PHP_EOL .
                    '}' . PHP_EOL;
                    if($attributes['barType']=='linear'){
                        $blockStylesheets .= $prefix. '.ub_progress-bar-filled .ub_progress-bar-line-path{' . PHP_EOL .
                            'stroke-dashoffset: ' . (100-$attributes['percentage']) . 'px';
                    }
                    else{
                        $strokeArcLength = $circlePathLength * $attributes['percentage'] / 100;
                        $blockStylesheets .= $prefix . '.ub_progress-bar-filled .ub_progress-bar-circle-path{' . PHP_EOL .
                            'stroke-linecap: round;' . PHP_EOL . 
                            'stroke-dasharray: '.$strokeArcLength.'px, '.$circlePathLength.'px;' . PHP_EOL;
                    }
                    $blockStylesheets .= '}';
                    break;
                case 'ub/review':
                    $prefix = '#ub_review_' . $attributes['blockID'];
                    $blockStylesheets .=  $prefix . ' .ub_review_item_name{' . PHP_EOL . 
                        'text-align: ' . $attributes['titleAlign'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . $attributes['blockID'] . ' .ub_review_author_name{' . PHP_EOL . 
                        'text-align: ' . $attributes['authorAlign'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. $attributes['blockID'] . ' .ub_review_cta_main>a{' . PHP_EOL . 
                        'color: ' . $attributes['callToActionForeColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_review_cta_main>a{' . PHP_EOL . 
                        'color: ' . $attributes['callToActionForeColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_review_cta_btn{' . PHP_EOL . 
                        'color: ' . $attributes['callToActionForeColor'] . ';' . PHP_EOL .
                        'border-color: ' . $attributes['callToActionForeColor'] . ';' . PHP_EOL .
                        'background-color: ' . $attributes['callToActionBackColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/social-share':
                    $icon_sizes = array(
                        'normal' => 20,
                        'medium' => 30,
                        'large'  => 40,
                    );
                    $icon_size  = $icon_sizes[$attributes['iconSize']];
                    $blockStylesheets .= '#ub-social-share-' . $attributes['blockID'] . ' .social-share-icon{' . PHP_EOL .
                        'width:' . ( $icon_size * 1.5 ) . 'px;' . PHP_EOL .
                        'height:' . ( $icon_size * 1.5 ) . 'px;' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/star-rating-block':
                    $prefix = '#ub-star-rating-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .ub-star-outer-container{' . PHP_EOL .
                        'justify-content: '. ($attributes['starAlign'] == 'center' ? 'center' :
                            ('flex-'.$attributes['starAlign'] == 'left' ? 'start' : 'end')).';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub-review-text{' . PHP_EOL .
                        'text-align: '. $attributes['reviewTextAlign'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' svg{' . PHP_EOL .
                        'fill: ' . $attributes['starColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/styled-box':
                    $prefix = '#ub-styled-box-' . $attributes['blockID'];
                    if($attributes['mode'] == 'notification'){
                        $blockStylesheets .= $prefix . ' .ub-notification-text{'. PHP_EOL .
                            'background-color: ' . $attributes['backColor'] . ';' . PHP_EOL .
                            'color: ' . $attributes['foreColor'] . ';' . PHP_EOL .
                            'border-left-color: ' . $attributes['outlineColor'] . ';' . PHP_EOL .
                            'text-align: ' . $attributes['textAlign'][0] . ';' . PHP_EOL .
                        '}' . PHP_EOL;
                    }
                    else if($attributes['mode'] == 'feature'){
                        foreach(range(1, count($attributes['text'])) as $i){
                            $blockStylesheets .= $prefix . ' .ub-feature:nth-child('.$i.') .ub-feature-title{'. PHP_EOL .
                                'text-align: ' . $attributes['titleAlign'][$i-1] . ';' . PHP_EOL .
                            '}' . PHP_EOL .
                            $prefix . ' .ub-feature:nth-child('.$i.') .ub-feature-body{'. PHP_EOL .
                                'text-align: ' . $attributes['textAlign'][$i-1] . ';' . PHP_EOL .
                            '}' . PHP_EOL;
                        }
                    }
                    else if($attributes['mode'] == 'number'){
                        $blockStylesheets .= $prefix . ' .ub-number-panel{' . PHP_EOL .
                            'border-color: ' . $attributes['outlineColor'] . ';' . PHP_EOL .
                        '}' . PHP_EOL .
                        $prefix . ' .ub-number-container{' . PHP_EOL .
                            'background-color: ' . $attributes['backColor'] . ';' . PHP_EOL .
                        '}' . PHP_EOL .
                        $prefix . ' .ub-number-display{' . PHP_EOL .
                            'color: ' . $attributes['foreColor'] . ';' . PHP_EOL .
                        '}' . PHP_EOL;
                        foreach(range(1, count($attributes['text'])) as $i){
                            $blockStylesheets .= $prefix . ' .ub-number-panel:nth-child('.$i.') .ub-number-box-title{'. PHP_EOL .
                                'text-align: ' . $attributes['titleAlign'][$i-1] . ';' . PHP_EOL .
                            '}' . PHP_EOL .
                            $prefix . ' .ub-number-panel:nth-child('.$i.') .ub-number-box-body{'. PHP_EOL .
                                'text-align: ' . $attributes['textAlign'][$i-1] . ';' . PHP_EOL .
                            '}' . PHP_EOL;
                        }
                    }
                    break;
                case 'ub/styled-list':
                    $prefix = '#ub_styled_list-' . $attributes['blockID'];
                    if($attributes['iconSize'] < 3){
                        $blockStylesheets .= $prefix . ' .fa-li{' . PHP_EOL .
                            'top: -0.1em;' . PHP_EOL .
                        '}' . PHP_EOL;
                    } elseif($attributes['iconSize'] >= 5){
                        $blockStylesheets .= $prefix . ' .fa-li{' . PHP_EOL .
                            'top: 3px;' . PHP_EOL .
                        '}' . PHP_EOL;
                    }
                    break;
                case 'ub/tabbed-content-block':
                    $prefix = '#ub-tabbed-content-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . ' .wp-block-ub-tabbed-content-tab-title-wrap{' . PHP_EOL .
                        'background-color: initial;' . PHP_EOL .
                        'border-color: lightgrey;' . PHP_EOL .
                        'color: #000000;' . PHP_EOL .
                    '}' . PHP_EOL . 
                    $prefix . ' .wp-block-ub-tabbed-content-tab-title-wrap.active{' . PHP_EOL .
                        'background-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                        'border-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                        'color: ' . $attributes['titleColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .wp-block-ub-tabbed-content-tab-title-vertical-wrap.active{' . PHP_EOL .
                        'background-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                        'border-color: ' . $attributes['theme'] . ';' . PHP_EOL .
                        'color: ' . $attributes['titleColor'] . ';' . PHP_EOL .
                    '}' .
                    $prefix . ' .wp-block-ub-tabbed-content-tabs-title{' . PHP_EOL .
                        'justify-content: ' . ($attributes['tabsAlignment'] == 'center' ? 'center' :
                            'flex-' . ($attributes['tabsAlignment'] == 'left' ? 'start' : 'end' )) . ';' . PHP_EOL .
                    '}' . PHP_EOL;
                    foreach($attributes['tabsTitleAlignment'] as $key => $titleAlign){
                        $blockStylesheets .= $prefix . ' .wp-block-ub-tabbed-content-tab-title-wrap:nth-child('.($key+1).'){' . PHP_EOL .
                            'text-align: ' . $titleAlign . ';' . PHP_EOL .
                        '}' . PHP_EOL;
                    }
                    break;
                case 'ub/table-of-contents-block':
                    if($attributes['listStyle']=='plain'){
                        $blockStylesheets .= '#ub_table-of-contents-' . $attributes['blockID'] . ' ul{' . PHP_EOL .
                            'list-style: none;' . PHP_EOL .
                        '}' . PHP_EOL;
                    }
                    if($attributes['enableSmoothScroll'] && $hasNoSmoothScroll){
                        $blockStylesheets .= 'html {' . PHP_EOL .
                            'scroll-behavior: smooth;' . PHP_EOL .
                        '}' . PHP_EOL;
                        $hasNoSmoothScroll = false;
                    }
                    break;
                case 'ub/testimonial':
                    $prefix = '#ub_testimonial_' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '{' . PHP_EOL .
                        'background-color: '.$attributes['backgroundColor'].';' . PHP_EOL .
                        'color: '.$attributes['textColor'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_testimonial_text{' . PHP_EOL .
                        'font-size: '.$attributes['textSize'].';'. PHP_EOL .
                        'text-align: '.$attributes['textAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix. ' .ub_testimonial_author{' . PHP_EOL .
                        'text-align: '.$attributes['authorAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix . ' .ub_testimonial_author_role{' . PHP_EOL .
                        'text-align: '.$attributes['authorRoleAlign'].';' . PHP_EOL .
                    '}' . PHP_EOL;
                    break;
                case 'ub/post-grid':
                    $prefix = '#ub_post-grid-block_' . $attributes['blockID'];
                    break;
                case 'ub/row-column':
                    $prefix = '#ub-row-column-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '>.ub-single-column{' .
                        'margin:'.(isset($attributes['columnMarginTop']) ? $attributes['columnMarginTop'] : '').'px '.(isset($attributes['columnMarginRight']) ? $attributes['columnMarginRight'] : '').'px '.
                        (isset($attributes['columnMarginBottom']) ? $attributes['columnMarginBottom'] : '').'px '.(isset($attributes['columnMarginLeft']) ? $attributes['columnMarginLeft'] : '').'px;
                        padding:'. (isset($attributes['columnPaddingTop']) ? $attributes['columnPaddingTop'] : '').'px '.(isset($attributes['columnPaddingRight']) ? $attributes['columnPaddingRight'] : '').'px '.
                        (isset($attributes['columnPaddingBottom']) ? $attributes['columnPaddingBottom'] : '').'px '.(isset($attributes['columnPaddingLeft']) ? $attributes['columnPaddingLeft'] : '').'px;'.
                        (isset($attributes['columnBgColor']) ? 'background-color:'.$attributes['columnBgColor'].';' : '').
                        (isset($attributes['onControlBrSize']) ? ($attributes['onControlBrSize'] === false ? 'border-width:'.(isset($attributes['columnBorderTop']) ? $attributes['columnBorderTop'].'px ': '').(isset($attributes['columnBorderRight']) ? $attributes['columnBorderRight'].'px ': '').(isset($attributes['columnBorderBottom']) ? $attributes['columnBorderBottom'].'px ': '').(isset($attributes['columnBorderLeft']) ? $attributes['columnBorderLeft'].'px;': '' ): (isset($attributes['columnBorderSize']) ? 'border-width:'.$attributes['columnBorderSize'].'px;' : '') ):'').
                        (isset($attributes['onControlBrRadius']) ? ($attributes['onControlBrRadius'] === false ? 'border-radius:'.(isset($attributes['columnBrTopRadius']) ? $attributes['columnBrTopRadius'].'px ': '').(isset($attributes['columnBrRightRadius']) ? $attributes['columnBrRightRadius'].'px ': '').(isset($attributes['columnBrBottomRadius']) ? $attributes['columnBrBottomRadius'].'px ': '').(isset($attributes['columnBrLeftRadius']) ? $attributes['columnBrLeftRadius'].'px;': '' ): (isset($attributes['columnBorderRadius']) ? 'border-radius:'.$attributes['columnBorderRadius'].'px;' : '') ):'').
                        (isset($attributes['columnBorderStyle']) ? 'border-style:'.$attributes['columnBorderStyle'].';' : '').
                        (isset($attributes['columnBorderColor']) ? 'border-color:'.$attributes['columnBorderColor'].';' : '').
                        (isset($attributes['columnImgURL']) ? 'background-image: url('.$attributes['columnImgURL'].')'.';' : '').
                        (isset($attributes['columnBgSize']) ? 'background-size:'.$attributes['columnBgSize'].';' : '' ).
                        (isset($attributes['columnBgPosition']) ? 'background-position:'.$attributes['columnBgPosition'].';' : '').
                        (isset($attributes['columnBgRepeat']) ? 'background-repeat:'.$attributes['columnBgRepeat'].';' : '').
                        (isset($attributes['columnBgAttachment']) ? 'background-attachment:'.$attributes['columnBgAttachment'].';' : '').
                    '}';
                    break;
                case 'ub/row-block':
                    $prefix = '#ub-section-' . $attributes['blockID'];
                    $blockStylesheets .= $prefix . '{' . PHP_EOL .
                        'margin: ' . $attributes['marginTopWrap'] . $attributes['selectUnits'] .' '. $attributes['marginRightWrap'] . $attributes['selectUnits'] . ' '
                                . $attributes['marginBottomWrap'] . $attributes['selectUnits'] .' '. $attributes['marginLeftWrap'] . $attributes['selectUnits'] . ';' . PHP_EOL .
                        'padding: ' . $attributes['paddingTopWrap'] .$attributes['selectUnits'] .' '. $attributes['paddingRightWrap']. $attributes['selectUnits'] . ' '
                                . $attributes['paddingBottomWrap'] . $attributes['selectUnits'] .' '. $attributes['paddingRightWrap']. $attributes['selectUnits'] . ';' . PHP_EOL .
                        'border:'. $attributes['wrapBorderSize'] .'px '. $attributes['wrapBorderStyle']. $attributes['wrapBorderColor'] . ';' . PHP_EOL .
                        'border-radius:'. $attributes['wrapBorderRadius'].'px;' . PHP_EOL . 'background-color:'. $attributes['wrapColor'] . ';'. PHP_EOL .
                        'background-image: url(' . $attributes['imgURL'] .')' . ';' . PHP_EOL . 'background-size:' . $attributes['wrapBackgroundSize'] . ';' . PHP_EOL .
                        'background-position:' . $attributes['wrapBackgroundPosition'] . ';' . PHP_EOL . 'background-repeat:' . $attributes['wrapBackgroundRepeat'] . ';' . PHP_EOL .
                        'background-attachment:' . $attributes['wrapBackgroundAttachment']. ';' . PHP_EOL . 'color:' . $attributes['textColor'] . ';' . PHP_EOL .
                    '}' . PHP_EOL .
                    $prefix .( $attributes['selectTab'] === 'Standart' ? ' .ub-section-block-overlay {'. PHP_EOL .
                        'opacity: '.($attributes['wrapBackgroundOverlay'] == 100 ? 1 : '0.'. $attributes['wrapBackgroundOverlay']).';' . PHP_EOL .
                        'background-color: '. $attributes['wrapBackgroundOverlayCol'].';' . PHP_EOL .
                    '}' : ' .ub-section-block-gradient {'. PHP_EOL . 'background-image: '. $attributes['gradientType'].'-gradient('.$attributes['gradientAngle'].
                        'deg,'.$attributes['wrapGradientOverlayCol'].' '.$attributes['wrapGradientLocation'].'%,'.
                        $attributes['wrapGradientSecondCol'].' '.$attributes['wrapGradientSecondLocation'].'%);' . PHP_EOL .
                            'opacity:'.($attributes['wrapGradientOverlay'] == 100 ? 1 : '0.'. $attributes['wrapGradientOverlay']).'}') . PHP_EOL .
                    $prefix . ' .ub-single-wrap{'. PHP_EOL .
                        'justify-content: '.$attributes['wrapVerticalAligment'] . ';'.
                    '}' .
                    $prefix . '>.ub-single-block>.ub-single-wrap:not(:first-child){' .
                        'margin-left:' . (((int)trim($attributes['gutter'], "px"))/2) . 'px;' .
                    '}' .
                    $prefix . '>.ub-single-block>.ub-single-wrap:not(:last-child){' .
                        'margin-right:' . (((int)trim($attributes['gutter'], "px"))/2) . 'px;' .
                    '}';
                    if(isset($attributes['colWidthOne'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(1){' .
                            'flex: 0 1 ' . $attributes['colWidthOne'] . ';' .
                        '}';
                    }
                    if(isset($attributes['colWidthTwo'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(2){' .
                            'flex: 0 1 ' . $attributes['colWidthTwo'] . ';' .
                        '}';
                    }
                    if(isset($attributes['colWidthThree'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(3){' .
                            'flex: 0 1 ' . $attributes['colWidthThree'] . ';' .
                        '}';
                    }
                    if(isset($attributes['colWidthFour'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(4){' .
                            'flex: 0 1 ' . $attributes['colWidthFour'] . ';' .
                        '}';
                    }
                    if(isset($attributes['colWidthFive'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(5){' .
                            'flex: 0 1 ' . $attributes['colWidthFive'] . ';' .
                        '}';
                    }
                    if(isset($attributes['colWidthSix'])){
                        $blockStylesheets .= $prefix . '>.ub-single-block>.ub-single-wrap:nth-child(6){' .
                            'flex: 0 1 ' . $attributes['colWidthSix'] . ';' .
                        '}';
                    }
                    break;
            }
        }
    }
    $blockStylesheets = preg_replace( '/\s+/', ' ', $blockStylesheets );
    ob_start(); ?>

<style><?php echo($blockStylesheets); ?></style>
    
    <?php
    ob_end_flush();
}
add_action('wp_head', 'ub_include_block_attribute_css');

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function ultimate_blocks_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'ultimate_blocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor'), // Dependencies, defined above.
		Ultimate_Blocks_Constants::plugin_version()  // Version: latest version number.
	);

	wp_enqueue_script(
		'ultimate_blocks-cgb-deactivator-js', // Handle.
		plugins_url( '/dist/deactivator.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		Ultimate_Blocks_Constants::plugin_version(), // Version: latest version number.
		true
	);

	// Styles.
	wp_enqueue_style(
		'ultimate_blocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		Ultimate_Blocks_Constants::plugin_version() // Version: latest version number
	);
} // End function ultimate_blocks_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'ultimate_blocks_cgb_editor_assets' );



/**
 * Rank Math ToC Plugins List.
 */
add_filter( 'rank_math/researches/toc_plugins', function( $toc_plugins ) {
	$toc_plugins['ultimate-blocks/ultimate-blocks.php'] = 'Ultimate Blocks';
 	return $toc_plugins;
});



// Click to Tweet Block.
require_once plugin_dir_path( __FILE__ ) . 'blocks/click-to-tweet/block.php';

// Social Share Block.
require_once plugin_dir_path( __FILE__ ) . 'blocks/social-share/block.php';

// Content toggle Block.
require_once plugin_dir_path( __FILE__ ) . 'blocks/content-toggle/block.php';

// Tabbed Content Block.
require_once plugin_dir_path( __FILE__ ) . 'blocks/tabbed-content/block.php';

// Progress Bar Block.
require_once plugin_dir_path( __FILE__ ) . 'blocks/progress-bar/block.php';

// Countdown Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/countdown/block.php';

// Image Slider Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/image-slider/block.php';

// Table of Contents Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/table-of-contents/block.php';

// Button Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/button/block.php';

// Content Filter Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/content-filter/block.php';

// Call to Action Block
require_once plugin_dir_path( __FILE__ ) . 'blocks/call-to-action/block.php';

// Feature Box
require_once plugin_dir_path( __FILE__ ) . 'blocks/feature-box/block.php';

// Notification Box
require_once plugin_dir_path( __FILE__ ) . 'blocks/notification-box/block.php';

// Number Box
require_once plugin_dir_path( __FILE__ ) . 'blocks/number-box/block.php';

// Star Rating
require_once plugin_dir_path( __FILE__ ) . 'blocks/star-rating/block.php';

// Testimonial
require_once plugin_dir_path( __FILE__ ) . 'blocks/testimonial/block.php';

// Review
require_once plugin_dir_path( __FILE__ ) . 'blocks/review/block.php';

// Divider
require_once plugin_dir_path( __FILE__ ) . 'blocks/divider/block.php';

//Post-Grid
require_once plugin_dir_path( __File__ ) . 'blocks/post-grid/block.php';

// Row-block
require_once plugin_dir_path( __FILE__ ) . 'blocks/row-block/block.php';

//Styled Box
require_once plugin_dir_path( __FILE__ ) . 'blocks/styled-box/block.php';

//Expand
require_once plugin_dir_path( __FILE__ ) . 'blocks/expand/block.php';

// Styled List
require_once plugin_dir_path( __FILE__ ) . 'blocks/styled-list/block.php';

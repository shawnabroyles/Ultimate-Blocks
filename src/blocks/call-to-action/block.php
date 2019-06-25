<?php

function ub_render_call_to_action_block($attributes){
    extract($attributes);

    return '<div>
    <div class="ub_call_to_action" style="background-color: '.$ctaBackgroundColor.';
            border: '.$ctaBorderSize.'px solid; border-color: '.$ctaBorderColor.';">
        <div class="ub_call_to_action_headline">
            <p class="ub_call_to_action_headline_text" style="font-size: '.$headFontSize.'px;
                color: '.$headColor.'; text-align: '.$headAlign.'">'.
                $headline_text.'</p>
        </div>
        <div class="ub_call_to_action_content">
            <p class="ub_cta_content_text"
                style="font-size: '.$contentFontSize.'px; color: '.$contentColor.'; text-align: '
                .$contentAlign.';">'.$content_text.'</p>
        </div>
        <div class="ub_call_to_action_button">
            <a href="'.$url.'" target = "'.($openInNewTab ? '_blank' : '_self').'"
                rel="'.($addNofollow?'nofollow ':' ').'noopener noreferrer"
                class="wp-block-button ub_cta_button"
                style="background-color: '.$buttonColor.'; width: '.$buttonWidth.'px;">
                <p class="ub_cta_button_text"
                    style="color: '.$buttonTextColor.'; font-size: '.$buttonFontSize.'px;">'.
                    $button_text.'</p>
            </a>
        </div>
    </div>
</div>';
}

function ub_register_call_to_action_block() {
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type( 'ub/call-to-action', array(
            'attributes' => array(
                'headline_text' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'content_text' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'button_text' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'headFontSize' => array(
                    'type' => 'number',
                    'default' => 30
                ),
                'headColor' => array(
                    'type' => 'string',
                    'default' => '#444444'
                ),
                'headAlign' => array(
                    'type' => 'string',
                    'default' => 'center'
                ),
                'contentFontSize' => array(
                    'type' => 'number',
                    'default' => 14
                ),
                'contentColor' => array(
                    'type' => 'string',
                    'default' => '#444444'
                ),
                'buttonFontSize' => array(
                    'type' => 'number',
                    'default' => 14
                ),
                'buttonColor' => array(
                    'type' => 'string',
                    'default' => '#E27330'
                ),
                'buttonTextColor' => array(
                    'type' => 'string',
                    'default' => '#FFFFFF'
                ),
                'buttonWidth' => array(
                    'type' => 'number',
                    'default' => 250
                ),
                'ctaBackgroundColor' => array(
                    'type' => 'string',
                    'default' => '#f8f8f8'
                ),
                'ctaBorderColor' => array(
                    'type' => 'string',
                    'default' => '#ECECEC'
                ),
                'ctaBorderSize' => array(
                    'type' => 'number',
                    'default' => 2
                ),
                'url' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'contentAlign' => array(
                    'type' => 'string',
                    'default' => 'center'
                ),
                'addNofollow' => array(
                    'type' => 'boolean',
                    'default'=> false
                ),
                'openInNewTab' => array(
                    'type' => 'boolean',
                    'default'=> false
                )
            ),
			'render_callback' => 'ub_render_call_to_action_block'));
	}
}

add_action('init', 'ub_register_call_to_action_block');
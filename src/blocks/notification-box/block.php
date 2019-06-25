<?php

function ub_render_notification_box_block($attributes){
    extract($attributes);
    return '<div>
    <div class="'.$selectedNotify.'">
        <p class="ub_notify_text" style="text-align: '.$align.';">'.$notifyInfo.'</p>
    </div>
</div>';
}

function ub_register_notification_box_block() {
	if ( function_exists( 'register_block_type' ) ) {
        register_block_type( 'ub/notification-box', array(
            'attributes' => array(
                'selectedNotify' => array(
                    'type' => 'string',
                    'default' => 'ub_notify_info'
                ),
                'notifyInfo' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'align' => array(
                    'type' => 'string',
                    'default' => 'left'
                )
            ),
			'render_callback' => 'ub_render_notification_box_block'));
	}
}

add_action('init', 'ub_register_notification_box_block');
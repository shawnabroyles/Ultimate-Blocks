<?php

function ub_render_countdown_block($attributes){
    return '<div id="timer">'.date('Y-m-d\TH:i:sP').'</div>
            <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", function(){
                let ticker = setInterval(()=>{
                    let deadline = new Date("'.$attributes['endDate'].'").getTime();
                    document.getElementById("timer").innerHTML = Math.ceil((deadline - Date.now())/1000);
                }, 1000);
            });
            </script>';
}

function ub_register_countdown_block() {
	if( function_exists( 'register_block_type' ) ) {
		register_block_type( 'ub/countdown', array(
            'attributes' => array(
                'endDate' => array(
                    'type' => 'string',
                    'default' => date('Y-m-d\TH:i:sP')
                )
            ),
            'render_callback' => 'ub_render_countdown_block'));
    }
}

add_action( 'init', 'ub_register_countdown_block' );
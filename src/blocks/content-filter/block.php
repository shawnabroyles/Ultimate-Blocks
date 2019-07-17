<?php

/**
 * Enqueue frontend script for table fo contents block
 *
 * @return void
 */

function ub_render_content_filter_entry_block($attributes, $content){
    extract($attributes);
    return '<div class="ub-content-filter-panel" data-selectedFilters="'.json_encode($selectedFilters)
    .'" style="display: block;">'.$content.'</div>';
}

function ub_register_content_filter_entry_block(){
    if ( function_exists( 'register_block_type' ) ) {
        register_block_type( 'ub/content-filter-entry-block', array(
            'attributes' => array(
                'availableFilters' => array(
                    'type' => 'array',
                    'default' => array()//get list of filters from parent block
                ),
                /*'selectedFilters' => array(
                    'type' => 'array',
                    'default' => array()
                ),*/
                'buttonColor' => array(
                    'type' => 'string',
                    'default' => '#aaaaaa'
                ),
                'buttonTextColor' => array(
                    'type' => 'string',
                    'default' => '#000000'
                )
            ),
                'render_callback' => 'ub_render_content_filter_entry_block'));
        }
}

function ub_render_content_filter_block($attributes, $content){
    extract($attributes);

    //var_dump($attributes);

    //var_dump($filterArray[0]['category']);
    $newFilterArray = json_decode(json_encode($filterArray), true);

    $filterList = '';

    foreach((array)$newFilterArray as $key1 => $filterGroup){
        //echo 'category: ' . $filterGroup['category'] . PHP_EOL;
        //echo 'group number: ' . $key1 . PHP_EOL;
        $filterList .= '<div class="ub-content-filter-category"
        data-canUseMultiple="'.json_encode($filterGroup['canUseMultiple']).'">
        <div class="ub-content-filter-category-name">'.$filterGroup['category'].'</div>';

        foreach($filterGroup['filters'] as $key2 => $tag){
            $filterList .= '<div data-tagIsSelected="false" data-categoryNumber="'.$key1.'"
            data-filterNumber="'.$key2.'" data-normalColor="'.$buttonColor.'"
            data-normalTextColor="'.$buttonTextColor.'" data-activeColor="'.$activeButtonColor.'"
            data-activeTextColor="'.$activeButtonTextColor.'" class="ub-content-filter-tag"
            style="background-color: '.$buttonColor.'; color: '.$buttonTextColor.'">'.
            $tag.'</div>';
        }
        $filterList .= '</div>';
    }

$currentSelection = array_map(function($category){
                        return ($category['canUseMultiple'] ?
                                array_fill(0, count($category['filters']), false) :
                                -1);
                    }, (array)$filterArray);

return '<div class="wp-block-ub-content-filter" data-currentSelection="'.json_encode($currentSelection).'">'.
    $filterList.$content.'</div>';
}

function ub_register_content_filter_block(){
    if ( function_exists( 'register_block_type' ) ) {
        register_block_type( 'ub/content-filter-block', array(
            'attributes' => array(
                'filterArray' => array(
                    'type' => 'array',
                    'default' => array()
                ),
                'buttonColor' => array(
                    'type' => 'string',
                    'default' => '#eeeeee'
                ),
                'buttonTextColor' => array(
                    'type' => 'string',
                    'default' => '#000000'
                ),
                'activeButtonColor' => array(
                    'type' => 'string',
                    'default' => '#fcb900'
                ),
                'activeButtonTextColor' => array(
                    'type' => 'string',
                    'default' => '#ffffff'
                )
            ),
                'render_callback' => 'ub_render_content_filter_block'));
        
    }

}

function ub_content_filter_add_frontend_assets() {
    if ( has_block( 'ub/content-filter' ) or has_block('ub/content-filter-block') ) {
        wp_enqueue_script(
            'ultimate_blocks-content-filter-front-script',
            plugins_url( 'content-filter/front.build.js', dirname( __FILE__ ) ),
            array( ),
            Ultimate_Blocks_Constants::plugin_version(),
            true
        );
    }
}

add_action( 'wp_enqueue_scripts', 'ub_content_filter_add_frontend_assets' );
add_action('init', 'ub_register_content_filter_entry_block');
add_action('init', 'ub_register_content_filter_block');
<?php
function ub_render_row_column_block($attributes){
    global $post;
    $blocks = parse_blocks( $post->post_content );
    $result = '';
    var_dump($blocks);
    for($b=0; $b< count($blocks); $b++) {
        $block = $blocks[$b];
        $sizeCol = array();
        $col = $block['attrs'];
        foreach ($col as $key => $size) {
            if ($key == 'ColWidthOne') {
                array_push($sizeCol, $size);
            } elseif ($key == 'ColWidthTwo') {
                array_push($sizeCol, $size);
            } elseif ($key == 'ColWidthThree') {
                array_push($sizeCol, $size);
            }
        }
        //var_dump($sizeCol);
        $columns = $block['innerBlocks'];
        //var_dump($columns);
        $result.= '<div class="ub-single-section-block" style="margin:'.$attributes['marginTopWrap'].'px '.$attributes['marginRightWrap'].'px '.
            $attributes['marginBottomWrap'].'px '.$attributes['marginLeftWrap'].'px'.'">';
        for ($i = 0; $i < count($columns); $i++) {
            //var_dump($column);
            if ('ub/row-column' === $columns[$i]['blockName']) {
                $result .= '<div id="' . $columns[$i]['attrs']['id_column'] . '" class="ub-single-column" style="flex: 0 1 ' . $sizeCol[$i] . '">';
                foreach ($columns[$i]['innerBlocks'] as $content) {
                    //var_dump($content);
                    $result .= $content['innerHTML'];
                }
                $result .= '</div>';
            }
        }
        $result.= '</div>';
    }
    return $result;
}
function ub_render_row_block($attributes, $contents){
    extract($attributes);

    $column = ub_render_row_column_block($attributes);

    return $column;
}

function ub_register_row_block() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/row-block', array(
            'attributes' => $defaultValues['ub/row-block']['attributes'],
            'render_callback' => 'ub_render_row_block'));
    }
}

add_action('init', 'ub_register_row_block');
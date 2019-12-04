<?php
function ub_render_row_block($attributes){
    //var_dump($attributes);
    global $post;
    //var_dump($post);
    $blocks = parse_blocks( $post->post_content );
    $result = '';
    for($b=0; $b< count($blocks); $b++) {
        $block = $blocks[$b];
        //var_dump($blocks);
        $blockID = '';
        $coutColumns = '';
        $gutter = '';
        $colorBackground = '';
        $backgroundImg = '';
        $sizeCol = array();
        $col = $block['attrs'];
        foreach ($col as $key => $item) {
            if ($key == 'ColWidthOne') {
                array_push($sizeCol, $item);
            } elseif ($key == 'ColWidthTwo') {
                array_push($sizeCol, $item);
            } elseif ($key == 'ColWidthThree') {
                array_push($sizeCol, $item);
            } elseif ($key == 'ColWidthFour') {
                array_push($sizeCol, $item);
            } elseif ($key == 'ColWidthFive') {
                array_push($sizeCol, $item);
            } elseif ($key == 'ColWidthSix') {
                array_push($sizeCol, $item);
            } elseif ($key == 'blockID') {
                $blockID = $item;
            } elseif ($key == 'columns') {
                $coutColumns = $item;
            } elseif ($key == 'gutter') {
                $gutter = $item;
            } elseif ($key == 'imgURL') {
                $backgroundImg = $item;
            }
        }
        //var_dump($col);
        $columns = $block['innerBlocks'];
        //var_dump($block);
        if ($attributes['blockID'] === $blockID) {
            $result .= '<div class="ub-section-block-wrap" style="position: relative; overflow: hidden; margin:' . $attributes['marginTopWrap'] . $attributes['selectUnits'] .' '. $attributes['marginRightWrap'] . $attributes['selectUnits'] .
                ' '.$attributes['marginBottomWrap'] . $attributes['selectUnits'] .' '. $attributes['marginLeftWrap'] . $attributes['selectUnits'] . '; border:'. $attributes['wrapBorderSize'] .'px '.
                $attributes['wrapBorderStyle']. $attributes['wrapBorderColor'] . '; border-radius:'. $attributes['wrapBorderRadius'].'px;">';

            $result .='<div class="ub-section-block-video-wrap"><video class="ub-block-video" autoplay '.(false == $attributes['videoLoop'] ? '' : 'loop' ).' '.(false == $attributes['videoMuted'] ? '' : 'muted' ).' src="'. $attributes['videoURL'].'"></video></div>';
            $result .='<div class="ub-section-block-overlay" style="background-size: cover; background-repeat: no-repeat; background-position: center center; background-attachment: scroll; opacity: '.($attributes['wrapBackgroundOverlay'] == 100 ? 1 : '0.'. $attributes['wrapBackgroundOverlay']).'; background-color: '. $attributes['wrapBackgroundOverlayCol'].'"></div>';

            $result .= '<div class="ub-single-block" style="display: flex; background-image: url('.$backgroundImg.'); background-size: '.
                $attributes['wrapBackgroundSize'] .'; background-color:'.$attributes['wrapColor'].'; background-position:'. $attributes['wrapBackgroundPosition'].
                '; background-repeat:'. $attributes['wrapBackgroundRepeat'] .'; background-attachment:'. $attributes['wrapBackgroundAttachment'] . '; color:'.$attributes['textColor'].'">';
            for ($i = 0; $i < count($columns); $i++) {
                $cS = count($columns);
                if ($coutColumns == $cS && $attributes['gutter'] == '0px') {
                    switch ($cS) {
                        case 1:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 2:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 3:
                            $mleft = array(0, 0, 0);
                            $mright = array(0, 0, 0);
                            break;
                        case 4:
                            $mleft = array(0, 0, 0, 0);
                            $mright = array(0, 0, 0, 0);
                            break;
                        case 5:
                            $mleft = array(0, 0, 0, 0);
                            $mright = array(0, 0, 0, 0);
                            break;
                        case 6:
                            $mleft = array(0, 0, 0, 0);
                            $mright = array(0, 0, 0, 0);
                            break;
                    }
                } elseif ($coutColumns == $cS && $attributes['gutter'] == '4px') {
                    switch ($cS) {
                        case 1:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 2:
                            $mleft = array(0, 2);
                            $mright = array(2, 0);
                            break;
                        case 3:
                            $mleft = array(0, 2, 2);
                            $mright = array(2, 2, 0);
                            break;
                        case 4:
                            $mleft = array(0, 2, 2, 2);
                            $mright = array(2, 2, 2, 0);
                            break;
                        case 5:
                            $mleft = array(0, 2, 2, 2, 2);
                            $mright = array(2, 2, 2, 2, 0);
                            break;
                        case 6:
                            $mleft = array(0, 2, 2, 2, 2, 2);
                            $mright = array(2, 2, 2, 2, 2, 0);
                            break;
                    }
                } elseif ($coutColumns == $cS && $attributes['gutter'] == '12px') {
                    switch ($cS) {
                        case 1:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 2:
                            $mleft = array(0, 6);
                            $mright = array(6, 0);
                            break;
                        case 3:
                            $mleft = array(0, 6, 6);
                            $mright = array(6, 6, 0);
                            break;
                        case 4:
                            $mleft = array(0, 6, 6, 6);
                            $mright = array(6, 6, 6, 0);
                            break;
                        case 5:
                            $mleft = array(0, 6, 6, 6, 6);
                            $mright = array(6, 6, 6, 6, 0);
                            break;
                        case 6:
                            $mleft = array(0, 6, 6, 6, 6, 6);
                            $mright = array(6, 6, 6, 6, 6, 0);
                            break;
                    }
                } elseif ($coutColumns == $cS && $attributes['gutter'] == '34px') {
                    switch ($cS) {
                        case 1:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 2:
                            $mleft = array(0, 17);
                            $mright = array(17, 0);
                            break;
                        case 3:
                            $mleft = array(0, 17, 17);
                            $mright = array(17, 17, 0);
                            break;
                        case 4:
                            $mleft = array(0, 17, 17, 17);
                            $mright = array(17, 17, 17, 0);
                            break;
                        case 5:
                            $mleft = array(0, 17, 17, 17, 17);
                            $mright = array(17, 17, 17, 17, 0);
                            break;
                        case 6:
                            $mleft = array(0, 17, 17, 17, 17, 17);
                            $mright = array(17, 17, 17, 17, 17, 0);
                            break;
                    }
                } elseif ($coutColumns == $cS && $attributes['gutter'] == '88px') {
                    switch ($cS) {
                        case 1:
                            $mleft = array(0, 0);
                            $mright = array(0, 0);
                            break;
                        case 2:
                            $mleft = array(0, 44);
                            $mright = array(44, 0);
                            break;
                        case 3:
                            $mleft = array(0, 44, 44);
                            $mright = array(44, 44, 0);
                            break;
                        case 4:
                            $mleft = array(0, 44, 44, 44);
                            $mright = array(44, 44, 44, 0);
                            break;
                        case 5:
                            $mleft = array(0, 44, 44, 44, 44);
                            $mright = array(44, 44, 44, 44, 0);
                            break;
                        case 6:
                            $mleft = array(0, 44, 44, 44, 44, 44);
                            $mright = array(44, 44, 44, 44, 44, 0);
                            break;
                    }
                }
                $result .= '<div id="' . $columns[$i]['attrs']['id_column'] . '" class="ub-single-column" style="flex: 0 1 ' . $sizeCol[$i] . '; margin-left:' . $mleft[$i] . 'px; margin-right:' . $mright[$i] . 'px; background-color:'.
                    $attributes['columnBgColor'].'; border-width:'.$columns[$i]['attrs']['columnBorderSize'].'px; border-color:'.$columns[$i]['attrs']['columnBorderColor'].'; border-style:'.$columns[$i]['attrs']['columnBorderStyle'].
                    '; border-radius:'.$columns[$i]['attrs']['columnBrTopRadius'].'px; background-image: url('.$columns[$i]['attrs']['columnImgURL'].')">';
                foreach ($columns[$i]['innerBlocks'] as $content) {
                    //var_dump($content);
                    $blocrRender = render_block($content);
                    $result .= $blocrRender;
                }
                $result .= '</div>';
            }
            $result .= '</div></div>';
        }
    }
    return $result;
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
<?php
$style_column = array();

function ub_render_row_column($attributes){
    extract($attributes);
    //var_dump($attributes);
    global $style_column;
    $style = 'margin:'.(isset($attributes['columnMarginTop']) ? $attributes['columnMarginTop'] : '').'px '.(isset($attributes['columnMarginRight']) ? $attributes['columnMarginRight'] : '').'px '.
        (isset($attributes['columnMarginBottom']) ? $attributes['columnMarginBottom'] : '').'px '.(isset($attributes['columnMarginLeft']) ? $attributes['columnMarginLeft'] : '').'px; padding:'.
        (isset($attributes['columnPaddingTop']) ? $attributes['columnPaddingTop'] : '').'px '.(isset($attributes['columnPaddingRight']) ? $attributes['columnPaddingRight'] : '').'px '.
        (isset($attributes['columnPaddingBottom']) ? $attributes['columnPaddingBottom'] : '').'px '.(isset($attributes['columnPaddingLeft']) ? $attributes['columnPaddingLeft'] : '').'px;'.
        (isset($attributes['columnBgColor']) ? 'background-color:'.$attributes['columnBgColor'].';' : '').
        (isset($attributes['onControlBrSize']) ? ($attributes['onControlBrSize'] === false ? 'border-width:'.(isset($attributes['columnBorderTop']) ? $attributes['columnBorderTop'].'px ': '').(isset($attributes['columnBorderRight']) ? $attributes['columnBorderRight'].'px ': '').(isset($attributes['columnBorderBottom']) ? $attributes['columnBorderBottom'].'px ': '').(isset($attributes['columnBorderLeft']) ? $attributes['columnBorderLeft'].'px;': ''):'' ):'').
        (isset($attributes['onControlBrRadius']) ? ($attributes['onControlBrRadius'] === false ? 'border-radius:'.(isset($attributes['columnBrTopRadius']) ? $attributes['columnBrTopRadius'].'px ': '').(isset($attributes['columnBrRightRadius']) ? $attributes['columnBorderRightRadius'].'px ': '').(isset($attributes['columnBrBottomRadius']) ? $attributes['columnBrBottomRadius'].'px ': '').(isset($attributes['columnBrLeftRadius']) ? $attributes['columnBrLeftRadius'].'px;': ''):'' ):'').
        (isset($attributes['columnBorderStyle']) ? 'border-style:'.$attributes['columnBorderStyle'].';' : '').
        (isset($attributes['columnBorderSize']) ? 'border-width:'.$attributes['columnBorderSize'].'px;' : '').
        (isset($attributes['columnBorderColor']) ? 'border-color:'.$attributes['columnBorderColor'].';' : '').
        (isset($attributes['columnImgURL']) ? 'background-image: url('.$attributes['columnImgURL'].')'.';' : '').
        (isset($attributes['columnBgSize']) ? 'background-size:'.$attributes['columnBgSize'].';' : '' ).
        (isset($attributes['columnBgPosition']) ? 'background-position:'.$attributes['columnBgPosition'].';' : '').
        (isset($attributes['columnBgRepeat']) ? 'background-repeat:'.$attributes['columnBgRepeat'].';' : '').
        (isset($attributes['columnBgAttachment']) ? 'background-attachment:'.$attributes['columnBgAttachment'].';' : '');
    array_push($style_column, $style);
    return $style_column;
}

function ub_register_row_column() {
    if( function_exists( 'register_block_type' ) ) {
        require dirname(dirname(__DIR__)) . '/defaults.php';
        register_block_type( 'ub/row-column', array(
            'attributes' => $defaultValues['ub/row-column']['attributes'],
            'render_callback' => 'ub_render_row_column'));
    }
}

function ub_render_row_block($attributes){
    global $post;
    global $style_column;
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
            $result .= '<'.$attributes['wrapTag'].' class="ub-section-block-wrap align'.$attributes['wrapAlignment'].'" style="position: relative; overflow: hidden; margin:' . $attributes['marginTopWrap'] . $attributes['selectUnits'] .' '. $attributes['marginRightWrap'] . $attributes['selectUnits'] .
                ' '.$attributes['marginBottomWrap'] . $attributes['selectUnits'] .' '. $attributes['marginLeftWrap'] . $attributes['selectUnits'] . '; border:'. $attributes['wrapBorderSize'] .'px '.
                $attributes['wrapBorderStyle']. $attributes['wrapBorderColor'] . '; border-radius:'. $attributes['wrapBorderRadius'].'px;">';

            $result .='<div class="ub-section-block-video-wrap"><video class="ub-block-video" autoplay '.(false == $attributes['videoLoop'] ? '' : 'loop' ).' '.(false == $attributes['videoMuted'] ? '' : 'muted' ).' src="'. $attributes['videoURL'].'"></video></div>';
            $result .='<div class="ub-section-block-overlay" style="background-size: cover; background-repeat: no-repeat; background-position: center center; background-attachment: scroll; opacity: '.($attributes['wrapBackgroundOverlay'] == 100 ? 1 : '0.'. $attributes['wrapBackgroundOverlay']).'; background-color: '. $attributes['wrapBackgroundOverlayCol'].'"></div>';

            $result .= '<div class="ub-single-block ub-tab-'.($attributes['tabletSizeGrid'] ? $attributes['tabletSizeGrid'] : 'inherit' ).' ub-mobile-'.($attributes['mobileSizeGrid'] ? $attributes['mobileSizeGrid'] : 'collapse-row' ).'" style="display: flex; background-image: url('.$backgroundImg.'); background-size:'.
                $attributes['wrapBackgroundSize'].'; background-color:'.$attributes['wrapColor'].'; background-position:'.$attributes['wrapBackgroundPosition'].
                '; background-repeat:'.$attributes['wrapBackgroundRepeat'].'; background-attachment:'.$attributes['wrapBackgroundAttachment'].'; color:'.$attributes['textColor'].'">';
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
                $result .= '<div id="' . $columns[$i]['attrs']['id_column'] . '" class="ub-single-wrap" style="flex: 0 1 ' . $sizeCol[$i] . '; margin-left:' . ($mleft[$i] ? $mleft[$i].'px;' : '0px;') . 'margin-right:' . ($mright[$i] ? $mright[$i].'px;' : '0px;') .' display: flex; flex-direction: column; word-break: break-word; justify-content:'.$attributes['wrapVerticalAligment'].'">';
                $result .= '<div class="ub-single-column" style="'.$style_column[$i].' z-index: 1">';
                foreach ($columns[$i]['innerBlocks'] as $content) {
                    //var_dump($content);
                    $blocrRender = render_block($content);
                    $result .= $blocrRender;
                }
                $result .= '</div></div>';
            }
            $result .= '</div></'.$attributes['wrapTag'].'>';
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

add_action('init', 'ub_register_row_column');
add_action('init', 'ub_register_row_block');
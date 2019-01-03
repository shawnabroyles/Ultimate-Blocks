<?php

function isSSL(){
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;
}

function generateCouponID($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}

function couponColumn($columnNumber, $couponID, $discountText, $couponCode, $couponType, $codeIsVisible, $targetURL, $hasExpiration, $expiration=null ){
    $visibleCoupon = '<div class="wpcd-coupon-code">
    <a rel="nofollow" href="'.$targetURL.'" class="masterTooltip wpcd-btn wpcd-coupon-button" id="wpcd_coupon_'.$couponID.'-'.$columnNumber.'"
    target="_blank" title="Click To Copy Coupon" data-clipboard-text="'.$couponCode.'" onclick="var clip = new Clipboard(\'#wpcd_coupon_'.$couponID.'-'.$columnNumber.'\');">
        '.($couponType=='Coupon'?'<span class="wpcd_coupon_icon">':'<span class="wpcd_deal_icon">').'</span>'.$couponCode.'
    </a>
</div>';

    $hiddenCoupon = '<div class="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
    <a data-type="code" class="coupon-button coupon-code-wpcd masterTooltip" title="Click Here to Show Code" data-position="top center" data-inverted="" data-aff-url="'.$targetURL.'"
        onclick="document.querySelector(\'#wpcd_coupon_popup_'.$couponID.' .wpcd_coupon_popup_copy_code_span\').innerText = \''.$couponCode.'\';
            document.querySelector(\'#wpcd_coupon_popup_'.$couponID.' .wpcd_coupon_top_copy_span\').setAttribute(\'data-clipboard-text\', \''.$couponCode.'\');
            document.getElementById(\'wpcd_coupon_popup_'.$couponID.'\').style.display=\'block\';
            document.getElementById(\'wpcd-coupon-cover-'.$couponID.'-'.$columnNumber.'\').style.display=\'none\';"
            target="_blank">
        <span class="code-text-wpcd" rel="nofollow">'.$couponCode.'</span>
        <span class="get-code-wpcd" id="wpcd-coupon-cover-'.$couponID.'-'.$columnNumber.'">Show Code</span>' //Hide cover and show popup when clicked
    .'</a>
</div>';

    return('<div class="wpcd-coupon-four-info">
                <div class="wpcd-coupon-four-coupon">
                    <div class="wpcd-four-discount-text">'.$discountText.'</div> '.
                        ($codeIsVisible ? $visibleCoupon : $hiddenCoupon) .'
                    <div class="wpcd-coupon-four-expire">'.
                    ($hasExpiration ? ($expiration-time() < 0 ? '<p class="wpcd-coupon-four-expired">Expired on: '.date('n/j/Y', $expiration).'</p>' : '<p>Expires on: '.date('n/j/Y', $expiration).'</p>') : '<p>Doesn\'t expire</p>')
                    .'</div>
                </div>
            </div>');
}

function wpcd_render_coupon_block($attributes){

    $couponID = generateCouponID();
    
    $visibleCouponVariant1 = '<div class="wpcd-coupon-code">
    <a rel="nofollow" href="'.$attributes['targetURL'].'" class="masterTooltip wpcd-btn wpcd-coupon-button wpcd_coupon_'.$couponID.'" target="_blank" title="Click To Copy Coupon"
        data-clipboard-text="'.$attributes['couponCode'].'" onclick="var clip = new Clipboard(\'.wpcd_coupon_'.$couponID.'\');">
        '.($attributes['couponType']=='Coupon'?'<span class="wpcd_coupon_icon">':'<span class="wpcd_deal_icon">').'</span>'.$attributes['couponCode'].'
    </a>
</div>';

    $hiddenCoupon = '<div class="coupon-code-wpcd coupon-detail wpcd-coupon-button-type">
    <a data-type="code" class="coupon-button coupon-code-wpcd masterTooltip" title="Click Here to Show Code"
    data-position="top center" data-inverted="" data-aff-url="'.$attributes['targetURL'].'"  target="_blank"
        onClick="document.getElementById(\'wpcd_coupon_popup_'.$couponID.'\').style.display=\'block\';
                document.getElementById(\'wpcd-coupon-cover-'.$couponID.'\').style.display=\'none\';">
        <span class="code-text-wpcd" rel="nofollow">'.$attributes['couponCode'].'</span>
        <span class="get-code-wpcd" id="wpcd-coupon-cover-'.$couponID.'">Show Code</span>' //Hide cover and show popup when clicked
    .'</a>
</div>';

    $couponTitleHeader = '<h1 class="wpcd-coupon-title">
        <a href="'.$attributes['targetURL'].'" target="_blank" rel="nofollow">'.$attributes['couponTitle'].'</a>
    </h1>';

    $timeRemaining = '<p id="'.generateCouponID().'">'.($attributes['expiryTime']-$attributes['expiryTime']%86400).'</p>';

    $futureExpirationMessage = '<div class="wpcd-coupon-expire">Expires on: '.date('n/j/Y', $attributes['expiryTime']).'</div>';

    $noExpirationMessage = '<div class="wpcd-coupon-expire">Doesn\'t expire</div>';

    $pastExpirationMessage = '<div class="wpcd-coupon-expired">Expired on: '.date('n/j/Y', $attributes['expiryTime']).'</div>' ; 

    $expiryStatus = $attributes['couponExpires'] ? ($attributes['expiryTime']-time() < 0 ? $pastExpirationMessage : $futureExpirationMessage) : $noExpirationMessage;

    $description = '<div class="wpcd-coupon-description">
        <span class="wpcd-full-description" style="display: none;">'.$attributes['couponText'].'</span>
        <span class="wpcd-short-description"></span>
        <a href="#" class="wpcd-more-description">More</a>
        <a href="#" class="wpcd-less-description" style="display: none;">Less</a>
    </div>';

    $currentURL = (isSSL() ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $socialPanel = '';

    $noTimer = '<b class="never-expire">Doesn\'t expire</b>';

    function generateCountdownDisplay($expiryTime){
        $timeLeft = $expiryTime-time();
        $seconds = $timeLeft % 60;
        $minutes = (($timeLeft - $seconds) % 3600) / 60;
        $hours = (($timeLeft - $minutes * 60 - $seconds) % 86400) / 3600;
        $days = (($timeLeft - $hours * 3600 - $minutes * 60 - $seconds) % 604800) / 86400;
        $weeks = ($timeLeft - $days * 86400 - $hours * 3600 - $minutes * 60 - $seconds) / 604800;

        $defaultTimeDisplay = $minutes . ' minutes ' . $seconds . ' seconds';

        $timeDisplay = $defaultTimeDisplay;

        if ($hours > 0){
            $timeDisplay = $hours . ' hours ' . $defaultTimeDisplay;
        } 
        if ($days > 0){
            $timeDisplay = $days . ' days ' . $hours . ' hours ' . $defaultTimeDisplay;
        }
        if ($weeks > 0){
            $timeDisplay = $weeks . ' weeks ' . $days . ' days ' . $hours . ' hours ' . $defaultTimeDisplay;
        }
        return $timeDisplay;
    }

    $activeTimer = '<b class="expires-on"> Expires on:		
    <span class="wpcd-coupon-'.($attributes['couponStyle']=='2'?'two':'six').'-countdown" id="wpcd-timer-'.$couponID.'">'.generateCountdownDisplay($attributes['expiryTime']).'</span>
    </b>';

    $stoppedTimer = '<b class="expires-on">Expires on:
    <span class="wpcd-coupon-'.($attributes['couponStyle']=='2'?'two':'six').'-countdown wpcd-countdown-expired" id="wpcd-timer-'.$couponID.'">This offer has expired!</span>
    </b>';

    $timerDisplay = ($attributes['couponExpires'] ? ($attributes['expiryTime']-time() > 0 ? $activeTimer : $stoppedTimer ) : $noTimer)
        . '<script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function(){
            let ticker = setInterval(()=>{
                const timeLeft = '.$attributes['expiryTime'].'-Math.ceil(Date.now()/1000);
                const timerPanel = document.getElementById("wpcd-timer-'.$couponID.'");
                if (timeLeft > 0){
                    const seconds = timeLeft % 60;
                    const minutes = ((timeLeft - seconds) % 3600) / 60;
                    const hours = ((timeLeft - minutes * 60 - seconds) % 86400) / 3600;
                    const days = ((timeLeft - hours * 3600 - minutes * 60 - seconds) % 604800) / 86400;
                    const weeks = (timeLeft - days * 86400 - hours * 3600 - minutes * 60 - seconds) / 604800;
            
                    const defaultTimeDisplay = `${minutes} minutes ${seconds} seconds`;
            
                    let timeDisplay = defaultTimeDisplay;
            
                    if (hours > 0) timeDisplay = `${hours} hours ` + defaultTimeDisplay;
                    if (days > 0) timeDisplay = `${days} days ${hours} hours ` + defaultTimeDisplay;
                    if (weeks > 0) timeDisplay = `${weeks} weeks ${days} days ${hours} hours ` + defaultTimeDisplay;

                    timerPanel.innerHTML = timeDisplay;
                }
                else{
                    timerPanel.classList.add("wpcd-countdown-expired");
                    timerPanel.innerHTML = "This offer has expired!";
                    clearInterval(ticker);
                }
            }, 1000);
        });
        </script>';

    if($attributes['showSocialLinks']) $socialPanel .= '<div class="wpcd-share-buttons-container">
    <div class="col-md-12 row">
        <a href="https://www.facebook.com/sharer/sharer.php?u='.$currentURL.'" target="_blank" class="wpcd-btn-social wpcd-btn-xs wpcd-btn-facebook"><i class="wpcd-facebook-f"><img class="wpcd-svg" src="'.WPCD_Plugin::instance()->plugin_assets.'svg/facebook-f.svg"></i></a>
        <a href="http://twitter.com/share?text='.$attributes['couponTitle'].'n&amp;url='.$currentURL.'" target="_blank" class="wpcd-btn-social wpcd-btn-xs wpcd-btn-twitter"><i class="wpcd-twitter"><img class="wpcd-svg" src="'.WPCD_Plugin::instance()->plugin_assets.'svg/twitter.svg"></i></a>
    </div>
</div>';

$popUp =  '
<section id="wpcd_coupon_popup_'.$couponID.'" class="wpcd_coupon_popup_wr" style="display:none">
    <div class="wpcd_coupon_popup_layer"></div>
        <div class="wpcd_coupon_popup_inner">
            <div class="wpcd_coupon_popup_top_head">
                <p class="wpcd_coupon_popup_title">'.$attributes['couponTitle'].'</p>
                <span class="wpcd_coupon_popup_close">×</span>
            </div>
        <div class="wpcd_coupon_popup_copy_main">
            <div class="wpcd_coupon_popup_copy_text">
                '.$attributes['couponText'].'
            </div>
            <div class="wpcd_coupon_popup_copy_code_wr">
                <span class="wpcd_coupon_popup_copy_code_span">'.$attributes['couponCode'].'</span>
                <span class="wpcd_coupon_top_copy_span wpcd_coupon_top_copy_span_'.$couponID.'" data-clipboard-text="'.$attributes['couponCode'].'">Copy</span>
            </div>
            <script type="text/javascript">
                var clip = new Clipboard(".wpcd_coupon_top_copy_span_'.$couponID.'");
                clip.on("success", function () {
                    document.querySelector(".wpcd_coupon_top_copy_span_'.$couponID.'").innerText = "Copied";
                    setTimeout(function () {
                        document.querySelector(".wpcd_coupon_top_copy_span_'.$couponID.'").innerText = "Copy";
                    }, 500);
                });
            </script>
            <a target="_blank" rel="nofollow" class="wpcd_popup-go-link" href='.$attributes['targetURL'].'>Go to Offer</a>
        </div>
    </div>
</section>';

$defaultTemplate = '<div class="wpcd-coupon wpcd-coupon-default">
<div class="wpcd-col-1-8">
    <div class="wpcd-coupon-discount-text">
        '.$attributes['discountText'].'
    </div>
    <div class="coupon-type">'.$attributes['couponType'].'</div>
</div>
<div class="wpcd-coupon-content wpcd-col-7-8">
    <div class="wpcd-coupon-header">
        <div class="wpcd-col-1-4">'.
        ($attributes['showCode'] ? $visibleCouponVariant1 : $hiddenCoupon).'
        </div>
        <div class="wpcd-col-3-4">
        '.$couponTitleHeader.'
        </div>
    </div>
    <div class="wpcd-extra-content">
        <div class="wpcd-col-3-4">
            '.$description.'
        </div>
        <div class="wpcd-col-1-4">
            '.$expiryStatus.'
        </div>
    </div>
</div>
'.$popUp.'
'.$socialPanel.'
</div>';

$couponImage = $attributes['imgURL']==null?(WPCD_Plugin::instance()->plugin_assets.'img/icon-128x128.png'):$attributes['imgURL'];
$couponImage2 = $attributes['imgURL']==null?(WPCD_Plugin::instance()->plugin_assets.'img/coupon-200x200.png'):$attributes['imgURL'];

$proTemplate1 = '<div class="wpcd-coupon-one">
<div class="wpcd-col-one-1-8">
    <figure>
        <img class="wpcd-coupon-one-img" src="'.$couponImage.'">
    </figure>
</div>
<div class="wpcd-col-one-7-8">
    <div class="wpcd-coupon-one-title">
        '.$couponTitleHeader.'
    </div>
        '.$description.'
</div>
<div class="wpcd-col-one-1-4">
    <div class="wpcd-coupon-one-discount-text">'.$attributes['discountText'].'</div>'.
    ($attributes['showCode'] ? $visibleCouponVariant1 : $hiddenCoupon).'
   '.$expiryStatus.'
</div>

'.$popUp.'
'.$socialPanel.'
</div>';

$proTemplate2 = '<div class="wpcd-coupon-two">
<div class="wpcd-col-two-1-4">
    <figure>
        <img class="wpcd-coupon-two-img" src="'.$couponImage.'">
    </figure>
    <div class="wpcd-coupon-two-discount-text">'.$attributes['discountText'].'</div>
</div>
<div class="wpcd-col-two-3-4">
    <div class="wpcd-coupon-two-header">
        <div>
        '.$couponTitleHeader.'
        </div>
    </div>
    <div class="wpcd-coupon-two-info">
        <div class="wpcd-coupon-two-title">
            '.$timerDisplay.'   
        </div>
        <div class="wpcd-coupon-two-coupon">
        '.($attributes['showCode'] ? $visibleCouponVariant1 : $hiddenCoupon).'
            <div id="clear"></div>
        </div>
        <div id="clear"></div>
    </div>   
    '.$description.'
</div>
'.$popUp.'
'.$socialPanel.'
</div>';

$proTemplate3 = '<div class="wpcd-coupon-three">
<div class="wpcd-coupon-three-content">
    <div class="wpcd-coupon-three-title">
        '.$couponTitleHeader.'
    </div>
    '.$description.'
</div>
<div class="wpcd-coupon-three-info">
    <div class="wpcd-coupon-three-expire">
        '.$expiryStatus.'
    </div>
    <div class="wpcd-coupon-three-coupon">
        '.($attributes['showCode'] ? $visibleCouponVariant1 : $hiddenCoupon).'
    </div>
</div>
'.$popUp.'
<div class="clearfix"></div>
'.$socialPanel.'
</div>';

$proTemplate4 = '<div class="wpcd-coupon-four">
<div class="wpcd-coupon-four-content">
    <div class="wpcd-coupon-four-title">
        '.$couponTitleHeader.'
    </div>
        '.$description.'
</div>

'.couponColumn(1, $couponID, $attributes['discountText'], $attributes['couponCode'], $attributes['couponType'], $attributes['showCode'], $attributes['targetURL'], $attributes['couponExpires'], $attributes['expiryTime']).'

'.($attributes['couponType']=='Coupon' ? couponColumn(2, $couponID, $attributes['discountText2'], $attributes['couponCode2'], 'Coupon',$attributes['showCode'], $attributes['targetURL2'], $attributes['coupon2Expires'], $attributes['expiryTime2'])
 : couponColumn(1, $couponID, $attributes['discountText'], $attributes['couponCode'], 'Deal', $attributes['showCode'], $attributes['targetURL'], $attributes['couponExpires'], $attributes['expiryTime'])).'

'.($attributes['couponType']=='Coupon' ? couponColumn(3, $couponID, $attributes['discountText3'], $attributes['couponCode3'], 'Coupon',$attributes['showCode'], $attributes['targetURL3'], $attributes['coupon3Expires'], $attributes['expiryTime3'])
 : couponColumn(1, $couponID, $attributes['discountText'], $attributes['couponCode'], 'Deal', $attributes['showCode'], $attributes['targetURL'], $attributes['couponExpires'], $attributes['expiryTime'])).'

<div class="clearfix"></div>

'.$popUp.'
'.$socialPanel.'
</div>';

$proTemplate5 = '<div class="wpcd-template-five" style="border-color: '.$attributes['couponColor'].'">
<div class="wpcd-template-five-holder">
    <div class="wpcd-template-five-percent-off">
        <p class="wpcd-coupon-five-discount-text">'.$attributes['discountText'].'</p>
    </div>
    <div class="wpcd-template-five-pro-img">
        <img src="'.$couponImage2.'" alt="Coupon">
    </div>

    <div class="wpcd-template-five-texts">
        '.$couponTitleHeader.'
        '.$description.'
    </div>
</div>

<div class="extra-wpcd-template-five-holder">
    <div class="wpcd-template-five-exp" style="background-color: '.$attributes['couponColor'].'">
        <div class="with-expiration1 ">'.
        ($attributes['couponExpires'] ? ($attributes['expiryTime']-time() < 0 
        ?  '<div class="wpcd-coupon-five-expire expired-text-block1">
                <p class="wpcd-coupon-five-expired">
                    Expired on: <span class="expiration-date">'.date('n/j/Y', $attributes['expiryTime']).'</span>
                </p>
            </div>'
        : '<div class="wpcd-coupon-five-expire expire-text-block1">
            <p class="wpcd-coupon-five-expire-text">
                Expires on: <span class="expiration-date">'.date('n/j/Y', $attributes['expiryTime']).'</span>
            </p>
        </div>')
        : '<div class="wpcd-coupon-five-expire without-expiration1">
                <p>Doesn\'t expire</p>
            </div>')
        .'</div>
        </div>'.
        ($attributes['showCode'] ? '<div class="wpcd-coupon-code">
        <a class="wpcd-template-five-btn masterTooltip wpcd_coupon_'.$couponID.'" href="'.$attributes['targetURL'].'" target="_blank" rel="nofollow" title="Click Here To Copy Coupon" data-clipboard-text="'.$attributes['couponCode'].'" style="border-color: '.$attributes['couponColor'].'" onclick="var clip = new Clipboard(\'.wpcd_coupon_'.$couponID.'\');"">
            <p class="coupon-code-button" style="color: '.$attributes['couponColor'].'">'.$attributes['couponCode'].'</p>
        </a>
    </div>'
        : '<div class="coupon-code-wpcd coupon-detail wpcd-coupon-button-type wpcd-coupon-hidden">
        <a data-type="code" target="_blank" class="coupon-button coupon-code-wpcd masterTooltip" title="Click Here to Show Code" data-position="top center" data-inverted="" data-aff-url="'.$attributes['targetURL'].'"
            onclick="document.getElementById(\'wpcd_coupon_popup_'.$couponID.'\').style.display=\'block\';
            document.getElementById(\'wpcd-coupon-cover-'.$couponID.'\').style.display=\'none\';" data-clipboard-text="'.$attributes['couponCode'].'">
            <span class="code-text-wpcd" rel="nofollow" style="">'.$attributes['couponCode'].'</span>
            <span class="get-code-wpcd" id="wpcd-coupon-cover-'.$couponID.'" style="background-color: '.$attributes['couponColor'].'">
                Show Code
                <div style="border-left-color: '.$attributes['couponColor'].'"></div>
            </span>
        </a>
    </div>')
        .'
</div>

<div class="clearfix"></div>
'.$popUp.'
'.$socialPanel.'
</div>';

$proTemplate6 = '<div class="wpcd-coupon-six" style="border-color: '.$attributes['couponColor'].'">
<div class="wpcd-coupon-six-holder">
    <div class="wpcd-coupon-six-percent-off">
        <div class="wpcd-for-ribbon">
            <div class="wpcd-ribbon" style="background-color: '.$attributes['couponColor'].'">
                <div class="wpcd-ribbon-before" style="border-left-color: '.$attributes['couponColor'].'"></div>
                <p class="wpcd-coupon-six-discount-text">'.$attributes['discountText'].'</p>
                <div class="wpcd-ribbon-after" style="border-right-color: '.$attributes['couponColor'].'"></div>
            </div>
        </div>
    </div>
    <div class="wpcd-coupon-six-texts">
        <div class="texts">
            '.$couponTitleHeader.'
            '.$description.'
        </div>
        <div class="exp" style="border-color: '.$attributes['couponColor'].'">
            <p>
                '.$timerDisplay.'                                     
            </p>
        </div>
    </div>
    <div class="wpcd-coupon-six-img-and-btn">
        <div class="item-img">
            <img src="'.$couponImage2.'" alt="Coupon">
        </div>'.
            ($attributes['showCode'] ? '<div class="wpcd-coupon-code wpcd-btn-wrap">
                <a class="wpcd-template-six-btn masterTooltip wpcd_coupon_'.$couponID.'" target="_blank" rel="nofollow" href="'.$attributes['targetURL'].'" title="Click Here To Copy Coupon" data-clipboard-text="'.$attributes['couponCode'].'"
                    onclick="var clip = new Clipboard(\'.wpcd_coupon_'.$couponID.'\');" style="border-color: '.$attributes['couponColor'].'">
                    <span class="coupon-code-button" style="border-color: '.$attributes['couponColor'].'; color: '.$attributes['couponColor'].'">'.$attributes['couponCode'].'</span>
                </a>
            </div>'
        : '<div class="coupon-code-wpcd coupon-detail wpcd-coupon-button-type wpcd-coupon-hidden">
                <div class="wpcd-btn-wrap">
                    <a data-type="code" class="coupon-button coupon-code-wpcd masterTooltip" title="Click Here to Show Code" data-position="top center" data-inverted="" data-aff-url="'.$attributes['targetURL'].'"
                    onclick="document.getElementById(\'wpcd_coupon_popup_'.$couponID.'\').style.display=\'block\';
                        document.getElementById(\'wpcd-coupon-cover-'.$couponID.'\').style.display=\'none\';" style="border-color: '.$attributes['couponColor'].'">
                    <span class="code-text-wpcd" rel="nofollow" style="">'.$attributes['couponCode'].'</span>
                        <span class="get-code-wpcd" id="wpcd-coupon-cover-'.$couponID.'" style="background-color: '.$attributes['couponColor'].'">
                            Show Code
                        <div style="border-left-color: '.$attributes['couponColor'].'"></div>
                    </span>
                    </a>
                </div>
            </div>'
            ).'
    </div>
</div>

<div class="clearfix"></div>
'.$popUp.'
'.$socialPanel.'
</div>';

$alternateTemplate = '<div class="wpcd-new-grid-container">
<div class="wpcd-new-grid-one">
    <div class="wpcd-new-discount-text">
        '.$attributes['discountText'].'
    </div>
    <div class="wpcd-new-coupon-type">
        '.$attributes['couponType'].'
    </div>'.
    ($attributes['couponExpires'] ?
        ($attributes['expiryTime']-time() < 0 ?
            '<p class="wpcd-new-expired-text">Expired On: '.date('n/j/Y', $attributes['expiryTime']).'</p>' :
            '<p class="wpcd-new-expire-text">Expires On: '.date('n/j/Y', $attributes['expiryTime']).'</p>') :
        '<p class="wpcd-new-expire-text">Doesn\'t expire</p>')
    .'
</div> <!-- End of grid-one -->

<div class="wpcd-new-grid-two">
    <h1 class="wpcd-new-title">
        <a href="'.$attributes['targetURL'].'" target="_blank" rel="nofollow">'.$attributes['couponTitle'].'</a>
    </h1>
    '.$description.'
</div> <!-- End of grid-two -->
<div class="wpcd-new-grid-three">
    <a class="wpcd-new-coupon-code masterTooltip wpcd_coupon_'.$couponID.'" rel="nofollow" href="'.$attributes['targetURL'].'" target="_blank" data-clipboard-text="'.$attributes['couponCode'].'"
        onclick="var clip = new Clipboard(\'.wpcd_coupon_'.$couponID.'\');" title="Click To Copy Coupon">
        '.$attributes['couponCode'].'
    </a>
    <a class="wpcd-new-goto-button" rel="nofollow" href="'.$attributes['targetURL'].'" target="_blank">
       GO TO THE DEAL
    </a>
</div><!-- End of grid-three -->


'.$popUp.'

</div>';

$date = new DateTime();
$timeZone = $date->getTimezone();
$timeZoneName = $timeZone -> getName(); //stuck on utc

$template = array($defaultTemplate, $alternateTemplate, $proTemplate1, $proTemplate2,
                    $proTemplate3, $proTemplate4, $proTemplate5, $proTemplate6);

    return ('<script type="text/javascript" src ="'.WPCD_Plugin::instance()->plugin_assets.'js/clipboard.min.js"></script>'
            . $template[$attributes['couponStyle']]);
}

function wpcd_register_coupon_block() {
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type( 'ub/wpcd-coupons-and-deals', array(
            'attributes' => array(
                'couponTitle' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'couponType' => array(
                    'type' => 'string',
                    'default' => 'Coupon'
                ),
                'couponCode' => array(
                    'type' => 'string',
                    'default' => 'COUPONCODE'
                ),
                'targetURL' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'discountText' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'couponCode2' => array(
                    'type' => 'string',
                    'default' => 'COUPONCODE'
                ),
                'couponCode3' => array(
                    'type' => 'string',
                    'default' => 'COUPONCODE'
                ),
                'targetURL2' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'targetURL3' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'discountText2' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'discountText3' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'couponText' => array(
                    'type' => 'string',
                    'default' => ''
                ),
        
                'showExpiryDate' => array(
                    'type' => 'boolean',
                    'default' => true
                ),
                'showCode' => array(
                    'type' => 'boolean',
                    'default' => true
                ),
                'couponExpires' => array(
                    'type' => 'boolean',
                    'default' => false
                ),
                'coupon2Expires' => array(
                    'type' => 'boolean',
                    'default' => false
                ),
                'coupon3Expires' => array(
                    'type' => 'boolean',
                    'default' => false
                ),
                'expiryTime' => array(
                    'type' => 'number',
                    'default' => 0
                ),
                'expiryTime2' => array(
                    'type' => 'number',
                    'default' => 0
                ),
                'expiryTime3' => array(
                    'type' => 'number',
                    'default' => 0
                ),
                'couponStyle' => array(
                    'type' => 'number',
                    'default' => 0
                ),
                'imgURL' => array(
                    'type' => 'string'
                ),
                'imgID' => array(
                    'type' => 'string'
                ),
                'imgAlt' => array(
                    'type' => 'string'
                ),
                'couponColor' => array(
                    'type' => 'string',
                    'default' => '#18e066f'
                ),
                'showSocialLinks' => array(
                    'type' => 'boolean',
                    'defualt' => false
                ),
            ),
			'render_callback' => 'wpcd_render_coupon_block'));
	}
}

add_action('init', 'wpcd_register_coupon_block');
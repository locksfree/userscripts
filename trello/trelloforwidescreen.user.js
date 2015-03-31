// ==UserScript==
// @name        TrelloForWideScreens
// @namespace   Trello
// @description Trello for wide screens
// @include     https://trello.com/*
// @version     1
// @grant       none
// @author      LocksFree <locksfree+userscripts@gmail.com>
// @downloadURL https://raw.githubusercontent.com/locksfree/userscripts/master/trello/trelloforwidescreen.user.js
// @updateURL https://raw.githubusercontent.com/locksfree/userscripts/master/trello/trelloforwidescreen.user.js
// ==/UserScript==

// Custom cursor pointer: http://megaicons.net/iconspack-520/15534/ | License: CC Attribution-Noncommercial 3.0 

/*--- Create a proper unsafeWindow object on browsers where it doesn't exist
    (Chrome, mainly).
    Chrome now defines unsafeWindow, but does not give it the same access to
    a page's javascript that a properly unsafe, unsafeWindow has.
    This code remedies that.
*/
var bGreasemonkeyServiceDefined     = false;

try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}

var $ = unsafeWindow.jQuery;

$(unsafeWindow.document.body).append($("<style>").text("\
@media (min-width: 1400px) { .window-main-col { width: 88% } } \
@media (min-width: 1366px) { .window-main-col { width: 85% } } \
@media (min-width: 1000px) { .window-main-col { width: 80% } } \
@media (min-width: 1000px) { \
	.window{ width: 90%; } \
	.card-detail-item.card-detail-item-block > .card-detail-edit, .card-detail-item.card-detail-item-block > .current, .checklist-list { \
		-webkit-column-count: 2; \
		-webkit-column-rule-style: solid; \
		-webkit-column-gap: 20px; \
		-webkit-column-rule-width: 1px; \
		-webkit-column-width: 45%; \
	} \
	.checklist-list { margin-left: 38px } \
	.card-detail-item-header , .edit-controls { -webkit-column-span: all } \
	.markeddown strong { color: darkgrey !important; font-family: \"Source Code Pro\"; font-variant: small-caps !important; font-size: 14pt !important  } \
	.markeddown em { font-weight: 700; font-style: normal;  line-height: 2em;  } \
	.markeddown p > em:first-child, .markeddown p > br + em { padding-left: 2em; } \
	.markeddown p + ol { padding-left: 2.5em } \
	.js-open-card-cover-in-viewer { background-size: initial !important; background-position-y: initial; } \
	.list, .board-widgets { border-top: 10px solid transparent; } \
	.list:hover, .board-widgets:hover { border-top: 10px solid pink; cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVR42mNkgIK8vDzZ5OTkxtev37j/+fNb5O/fv7cuXbrUW1lZuYABD2CEajaKiYnd+ezZW64nT3/v4OMTvf7x43MhZqbXEZ8+vWusqKiYiNMAMzMzrpaW1mvXrr38Z2npPPfxk+8Hnj69f/fmjbOfBAS4ZVRVuQ43NjaqP3jw4ANWA5qampI5OQVniInbpbKycZ5buKD52s4di/+EhBQyJSTki/z7d2VXc3Nj++nTp1diNWDu3Lkz7t57b66nH5i0ZvWkK2tWT/xtaGjP3NA4R15EmFvj/fvz85qaGmtPnTo1G6sBvUDw+vVPE1lZ25CyMu8f7Oyc4j4+0WqWVvYa8vLi1o8fXQxsbm42f/LkyWmsBkRHR1sZG5vsmDx5lgcPjyCPo6OXuJGRpZi0jIgxD/f3oI6O9rMbN26MA6q9B8T/scYC0JBOJyfnuC9f/+1XkFdlEBTi0uTjZdX9/uM3c05uQcjZ00cfA5VdAeJv2AxgAmJjbW1t3ezs7AhWVla1y5cvv/jx48fn+Ph4l5vXbz/LyslIAPIPAdX9xOoCIFAHGcTOzn6Hm5ub+f3795xMTEzCJYkJu3TXb1Dc8vn75BW/vuXhTEhAwAzE0kAsBHURC9hARkaxWmbmWRLMLKJHmNkDF3z7uAmXATAA0swKZf8GYhkZBgb/Vk7OCR///v+4gYnZZN+Pr/fwGYANiDgzMPSncXPHPPjLcG72n9/Wd/78+kGKASBFUgVMTPuMOTjUbzKyzW7++iGNJANAQJCBwbRDT+8QS3IS+84zF2JXLV6wlCQDQMDb3TWXR06o4MblG4EXT1y8BBIDALb58xFHN3QNAAAAAElFTkSuQmCC') 8 8, pointer; } \
	.list-card, .maximised-activity .phenom { -webkit-column-break-inside : avoid; } \
	.maximised-list { min-width: 95%;  overflow-x: auto !important; } \
	.maximised-list .list { overflow-x: auto !important; } \
	.maximised-list .list-cards { -webkit-column-count: 5; overflow-x: visible !important; overflow-y: visible !important; } \
	.maximised-list .list-card { min-width: 100% } \
	.maximised-list .list-card-cover { background-size: initial !important; max-height: 50px; } \
	.maximised-activity {  width: 90% !important;  } \
	.maximised-activity .board-widget--activity, .maximised-activity .js-list-activity { -webkit-column-count: 6; } \
	.window-cover-stickers-only div.sticker { transform: scale(1, 1) } \
	.window-cover-stickers-only span.sticker-control-btn { transform: scale(1, 1) } \
} \
div.sticker { transform: scale(0.5, 0.5) } \
span.sticker-control-btn { transform: scale(2, 2) } \
span.sticker-control-btn.remove-btn { left: -125px !important; top: 66px !important; } \
span.sticker-control-btn.move-btn { left: -100px !important; top: 3px !important } \
span.sticker-control-btn.rotate-btn { top: -60px !important; } \
"));

var $document = $(unsafeWindow.document);

var handles = {
	imageTimeout: null,
	anchorTimeout: null
}

// Hovering over an open card cover for 500ms will trigger the preview
$document.on({
    mouseenter: function (e) {
        if( handles.imageTimeout != null ) clearTimeout(handles.imageTimeout);
        handles.imageTimeout = setTimeout(function(){ $(e.target).click(); handles.imageTimeout = null; }, 500);
    },
    mouseleave: function (e) {
        if( handles.imageTimeout != null ) clearTimeout(handles.imageTimeout);
        handles.imageTimeout = null;
    }
}, ".js-open-card-cover-in-viewer");

// Hovering over a card image attachment for 500ms will trigger the preview
$document.on({
    mouseenter: function(e) {
        if( handles.anchorTimeout != null ) clearTimeout(handles.anchorTimeout);
        handles.anchorTimeout = setTimeout(function(){ $(e.target).click(); handles.anchorTimeout = null; }, 500);
    },
    mouseleave: function(e) {
        if( handles.anchorTimeout != null ) clearTimeout(handles.anchorTimeout);
        handles.anchorTimeout = null;
    }
}, "a.attachment-thumbnail-preview");

// Clicking above a list title will expand/contract it
$document.on({ click: function(e){ 
    $(e.target).add($(e.target).find('.list-card')).toggleClass('maximised-list');
    var target = $(e.target);
    if( !target.hasClass('list') ) {
        target = target.parents('.list:eq(0)');
    }
    if( target.length ) {
        var $board = $(unsafeWindow.document.body).find('#board');
        $board.scrollLeft($board.scrollLeft() + target.position().left);
    }
} }, '.list');

// Clicking above the activity title will expand/contract it. When it expands it, it also requests
// more activity so that the user does not have to do it.
$document.on({ click: function(e){ 
    if( !$(e.target).hasClass('board-widgets') ) return;
    
    $(e.target).toggleClass('maximised-activity');
    
    if( !$(e.target).hasClass('maximised-activity') ) {
        $document.find('.board-sidebar-back-btn').click();
    }
    else {
        // We have to delay the click as the button is not yet ready
        setTimeout(function(){ $document.find('.show-more.js-view-all-activity-list').click(); }, 1000);
        // TODO: replace the BACK and '>' buttons to do the right thing
    }
} }, '.board-widgets');

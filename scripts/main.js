var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var ARROW_BUTTONS = '[data-image-role="button"]';

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR)
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function getNextThumbnail(arrow, thumbnails) {
    var currentThumbnailTitle = document.querySelector(DETAIL_TITLE_SELECTOR).textContent;
    for (var i = 0; i < thumbnails.length; i++) {
        if (titleFromThumb(thumbnails[i]) == currentThumbnailTitle) {
            if (arrow == 'left') {
                if (i == 0) {
                    var nextThumbnail = thumbnails[thumbnails.length - 1];
                    setDetails(imageFromThumb(nextThumbnail), titleFromThumb(nextThumbnail));
                } else {
                    var nextThumbnail = thumbnails[i - 1];
                    setDetails(imageFromThumb(nextThumbnail), titleFromThumb(nextThumbnail));
                }
            } else {
                if (i == thumbnails.length - 1) {
                    var nextThumbnail = thumbnails[0];
                    setDetails(imageFromThumb(nextThumbnail), titleFromThumb(nextThumbnail));
                } else {
                    var nextThumbnail = thumbnails[i + 1];
                    setDetails(imageFromThumb(nextThumbnail), titleFromThumb(nextThumbnail));
                }
            }
            showDetails();
            break;
        }
    }
}

function arrowClickHandler() {
    'use strict';
    var arrows = document.querySelectorAll(ARROW_BUTTONS);
    var arrowArray = [].slice.call(arrows);
    var leftArrow = arrowArray[0];
    var rightArrow = arrowArray[1];
    var thumbnailArray = getThumbnailsArray();

    leftArrow.addEventListener('click', function (event) {
        event.preventDefault();
        getNextThumbnail("left", thumbnailArray);
    });

    rightArrow.addEventListener('click', function (event) {
        event.preventDefault();
        getNextThumbnail("right", thumbnailArray);
    });
}

function intializeEvents() {
    'use stict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    arrowClickHandler();
}

intializeEvents();
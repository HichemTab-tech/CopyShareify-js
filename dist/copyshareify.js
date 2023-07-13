(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CopyShareify-js"] = factory();
	else
		root["CopyShareify-js"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  CopyShareify: () => (/* reexport */ CopyShareify)
});

;// CONCATENATED MODULE: ./src/functions.js
// noinspection JSDeprecatedSymbols

function copyStringToClipboard(text, done, failed) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(function() {
                done();
            })
            .catch(function(error) {
                failed(error);
            });
    }
    else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        let textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            let successful = document.execCommand('copy');
            if (successful) {
                done();
            }
            else{
                failed();
            }
        } catch (error) {
            failed(error);
        }
        document.body.removeChild(textarea);
    } else {
        failed('Copy to clipboard is not supported in this browser.');
        console.error('Copy to clipboard is not supported in this browser.');
    }
}

function copyImageToClipboard(imgElement, done, failed) {
    if (isDefined(imgElement) && isDefined($(imgElement)) && $(imgElement).length !== 0 && isDefined($(imgElement)[0])) {
        let img = $(imgElement)[0];
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            canvas.toBlob(function (blob) {
                navigator.clipboard.write([
                    new ClipboardItem({'image/png': blob})
                ]).then(function () {
                    done();
                }).catch(function (error) {
                    failed(error);
                });
            });
        }
        else{
            failed('Copy image to clipboard is not supported in this browser.');
            console.error('Copy image to clipboard is not supported in this browser.');
        }
    }
    else{
        failed('Image element not found');
        console.error('Image element not found');
    }
}

function shareContent(title, text, url, done, failed) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        })
            .then(function() {
                done();
            })
            .catch(function(error) {
                failed(error);
            });
    } else {
        failed('Web Share API is not supported in this browser');
        console.warn('Web Share API is not supported in this browser');
    }
}

function shareImage(title, text, imgElement, done, failed) {

    if (navigator.share && isDefined(imgElement) && isDefined($(imgElement)) && isDefined($(imgElement)).attr('src')) {
        const src = $(imgElement).attr('src');
        fetch(src)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], 'image.png', { type: blob.type });

                navigator.share({
                    files: [file]
                })
                    .then(() => {
                        done();
                    })
                    .catch(error => {
                        failed(error);
                    });
            })
            .catch(error => {
                failed(error);
            });
    } else {
        console.warn('Web Share API or image element not supported in this browser');
        failed('Web Share API or image element not supported in this browser');
    }
}

let isDefined = (variable) => {
    return typeof variable !== 'undefined' && variable !== null;
}

function checkElement(ele) {
    if (typeof ele === 'undefined' || ele === null || ele.length === 0) {
        throw "element selector not correct/element not found";
    }
}
;// CONCATENATED MODULE: ./src/CopyShareify.js


const CopyShareify =  function(options) {
    let settings = $.extend(
        {
            action: null,
            string: null,
            htmlInputSelector: null,
            htmlElementSelector: null,
            htmlImgSelector: null,
            title: null,
            description: null,
            onActionDone : function () {},
            onActionFailed : function (error) {},
        },
        options
    );

    // Attach event listeners to each element
    $(this).each(function() {
        let $button = $(this);
        let settings_ = {};
        if (settings.action === null) {
            settings_.action = $(this).attr('data-action');
            if (isDefined($(this).attr('data-string'))) {
                settings_.string = $(this).attr('data-string');
            }
            else if (isDefined($(this).attr('data-html-input-selector'))) {
                settings_.htmlInputSelector = $(this).attr('data-html-input-selector');
            }
            else if (isDefined($(this).attr('data-html-element-selector'))) {
                settings_.htmlElementSelector = $(this).attr('data-html-element-selector');
            }
            else if (isDefined($(this).attr('data-html-img-selector'))) {
                settings_.htmlImgSelector = $(this).attr('data-html-img-selector');
            }
            if (isDefined($(this).attr('data-title'))) {
                settings_.title = $(this).attr('data-title');
            }
            if (isDefined($(this).attr('data-description'))) {
                settings_.description = $(this).attr('data-description');
            }
        }
        else{
            settings_ = settings;
        }

        $button.on('click', function() {
            let text;
            let targetType = 'string';
            if (isDefined(settings_.string)) {
                text = settings_.string;
            }
            else if (isDefined(settings_.htmlInputSelector)) {
                checkElement($(settings_.htmlInputSelector));
                text = $(settings_.htmlInputSelector).val();
            }
            else if (isDefined(settings_.htmlElementSelector)) {
                checkElement($(settings_.htmlElementSelector));
                text = $(settings_.htmlElementSelector).html();
            }
            else if (isDefined(settings_.htmlImgSelector)) {
                checkElement($(settings_.htmlImgSelector));
                text = $(settings_.htmlImgSelector);
                targetType = 'image';
            }
            let done = () => settings.onActionDone(settings_.action, $button);
            let failed = (error) => settings.onActionFailed(settings_.action, $button, error);
            if (settings_.action === 'copy') {
                if (targetType === 'image') {
                    copyImageToClipboard(
                        text,
                        done,
                        failed
                    );
                }
                else if (targetType === 'string') {
                    copyStringToClipboard(
                        text,
                        done,
                        failed
                    );
                }
            }
            else if (settings_.action === 'share') {
                if (targetType === 'string') {
                    shareContent(
                        settings_.title,
                        settings_.description,
                        text,
                        done,
                        failed
                    );
                }
                else if (targetType === 'image') {
                    shareImage(
                        settings_.title,
                        settings_.description,
                        text,
                        done,
                        failed
                    );
                }
            }
        });
    });
    return this;
};
;// CONCATENATED MODULE: ./src/index.js

(function($) {
    $.fn.CopyShareify = CopyShareify;
})(jQuery);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
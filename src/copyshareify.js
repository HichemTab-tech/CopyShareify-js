import {
    checkElement,
    copyImageToClipboard,
    copyStringToClipboard,
    isDefined,
    shareContent,
    shareImage
} from "./functions";

export const CopyShareify =  function(options) {
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
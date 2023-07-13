// noinspection JSDeprecatedSymbols

export function copyStringToClipboard(text, done, failed) {
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

export function copyImageToClipboard(imgElement, done, failed) {
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

export function shareContent(title, text, url, done, failed) {
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

export function shareImage(title, text, imgElement, done, failed) {

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

export let isDefined = (variable) => {
    return typeof variable !== 'undefined' && variable !== null;
}

export function checkElement(ele) {
    if (typeof ele === 'undefined' || ele === null || ele.length === 0) {
        throw "element selector not correct/element not found";
    }
}
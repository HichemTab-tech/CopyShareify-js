# CopyShareify-js

**CopyShareify-js**  is a versatile JavaScript library that enhances buttons with customizable actions. With CopyShareify-js, you can effortlessly transform ordinary buttons into powerful tools that enable various actions, including copying content, sharing on social media platforms, and more.
## Features

- Seamlessly integrate copy and share functionality into buttons on your web pages
- Copy strings, HTML elements, and even images to the clipboard
- Customize the action behavior based on your specific requirements
- Easy way to integrate without manually add the events.


## Installation

### npm
You can install CopyShareify-js via npm:
```bash
  npm install copyshareify-js
```


### CDN
You can also include CopyShareify-js directly from a CDN by adding the following script tag to your HTML file:

```HTML
  <script src="https://cdn.jsdelivr.net/gh/HichemTab-tech/CopyShareify-js@1.0.2/dist/copyshareify.min.js"></script>
```

### Local Download
If you prefer to host the library locally, you can download the latest release from the source code and include it in your project:

```HTML
<script src="path/to/copyshareify.min.js"></script>
```
## Usage

### HTML Attribute Method
To use CopyShareify-js with HTML attributes, include the necessary dependencies (e.g., jQuery) and the CopyShareify-js script in your HTML file. Use the data-action attribute to specify the action, and other data attributes to configure the options.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Your Page Title</title>
    <!-- Include the necessary dependencies -->
    <script src="path/to/jquery.js"></script>
    <script src="path/to/copyshareify.js"></script>
  </head>
  <body>
    <!-- Your HTML content here -->
    <button data-action="copy" data-string="Hello, world!">Copy Text</button>
    <button data-action="share" data-title="My Page" data-description="Check out this amazing website!" data-string="https://www.example.com">Share Link</button>

    <script>
      // Initialize CopyShareify on the buttons
      $('[data-action]').CopyShareify();
    </script>
  </body>
</html>
```

### Individual Element Method
Alternatively, you can trigger CopyShareify on individual elements by passing an options object:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Your Page Title</title>
    <!-- Include the necessary dependencies -->
    <script src="path/to/jquery.js"></script>
    <script src="path/to/copyshareify.js"></script>
  </head>
  <body>
    <!-- Your HTML content here -->
    <button id="copyButton">Copy Text</button>
    <button id="shareButton">Share Link</button>

    <script>
      // Initialize CopyShareify on the buttons individually
      $('#copyButton').CopyShareify({
        action: 'copy',
        string: 'Hello, world!',
      });

      $('#shareButton').CopyShareify({
        action: 'share',
        title: 'My Page',
        description: 'Check out this amazing website!',
        string: 'https://www.example.com',
      });
    </script>
  </body>
</html>

```

### Selecting the Text
CopyShareify-js provides multiple ways to select the text to be copied or shared:

- **String**: You can directly specify a string value to be copied or shared.
- **HTML Input Selector**: You can select the text from an - HTML input element by providing the input selector.
- **HTML Element Selector**: You can select the text from an HTML element by providing the element selector.
- **HTML Image Selector**: You can select an image to be copied or shared by providing the image selector.

Here's an example of how to use CopyShareify-js with different selection options:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Your Page Title</title>
    <!-- Include the necessary dependencies -->
    <script src="path/to/jquery.js"></script>
    <script src="path/to/copyshareify.js"></script>
  </head>
  <body>
    <!-- Your HTML content here -->
    <button data-action="copy" data-string="Hello, world!">Copy Text</button>
    <button data-action="share" data-title="My Page" data-description="Check out this amazing website!" data-string="https://www.example.com">Share Link</button>

    <input type="text" id="inputText" value="This is an input value">
    <p id="paragraph">This is a paragraph text</p>
    <img id="image" src="path/to/image.jpg" alt="Image">

    <button data-action="copy" data-html-input-selector="#inputText">Copy Input Text</button>
    <button data-action="copy" data-html-element-selector="#paragraph">Copy Paragraph Text</button>
    <button data-action="copy" data-html-img-selector="#image">Copy Image</button>

    <script>
      // Initialize CopyShareify on the buttons
      $('[data-action]').CopyShareify();
    </script>
  </body>
</html>

```
## Options
| Key                   | Description                                                                        |
|-----------------------|------------------------------------------------------------------------------------|
| `action`              | Specifies the action to be performed (e.g., "copy" or "share").                    |
| `string`              | The string value to be copied or shared.                                           |
| `htmlInputSelector`   | The selector of the HTML input element from which the text will be copied.         |
| `htmlElementSelector` | The selector of the HTML element from which the text will be copied.               |
| `htmlImgSelector`     | The selector of the HTML image element to be copied.                               |
| `title`               | The title or subject of the content to be shared.                                  |
| `description`         | The description or additional information about the content to be shared.          |
| `onActionDone`        | The callback function to be executed when the action is successfully performed.    |
| `onActionFailed`      | The callback function to be executed when the action fails or encounters an error. |


## Demo

Here's a Demo example : 

[Demo](https://hichemtab-tech.github.io/CopyShareify-js/)

## Contributing

Contributions are always welcome!

If you have any ideas, improvements, or bug fixes, please open an issue or submit a pull request.


## Authors

- [@HichemTab-tech](https://www.github.com/HichemTab-tech)

## License

[MIT](https://github.com/HichemTab-tech/CopyShareify-js/blob/master/LICENSE)

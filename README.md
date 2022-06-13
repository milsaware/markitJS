# MarkitJS

Check out the [CodePen demo](https://codepen.io/ozboware/full/qBxLqMp) to see MarkitJS in action

## How to use

Simply download the files, unzip and place ```markit.min.js``` in your Javascript directory. In your HTML, include the script at the end of your ```body``` tag, but before your main Javascript file. For instance

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Markdown Previewer</title>
	<meta name="description" content="Markdown Previewer"/>
	<meta name="author" content="ozboware">
	<link rel="stylesheet" href="./assets/css/style.css"/>
</head>

<body>
	//...body content..//
	<script src="./assets/js/markit.min.js"></script>
	<script src="./assets/js/app.js"></script>
</body>
```
In your body content, place either a ```textarea``` or text input with a unique id ...

```html
<textarea id="text-test"></textarea>
```
Then, in your main Javascript file, you can convert the text in just 1 line of code

```javascript
let convertedString = convertMarkdown('text-test');
```

## Example

You can download and view the raw example on Github by [clicking here](https://github.com/ozboware/freeCodeCamp/tree/ozboware/Front%20End%20Development%20Libraries/Markdown%20Previewer)

## Known issues

- Currently can't add more than 1 link per line
- The lists conversion needs working on to only include intended list items

## Syntax currently available

**bold**, _italic_, **_bold italic_**, ~~strikethrough~~

> blockQuote text!

**lists**
- list item 1.
- list item 1.2.
- list item 1.3.
- list item 1.4.

**image**

![ozboware logo](https://profile-assets.showwcase.com/1639787918604.jpg)

**codeblock**
```
// multi-line code:
function anotherExample(firstLine, lastLine){
    if (firstLine == '```' && lastLine == '```') {
      return multiLineCode;
    }
}
```

inline code `<div></div>`

[links](https://ozboware.co.uk)

# H1
## H2
### H3
#### H4
##### H5
###### H6

## License

Copyright (c) 2022, Ozboware. (MIT License)

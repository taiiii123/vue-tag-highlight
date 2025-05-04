<div align="right" style="font-size: 20px;">

**English** | [日本語](./README.ja.md)

</div>

# **Vue Tag Highlight** - VS Code Extension

**Vue Tag Highlight** is a Visual Studio Code extension that highlights and adds color to `<script>`, `<template>`, and `<style>` tags in Vue files. It helps improve the readability and structure of your Vue components by visually distinguishing the different sections of the code.

## Features

- Highlights `<script>`, `<template>`, and `<style>` tags with customizable background colors.
- Display highlights in the text editor as well as in the scrollbar.

For example, they will be highlighted as follows:

![feature](https://github.com/user-attachments/assets/813f5670-1012-4d5c-9d02-9205fac6045d)

## Configuration

You can customize the background colors of the tags by modifying the settings in `settings.json`.

### Available Configuration Settings

- `vue-tag-highlight.color.script`: Change the background color of the `<script>` tag (default: `rgba(240, 216, 29, 0.2)`).
- `vue-tag-highlight.color.template`: Change the background color of the `<template>` tag (default: `rgba(21, 191, 134, 0.2)`).
- `vue-tag-highlight.color.style`: Change the background color of the `<style>` tag (default: `rgba(41, 101, 241, 0.2)`).
- `vue-tag-highlight.isShowOnTextEditor`: Enable or disable the highlight in the text editor (default: `true`).
- `vue-tag-highlight.isShowOnScrollbar`: Enable or disable the highlight in the scrollbar (default: `true`).

Here is an example of the `settings.json` configuration:

```json
// settings.json
"vue-tag-highlight.color.script": "rgba(255, 255, 255, 0.2)",
"vue-tag-highlight.color.template": "rgba(0, 0, 255, 0.2)",
"vue-tag-highlight.color.style": "rgba(255, 0, 0, 0.2)",
"vue-tag-highlight.isShowOnTextEditor": true,
"vue-tag-highlight.isShowOnScrollbar": true
```

## Activating the Extension

This extension is automatically activated for `.vue` files.

# License
[MIT](./LICENSE)

---

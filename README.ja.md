<div align="right" style="font-size: 20px;">

[English](./README.md) | **日本語**

</div>

# **Vue Tag Highlight** - VS Code 拡張機能

**Vue Tag Highlight** は、Vueファイル内の`<script>`、`<template>`、および `<style>` タグにハイライト表示させるVisual Studio Code拡張機能です。これにより、Vueコンポーネントの可読性と構造が向上し、コードの異なるセクションを視覚的に区別できます。

## 機能

- `<script>`、`<template>`、および `<style>` タグをカスタマイズ可能な背景色でハイライトします。
- テキストエディタ内およびスクロールバーにハイライトを表示します。

例えば、次のようにハイライトされます。

![feature](https://github.com/user-attachments/assets/813f5670-1012-4d5c-9d02-9205fac6045d)

## 設定

タグの背景色は `settings.json` の設定を変更することでカスタマイズできます。

### 設定可能な設定項目

- `vue-tag-highlight.color.script`: `<script>` タグの背景色を変更します（デフォルト: `rgba(240, 216, 29, 0.2)`）。
- `vue-tag-highlight.color.template`: `<template>` タグの背景色を変更します（デフォルト: `rgba(21, 191, 134, 0.2)`）。
- `vue-tag-highlight.color.style`: `<style>` タグの背景色を変更します（デフォルト: `rgba(41, 101, 241, 0.2)`）。
- `vue-tag-highlight.isShowOnTextEditor`: テキストエディタ内でのハイライトの表示を有効または無効にします（デフォルト: `true`）。
- `vue-tag-highlight.isShowOnScrollbar`: スクロールバーでのハイライトの表示を有効または無効にします（デフォルト: `true`）。

`settings.json` の設定例は以下の通りです：

```json
// settings.json
"vue-tag-highlight.color.script": "rgba(255, 255, 255, 0.2)",
"vue-tag-highlight.color.template": "rgba(0, 0, 255, 0.2)",
"vue-tag-highlight.color.style": "rgba(255, 0, 0, 0.2)",
"vue-tag-highlight.isShowOnTextEditor": true,
"vue-tag-highlight.isShowOnScrollbar": true
```

## 拡張機能の有効化
この拡張機能は`.vue`ファイルで自動的に有効化されます。

# License
[MIT](./LICENSE)

---

# vitepress-plugin-codeblocks-fold

[![npm](https://img.shields.io/npm/v/vitepress-plugin-codeblocks-fold?color=green)](https://www.npmjs.com/package/vitepress-plugin-codeblocks-fold)

> This plugin may not be compatible with some vitepress versions. 
> If the functionality is not working properly, please use stable version 1.1.0

English | [简体中文](README_zh.md)

![](./demo.webp)

> Add collapse to vitepress codeblocks

## Install

```shell
// npm 
npm i vitepress-plugin-codeblocks-fold
// yarn
yarn add vitepress-plugin-codeblocks-fold
```

## Use

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'; // import method
import 'vitepress-plugin-codeblocks-fold/style/index.scss'; // import style

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // ...
    },
    setup() {
        // get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();
        // basic use
        codeblocksFold({ route, frontmatter }, true, 400);
    }
};
```

`codeblocksFold()` takes three parameters：

- vitepressObj

  This is an object, there must be two values in the object: `route` and `frontmatter`。

- defaultAllFold

  Whether the codeblocks of all pages are set to the collapsed state by default，default `true`; Set to 'false' to not fold by default. can be ignored.

- height

  The height of the codeblocks after being folded, default `400`(unit`px`). can be ignored.

## Extended use

You can set frontmatter to a single .md file

```md
---
cbf: [1,2,3]
---
```

The meaning of this array is:

- When 'defaultAllFold' is set to 'true' (that is all pages are folded by default),
  the first、second and third code blocks of the current page are forcibly not folded
- When 'defaultAllFold' is set to 'false' (that is all pages are not folded by default),
  the first、second and third code blocks of the current page are forcibly folded

`cbf` also has two parameters: `true` and `false`

- `true` means that all code blocks on the current page are folded
- `false` means that all code blocks on the current page are not folded

## more vitepress plugins

You may be interested in these plugins：
[Click me to view more vitepress plugins](https://github.com/T-miracle/vitepress-plugins)


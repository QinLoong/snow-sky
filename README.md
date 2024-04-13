# snow-sky

![示例图片](./docs/public/snowflake.png)

###  snow-sky

Snow-Sky 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。


# 快速开始

## 安装组件库

````shell
npm i @qinloong/snow-sky --save
````

## 用法

#### 全局使用

```` javascript
// 引入所有组件
import snowsky from '@qinloong/snow-sky'
// 引入样式
import '@qinloong/snow-sky/dist/style.css'

import App from './App.vue'
// 全局使用
createApp(App).use(snowsky).mount('#app')
````

```` vue
<template>
  <SnowButton>我是 Button</SnowButton>
</template>
````


#### 单个导入

Snow-Sky 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```` vue
<template>
  <Button>我是 Button</Button>
</template>
<script>
  import { Button } from '@qinloong/snow-sky'
  export default {
    components: { Button },
  }
</script>
````

## 📃 文档地址

<https://qinloong.github.io/snow-sky/>

## ✨ 亮点

* 亮点1 🎉：“新”，使用最新最全技术：Vue3 + Typescript4， Vite，Vitest， Vitepress，Vue-test-utils2，Rollup, Postcss。
* 亮点2 🌹：单元测试，被常年忽略但是非常重要的内容，使用最新的 Vitest，Vue-test-utils2 完成单元测试。
* 亮点3 🔥: 包括Message - Select - Form 这种高难度高复杂组件等多个常用组件

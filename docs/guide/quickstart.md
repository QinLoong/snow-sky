# 快速开始

本节将介绍如何在项目中使用 Snow-Sky

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

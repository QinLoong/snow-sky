---
title: Tooltip | V-Element
description: Tooltip 组件的文档
---


# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。



## 基础用法

使用 `content` 属性来决定 hover 时的提示信息

<preview path="../demo/Tooltip/Basic.vue" title="基础Tooltip" description="Tooltip 基础用例"></preview>


## 不同位置

由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。

<preview path="../demo/Tooltip/Placement.vue" title="触发方式Tooltip" description="Tooltip 触发方式"></preview>


## 触发方式

由 trigger 属性决定触发方式： `hover` | `click`, 默认为 hover

<preview path="../demo/Tooltip/Trigger.vue" title="触发方式Tooltip" description="Tooltip 触发方式"></preview>



## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 slot content，替代tooltip中的content属性。


<preview path="../demo/Tooltip/Custom.vue" title="更多内容的文字提示" description="Tooltip 更多内容的文字提示"></preview>



## 手动触发

将 `manual` 属性设置为 true 即可， 然后可以使用实例上面的 `show` 和 `hide` 方法打开关闭下拉菜单。


<preview path="../demo/Tooltip/Manual.vue" title="更多内容的文字提示" description="Tooltip 更多内容的文字提示"></preview>
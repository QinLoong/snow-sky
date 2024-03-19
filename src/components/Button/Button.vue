
<template>
  <button
  ref="_ref"
  class="vk-button"
  :class="{
    [`vk-button--${type}`]:type,
    [`vk-button--${size}`]: size,
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading': loading
  }"
  :disabled="disabled || loading"
  :autofocus="autofocus"
  :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading"></Icon>
  <Icon :icon="icon" v-if="icon"></Icon>
  <span>
    <slot/>
  </span>
  </button>
</template>

<script setup lang="ts" name="VkButton">
import Icon from '../Icon/icon.vue'
import { ref } from 'vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'VkButton'
})
withDefaults(defineProps<ButtonProps>(),{
  nativeType:'button'
})
const _ref =ref<HTMLButtonElement>()
// console.log(_ref);

defineExpose({
  ref: _ref
})
</script>


<style>
 .vk-button {
  --main-bg-color: red;
  background-color: var(--main-bg-color);
 }
</style>

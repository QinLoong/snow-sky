
<template>
  <button
  ref="_ref"
  class="snow-button"
  :class="{
    [`snow-button--${type}`]:type,
    [`snow-button--${size}`]: size,
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

<script setup lang="ts" name="SnowButton">
import Icon from '../Icon/Icon.vue'
import { ref } from 'vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SnowButton'
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
 .snow-button {
  --main-bg-color: red;
  background-color: var(--main-bg-color);
 }
</style>

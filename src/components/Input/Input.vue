<template>
  <div
    class="snow-input"
    :class="{
      [`snow-input--${type}`]: type,
      [`snow-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="snow-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="snow-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="snow-input__prefix">
            <slot name="prefix" />
        </span>
        <input
          class="snow-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          ref="inputRef"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="snow-input__suffix" @click="keepFocus">
            <slot name="suffix" />
            <Icon 
              icon="circle-xmark"
              v-if="showClear"
              class="snow-input__clear"
              @click="clear"
              @mousedown.prevent="NOOP"
            />
            <Icon 
              icon="eye"
              v-if="showPasswordArea && passwordVisible"
              class="snow-input__password"
              @click="togglePasswordVisible"
            />
            <Icon 
              icon="eye-slash"
              v-if="showPasswordArea && !passwordVisible"
              class="snow-input__password"
              @click="togglePasswordVisible"
            />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="snow-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="snow-textarea__wrapper"
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
  </template>
  <script setup lang="ts">
  import { ref, watch, computed, useAttrs, nextTick, inject } from 'vue'
  import type { Ref } from 'vue'
  import type { InputProps, InputEmits } from './types'
  import Icon from '../Icon/Icon.vue'
  import { formItemContextKey } from '../Form/types'
  
  defineOptions({
    name: 'SnowInput',
    inheritAttrs: false
  })
  const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
  const emits = defineEmits<InputEmits>()
  const attrs = useAttrs()
  const innerValue = ref(props.modelValue)
  const isFocus = ref(false)
  const passwordVisible = ref(false)
  const inputRef = ref() as Ref<HTMLInputElement>
  const formItemContext = inject(formItemContextKey)
  const runValidation = (trigger?: string) => {
    formItemContext?.validate(trigger)
  }
  const showClear = computed(() => 
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
  )
  const showPasswordArea = computed(() => 
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
  )
  const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
  }
  /**只是一个占位符，空函数，为了阻止blur事件的默认行为，而导致handleBlur中isFocus.value 变为 false，使得showClear为false,进而导致clear事件无法成功调用*/
  const NOOP = () => {}
  const keepFocus = async () => {
    await nextTick()
    inputRef.value.focus()
  }
  const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
    runValidation('input')
  }
  const handleChange = () => {
    emits('change', innerValue.value)
    runValidation('change')
  }
  const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
  }
  const handleBlur = (event: FocusEvent) => {
    console.log('blur triggered')
    isFocus.value = false
    emits('blur', event)
    runValidation('blur')
  }
  const clear = () => {
    console.log('clear triggered')
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
  }
  watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
  })
  defineExpose({
    ref: inputRef
  })
  </script>
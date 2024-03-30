<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepand,
      'is-append': $slots.appand,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.surfix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type != 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="vk-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.surfix || showClear || showPasswordArea"
          class="vk-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="vk-input__clear"
            @click="clear"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="vk-input__password"
            @click="clear"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="vk-input__password"
            @click="clear"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="vk-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      </textarea>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
import { emit } from "process";
defineOptions({
  name: "VkInput",
});
const props = withDefaults(defineProps<InputProps>(), { type: "text" });
const emits = defineEmits<InputEmits>();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
/**用于标识现在是密码隐藏还是显示*/
const passwordVisible = ref(false);
/**判断什么时候出现clear图标*/
const showClear = computed(
  () =>
    props.clearabled && !props.disabled && !!innerValue.value && isFocus.value
);
/**什么时候显示密码区域*/
const showPasswordArea = computed(
  () => props.clearabled && !props.disabled && !!innerValue.value
);
const handleFocus = () => {
  isFocus.value = true;
};

const handleBlur = () => {
  isFocus.value = false;
};

const handleInput = () => {
  emits("update:modelValue", innerValue.value);
};

const clear = () => {
  innerValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("input",'')
  emits("change",'')
};
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>
<style scoped></style>

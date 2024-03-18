<template>
  <div
    class="vk-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="vk-collapse-item__header"
      :id="`item-header-${name}`"
      @click="handleClick"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
    <div class="vk-collapse-item__wrapper" v-show="isActive">
      <div class="vk-collapse-item__content" :id="`item-content-${name}`">
        <slot/>
      </div>
    </div>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { CollapseItemProps, collapseContextKey } from "./types";
import { inject, computed } from "vue";
defineOptions({
  name: "VkCollapseItem",
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name);
};

const transitionEvents: Record<string,(el:HTMLElement) => void> ={
  beforeEnter(el){
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el){
   el.style.height= `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) { 
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<style scoped>
.vk-collapse-item__header {
  font-size: 30px;
}
</style>

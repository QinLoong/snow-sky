<template>
    <div 
    class="vk-switch"
    :class="{
       [`vk-switch--${size}`]: size,
       'is-disabled': disabled,
       'is-checked': checked 
    }"
    >
      <input 
        class="vk-switch__input"
        type="checkbox"
        role="switch"
        :name="name"
        :disabled="disabled"
      >
      <div class="vk-switch__core">
        <div class="vk-switch__core-action"></div>
      </div>
    </div>
             
 </template>
<script setup lang='ts'>
    import type { SwitchProps,SwitchEmits}  from './types' 
    import { ref,computed } from 'vue';
    defineOptions({
        name: 'SnowSwitch',
        inheritAttrs: false
    })     
    const props = defineProps<SwitchProps>()
    const emits = defineEmits<SwitchEmits>()
    const innerValue = ref(props.modelValue)
    /**当前组件是否被选中*/
    const checked  = computed(()=> innerValue.value) 

</script>
<style scoped>
             
</style>
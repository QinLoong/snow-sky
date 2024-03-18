
<template>
<div
class="vk-collapse-item"
:class="{
    'is-disabled':disabled
}"
>
<div class="vk-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
    <slot name="title">{{ title }}</slot>
    
</div>
<div class="vk-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
    <slot></slot>
</div>
</div>
</template>


<script setup lang="ts">
import { CollapseItemProps,collapseContextKey } from './types';
import { inject,computed } from 'vue';
defineOptions({
    name:'VkCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const  collapseContext = inject(collapseContextKey)
const isActive = computed(()=> collapseContext?.activeNames.value.indexOf(props.name))
const handleClick = ()=>{
    if(props.disabled){ return}
    collapseContext?.handleItemClick(props.name)
}
</script>

<style scoped>
.vk-collapse-item__header{
    font-size: 30px;
}
</style>
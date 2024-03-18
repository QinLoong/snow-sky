<template>
    <div
    class="vk-collaspe"
    >
    <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref,provide } from 'vue';
import { NameType,collapseContextKey } from './types';
defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name:'VkCollaspe'
})

const activeNames = ref<NameType[]>([])
const handleItemClick = (item: NameType) =>{
   const index = activeNames.value.indexOf(item)
   if(index > -1){
    activeNames.value.splice(index,1)
   }else{
    activeNames.value.push(item)
   }
}

provide(collapseContextKey,{
    activeNames,
  handleItemClick
})
</script>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div
    class="vk-messsage"
    role="alert"
    >
   </div>        
 </template>
<script setup lang='ts'>
   import type { MessageOptions } from 'child_process';    
const props = withDefaults(defineProps<MessageOptions>(),{
    type:'info',
    duration:3000
})      
</script>
<style scoped>
             
</style>
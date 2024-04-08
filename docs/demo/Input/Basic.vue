<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon/Icon.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="基础文本框，请输入">
    <template #append>
      <Icon icon="search" />
    </template>
 </Input>
  <span>{{test}}</span>
</template>
<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'
const test = ref('1')
const options2 = [
  { label: 'Option1', value: '1' },
  { label: 'Option2', value: '2' },
  { label: 'Option3', value: '3' },
  { label: 'Option4', value: '4', disabled: true }
]
</script>
<template>
  <Select v-model="test" placeholder="基础选择器，请选择" :options="options2"/>
  <span>您选择的是：{{test}}</span>
</template>
<script setup>
import { ref } from 'vue'
import Input from '@/components/Input/Input.vue'
import Icon from '@/components/Icon/Icon.vue'
const test = ref('')
</script>
<template>
  <div class="size-holder">
    <Input v-model="test" placeholder="大的 Input" size="large">
      <template #suffix>
      <Icon icon="search" />
    </template>
    </Input>
    <Input v-model="test" placeholder="普通的 Input">
      <template #suffix>
      <Icon icon="search" />
    </template>
    </Input>
    <Input v-model="test" placeholder="小的 Input" size="small">
      <template #suffix>
      <Icon icon="search" />
    </template>
    </Input>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
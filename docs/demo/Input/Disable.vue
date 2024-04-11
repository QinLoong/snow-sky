<script setup>
import { ref } from "vue";
import Input from "@/components/Input/Input.vue";
import Icon from '@/components/Icon/Icon.vue'
const test = ref("some text");
</script>
<template>
  <Input v-model="test" disabled>
    <template #prefix>
      <Icon icon="search" />
    </template>
  </Input>
</template>

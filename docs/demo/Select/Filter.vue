<script setup>
import { ref } from "vue";
import Select from "@/components/Select/Select.vue";
const test = ref("");
const options2 = [
  { label: "Option1", value: "1" },
  { label: "Option2", value: "2" },
  { label: "Option3", value: "3" },
  { label: "Option4", value: "4", disabled: true },
];
</script>
<template>
  <Select
    v-model="test"
    placeholder="可以过滤的选择器，请输入"
    :options="options2"
    filterable
  />
</template>

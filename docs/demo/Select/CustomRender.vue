<script setup>
import { ref, h } from "vue";
import Select from "@/components/Select/Select.vue";
const test = ref("");
const options2 = [
  { label: "Option1", value: "1" },
  { label: "Option2", value: "2" },
  { label: "Option3", value: "3" },
  { label: "Option4", value: "4", disabled: true },
];
const customRender = (option) => {
  return h("div", { className: "xyz" }, [
    h("b", option.label),
    h("span", option.value),
  ]);
};
</script>
<template>
  <Select
    v-model="test"
    placeholder="自定义模板选择器，请选择"
    :options="options2"
    :renderLabel="customRender"
  />
</template>
<style>
.vk-select__menu-item,
.xyz {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>

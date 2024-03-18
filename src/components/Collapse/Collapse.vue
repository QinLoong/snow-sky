<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, provide ,watch} from "vue";
import {
  NameType,
  collapseContextKey,
  CollapseProps,
  CollaspeEmits,
} from "./types";
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "VkCollaspe",
});
const props = defineProps<CollapseProps>();
const emit = defineEmits<CollaspeEmits>();
watch(()=> props.modelValue,()=>{
    activeNames.value= props.modelValue
})


const activeNames = ref<NameType[]>(props.modelValue);
if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one acitve item");
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value[0] = activeNames.value[0] === item ? '' : item ;
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
    emit("update:modelValue", activeNames.value);
    emit("change", activeNames.value);
  }
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

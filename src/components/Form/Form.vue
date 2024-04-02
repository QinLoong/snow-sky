<template>
  <form class="snow-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import {provide} from 'vue'
import { FormProps,formContextKey } from "./types";
defineOptions({
  name: "SnowFrom",
});
const props = defineProps<FormProps>();
provide(formContextKey,props)
</script> 
<style scoped></style>

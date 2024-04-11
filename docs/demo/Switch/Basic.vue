<script setup>
import { ref } from "vue";
import Switch from "@/components/Switch/Switch.vue";
const test = ref(true);
const test2 = ref(true);
</script>
<template>
  <div class="switch-size-container">
    <Switch v-model="test" />
    <Switch v-model="test2" :onColor="'#13ce66'" :offColor="'#ff4949'" />
  </div>
</template>
<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  .snow-switch {
    margin-right: 10px;
  }
}
</style>

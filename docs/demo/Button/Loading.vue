<script setup>
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="loading block">
  <Button loading> Loading... </Button>
  <Button loading type="primary"> Loading... </Button>
  <Button loading type="success"> Loading... </Button>
  <Button loading type="danger"> Loading... </Button>
  <Button loading type="info"> Loading... </Button>
</div>
</template>
<script setup>
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="icon block">
  <Button icon="star"> Star Button </Button>
  <Button icon="search" type="primary"> Search Button </Button>
  <Button icon="plane" type="success"> Plane Button </Button>
  <Button icon="rocket" type="primary"> Rocket Button </Button>
</div>
<div class="icon block">
  <Button icon="gear"  round></Button>
  <Button icon="search" type="primary" round></Button>
  <Button icon="plane" type="success" round></Button>
  <Button icon="rocket" type="warning" round></Button>
  <Button icon="trash" type="danger" round></Button>
</div>
</template>
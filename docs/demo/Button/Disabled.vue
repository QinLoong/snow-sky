<script setup>
import Icon from '@/components/Icon/Icon.vue'
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="disabled block">
  <Button disabled> hello </Button>
  <Button type="primary" disabled> Primary </Button>
  <Button type="success" disabled> Success </Button>
  <Button type="warning" disabled> Warning </Button>
  <Button type="danger" disabled> Danger </Button>
  <Button type="info" disabled> Info </Button>
</div>

<div class="disabled-plain block">
  <Button plain disabled> hello </Button>
  <Button type="primary" plain disabled> Primary </Button>
  <Button type="success" plain disabled> Success </Button>
  <Button type="warning" plain disabled> Warning </Button>
  <Button type="danger" plain disabled> Danger </Button>
  <Button type="info" plain disabled> Info </Button>
</div>

<div class="disabled-plain round block">
  <Button round disabled> hello </Button>
  <Button type="primary" round disabled> Primary </Button>
  <Button type="success" round disabled> Success </Button>
  <Button type="warning" round disabled> Warning </Button>
  <Button type="danger" round disabled> Danger </Button>
  <Button type="info" round disabled> Info </Button>
</div>

<div class="disabled-plain circle block">
  <Button circle> <Icon icon="star" /> </Button>
  <Button type="primary" circle disabled>   <Icon icon="star" /> </Button>
  <Button type="success" circle disabled> <Icon icon="star" /> </Button>
  <Button type="warning" circle disabled> <Icon icon="star" /> </Button>
  <Button type="danger" circle disabled> <Icon icon="star" /> </Button>
  <Button type="info" circle disabled> <Icon icon="star" /> </Button>
</div>
</template>
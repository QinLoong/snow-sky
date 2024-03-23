<script setup lang="ts">
import { createPopper, right } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import Tooltip from'./components/Tooltips/Tooltip.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import type { ButtonInstance } from './components/Button/types';
import { ref ,onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

let popperInstance : Instance | null = null

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['a'])
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
onMounted(()=>{
  
  if(buttonRef.value){
    console.log('buttonRef',buttonRef.value.ref);
  }
 if(overlayNode.value&& triggerNode.value){
  popperInstance =  createPopper(triggerNode.value,overlayNode.value,{
    placement:right
  })
 }
  

  setTimeout(()=>{
    popperInstance?.setOptions({placement:'bottom'})
  },2000)
})
</script>

<template>
  <header>
    <Tooltip trigger="hover" placement="right">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" ref="triggerNode"/>
    <template #content>
      <div>
        sadaffsa
      </div>
    </template>
    </Tooltip>
  </header>
  <Icon icon="arrow-up" size="2xl"  type="danger" color="#0e7a0d" />
  <main>
    <Button ref="buttonRef" >Test Button</Button>
    <Button plain >Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button type="warning" size="large">Large</Button>
    <Button type="success"  size="small">Small</Button><br/><br/>
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br/><br/>    





    <Collapse v-model="openedValue" accordion>
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
      {{ openedValue }}
    </Collapse>

  </main>

 
  <a href="#">the link</a>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.snow-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

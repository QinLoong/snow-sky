<script setup lang="ts">
import { createPopper, right } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import Tooltip from'./components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import {createMessage} from './components/Message/method'
import { MenuOption } from './components/Dropdown/types';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import type { ButtonInstance } from './components/Button/types';
import { ref ,onMounted,h,reactive} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { log } from 'console';

let popperInstance : Instance | null = null
let val1 = reactive([{a:1,b:2}])
// console.log(val1);

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['a'])
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const options : MenuOption[] = [
{ key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const inlineConsole= (...arg: any) =>{
 console.log(arg);
 
}
function useVal1(){
  val1.push({a:5,b:6})
 console.log(val1);
 
}

setTimeout(()=>{
  val1.push({a:300,b:400})
},10000)
onMounted(()=>{
  // useVal1()
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello world three', duration: 0, type: 'danger', showClose: true })
  
  if(buttonRef.value){
    // console.log('buttonRef',buttonRef.value.ref);
  }
 if(overlayNode.value&& triggerNode.value){
  popperInstance =  createPopper(triggerNode.value,overlayNode.value,{
    placement:right
  })
 }
  
// watch(()=>val1)
  setTimeout(()=>{
    popperInstance?.setOptions({placement:'bottom'})
  },2000)
})
</script>

<template>
  <div>{{ val1 }}</div>
  <header>
    <Dropdown 
    trigger="click" 
    placement="right" 
    :menu-options="options"
    >
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <!-- <div style="width: 100;height: 50;background-color: #bfa;">移动这里会有惊喜 </div> -->
 
    </Dropdown>
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
./components/Tooltip/Tooltip.vue
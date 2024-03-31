<template>
    <div
      class="snow-select"
      :class="{'is-disabled': disabled }"
      @click="toggleDropdown"
      @mouseenter="states.mouseHover = true"
      @mouseleave="states.mouseHover = false"
    >
      <Tooltip
        placement="bottom-start"
        ref="tooltipRef"
        :popperOptions="popperOptions"
        @click-outside="controlDropdown(false)"
        manual
      >
        <Input 
          v-model="states.inputValue"
          :disabled="disabled"
          :placeholder="filterPlaceholder"
          ref="inputRef"
          :readonly="!filterable || !isDropdownShow"
          @input="onFilter"
        >
          <template #suffix>
            <Icon 
            icon="circle-xmark" 
            v-if="showClearIcon"
            class="snow-input__clear" 
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
            />
            <Icon 
            v-else
            icon="angle-down" 
            class="header-angle" 
            :class="{ 'is-active': isDropdownShow }"
            />
          </template>
        </Input>
        <template #content> 
          <div class="snow-select__loading" v-if="states.loading"><Icon icon="spinner" spin/></div>
          <div class="snow-select__nodata" v-else-if="filterable&&filterOptions.length === 0">no matching data!</div>
          <ul class="snow-select__menu" v-else>
            <template v-for="(item, index) in filterOptions" :key="index">
              <li 
                class="snow-select__menu-item"
                :class="{'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
                :id="`select-item-${item.value}`"
                @click.stop="itemSelect(item)"
              >
                 <RenderVnode :v-node="renderLabel ? renderLabel(item) : item.label"/>
              </li>
            </template>
          </ul>
        </template>
      </Tooltip>
    </div>  
    </template>
    <script setup lang="ts">
    import { ref, reactive,computed,watch } from 'vue'
    import type { Ref } from 'vue'
    import { isFunction } from 'lodash-es'
    import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
    import Tooltip from '../Tooltip/Tooltip.vue'
    import type { TooltipInstance } from '../Tooltip/types'
    import Input from '../Input/Input.vue'
    import Icon from '../Icon/Icon.vue'
    import type { InputInstance } from '../Input/types'
    import RenderVnode from '../Common/RenderVnode'
import { faL } from '@fortawesome/free-solid-svg-icons'
    
    const findOption = (value: string) => {
      const option = props.options.find(option => option.value === value)
      return option ? option : null
    }
    defineOptions({
      name: 'SnowSelect'
    })
    const props = withDefaults(defineProps<SelectProps>(),{
      options: () => []
    })
    const emits = defineEmits<SelectEmits>()
    const initialOption = findOption(props.modelValue)
    const tooltipRef = ref() as Ref<TooltipInstance>
    const inputRef = ref() as Ref<InputInstance>
    const states = reactive<SelectStates>({
      inputValue: initialOption ? initialOption.label : '',
      selectedOption: initialOption,
      mouseHover: false,
      loading:false
    })
    const isDropdownShow = ref(false)
    const popperOptions: any = {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 9],
          },
        },
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state }: { state: any }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`;
          },
          phase: "beforeWrite",
          requires: ["computeStyles"],
        }
      ],
    }
    const filterOptions = ref(props.options)
    watch(() => props.options,(newOptions)=>{
      filterOptions.value = newOptions
    })
    const generateFilterOptions = async (searchValue: string) =>{
      if(!props.filterable) return
      if(props.filterMethod && isFunction((props.filterMethod))){
        filterOptions.value = props.filterMethod(searchValue)
      }else if(props.remote&&props.remoteMethod&&isFunction(props.remoteMethod)){
          try{
              filterOptions.value = await props.remoteMethod(searchValue)
          }catch(e){
             console.error(e)
             filterOptions.value = []
          } finally{
             states.loading = false
          }
      }else{
        filterOptions.value = props.options.filter(option => option.label.includes(searchValue))
      }
    }
    const onFilter = () => {
      generateFilterOptions(states.inputValue)
    }
    const filterPlaceholder = computed(() => {
      return (props.filterable && states.selectedOption && isDropdownShow.value)
      ? states.selectedOption.label : props.placeholder
    })
    const controlDropdown = (show: boolean) => {
      if (show) {
        //filter模式，并且之前选择过的对应的值
        if(props.filterable&&states.selectedOption){
          states.inputValue = ''
        }
        //进行一次默认选项的生成
        if(props.filterable){
          generateFilterOptions(states.inputValue)
        }
        tooltipRef.value.show()
      } else {
        tooltipRef.value.hide()
        //blur 时候将之前的值回灌到input中
        if(props.filterable){
          states.inputValue = states.selectedOption ? states.selectedOption.label : ''
        }
      }
      isDropdownShow.value = show
      emits('visible-change', show)
    }
          /** 是否像是清除图标，1.hover上去 2.props.clearable为true 3.必须要有选择过选项 4.Input值不能为空*/
    const  showClearIcon = computed(()=>{
         return props.clearable
         && states.mouseHover
         &&states.selectedOption
         &&states.inputValue.trim() != ''
    })
    const onClear = () =>{
      states.selectedOption = null
      states.inputValue = ''
      emits('clear')
      emits('change','')
      emits('update:modelValue','')
    }
    const NOOP = () =>{}
    const toggleDropdown = () => {
      if (props.disabled) return
      if (isDropdownShow.value) {
        controlDropdown(false)
      } else {
        controlDropdown(true)
      }
    }
    const itemSelect = (e: SelectOption) => {
      if (e.disabled) return
      states.inputValue = e.label
      states.selectedOption = e
      emits('change', e.value)
      emits('update:modelValue', e.value)
      controlDropdown(false)
      inputRef.value.ref.focus()
    }
    </script>
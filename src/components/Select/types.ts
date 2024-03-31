import { VNode } from "vue";
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  // v-model
  modelValue: string;
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder: string;
  disabled: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}
export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
}

export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;
export interface SelectEmits {
  (e: "change", value: string): void;
  (e: "update:modelValue", value: string): void;
  /**代表现在是打开还是关闭*/
  (e: "visible-change", value: boolean): void;
  (e: "clear"): void;
}


export interface InputProps {
  type?: string;
  modelValue: string;
  size?: 'large' | 'small';
    /**是否禁用input输入框*/
  disabled?: boolean;
   /**是否开启一键清空*/
  clearable?: boolean;
    /**是否开启密码显示*/
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}
export interface InputEmits {
    /**支持v-model而添加的事件*/
  (e: 'update:modelValue', value: string) : void;
  // input 的 input事件指的是值有变化就算    
  (e: 'input', value: string): void;
  // input 的 change事件指的是修改了值，并且失去了 focus
  (e: 'change', value: string): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'clear'): void;
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
}
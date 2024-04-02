<template>
  <div
    class="snow-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <label class="snow-form-item__label" prop="email">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="snow-form-item__content" prop="password">
      <slot :validate="validate" />
      <div
        class="snow-form-item__error-msg"
        v-if="validateStatus.state === 'error'"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  inject,
  computed,
  reactive,
  provide,
  onMounted,
  onUnmounted,
} from "vue";
import Schema from "async-validator";
import { isNil } from "lodash-es";
import { formContextKey, formItemContextKey } from "./types";
import { FormItemProps, FromValidateFailure, FormItemContext } from "./types";
defineOptions({
  name: "SnowFormItem",
});
const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);
const validateStatus = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});
/**用于根据trigger筛选出对应的校验规则*/
const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};
const validate = (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggerRules(trigger);

  if (triggeredRules.length === 0) {
    return true;
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    });
    validateStatus.loading = true;
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        console.log("no error");
        validateStatus.state = "success";
      })
      .catch((e: FromValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg =
          errors && errors.length > 0 ? errors[0].message || "" : "";
        console.log(e.errors);
        return Promise.reject(e) 
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
const context: FormItemContext = {
  validate,
  prop: props.prop || "",
};
provide(formItemContextKey, context);

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
  }
});
onUnmounted(() => {
  formContext?.removeField(context);
});
</script>
<style scoped></style>

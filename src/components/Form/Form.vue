<template>
  <form class="snow-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import type { ValidateFieldsError } from "async-validator";
import { provide } from "vue";
import type { FormContext, FormItemContext, FormProps, FromValidateFailure, FormInstance} from "./types";
import {
  formContextKey
} from "./types";
defineOptions({
  name: "SnowFrom",
});
const props = defineProps<FormProps>();
const fields: FormItemContext[] = [];
const addField: FormContext["addField"] = (field) => {
  fields.push(field);
};
const removeField: FormContext["removeField"] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())
}
const validate = async () =>{
  console.log('fields', fields);
  let validationErrors:ValidateFieldsError = {}
  for(const field of fields ){
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FromValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if(Object.keys(validationErrors).length===0) return true
  return Promise.reject(validationErrors)
}

provide(formContextKey, {
  ...props,
  addField,
  removeField,
});
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>
<style scoped></style>

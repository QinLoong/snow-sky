<template>
  <form class="snow-form">
    <slot />
    <button @click.prevent="validate">validate all</button>
  </form>
</template>
<script setup lang="ts">
import { ValidateFieldsError } from "async-validator";
import { provide } from "vue";
import {
  FormContext,
  FormItemContext,
  FormProps,
  FromValidateFailure,
  formContextKey,
  FormInstance
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
  validate
})
</script>
<style scoped></style>

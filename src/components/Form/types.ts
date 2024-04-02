import type { InjectionKey } from "vue";
import { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";

export interface FormItemProps {
  label: string;
  prop?: string;
}
export interface FormItemRule extends RuleItem {
  trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>;
export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export interface FormItemContext {
  prop: string;
  validate: (trigger?: string) => any;
}

export interface FromValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>;
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol("formContextKey");
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol("formItemContextKey");

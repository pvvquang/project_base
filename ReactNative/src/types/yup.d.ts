import * as Yup from 'yup';

declare module 'yup' {
  interface StringSchema extends Yup.StringSchema {
    emailValidation(value: string): StringSchema;
    textOrNumber(value: string): StringSchema;
    confirmPassword(value: string): StringSchema;
  }
}

import * as Yup from 'yup';

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

Yup.addMethod(Yup.string, 'emailValidation', function (errorMessage: string) {
  return this.test('email-validate', errorMessage, function (value) {
    const flatValue = value?.trim() as string;
    if (!flatValue) return true;
    return emailRegex.test(flatValue);
  });
});

Yup.addMethod(Yup.string, 'textOrNumber', function (errorMessage: string) {
  return this.test('text-or-number', errorMessage, function (value) {
    return /^[a-zA-Z0-9]+$/.test(value?.trim() || '');
  });
});

Yup.addMethod(Yup.string, 'confirmPassword', function (errorMessage: string) {
  return this.test('confirm-password', errorMessage, function (value) {
    return value === this.parent.password;
  });
});

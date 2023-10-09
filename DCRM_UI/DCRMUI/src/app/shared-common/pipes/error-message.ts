import { ValidationErrors } from '@angular/forms';

export const validationMessages: ValidationErrors = {
  required: 'Required',
  minlength: 'Too Short',
  maxlength: 'Too Long',
  pattern: 'Forbidden Entry',
  email: 'Email address is invalid',
  date: 'This field is Invalid Date',
  min: 'Need greater than',
  max: 'Need less than',
  invalid: 'Invalid',
};

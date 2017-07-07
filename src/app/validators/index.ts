import { FormControl } from '@angular/forms';

const ZIP_REGEXP = /\d{5}/;

export function numberValidator(control: FormControl): {[key: string]: any} {
  let value = control.value;
  if (value === '') {
    return null;
  }
  if (typeof value !== 'number') {
    value = parseFloat(value);
  }
  return isNaN(value) ? { numberValidator: { valid: false } } : null;
}

export function zipCodeValidator(control: FormControl): {[key: string]: any} {
  if (control.value === '') {
    return null;
  }
  
  return ZIP_REGEXP.test(control.value) ? null : 
    { zipCodeValidator: { valid: false } };
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tostring' })
export class ToStringPipe implements PipeTransform {
  transform(value: number, decimals: number, toLocale: boolean): string {
    if (!value && value !== 0) {
  		return 'no data';
  	}
  	const strValue = value.toFixed(decimals);
  	if (toLocale) {
  		return '$' + Number(strValue).toLocaleString();
  	} else {
  		return strValue;
  	}
  }
}
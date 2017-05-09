import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeys'
})
export class EnumKeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let enumItem in value) {
      let isValueProp = parseInt(enumItem, 10) >= 0;
      if (isValueProp) {
        keys.push({
          keys: enumItem,
          value: value[enumItem]
        });
      }
    }
    return keys;
  }

}

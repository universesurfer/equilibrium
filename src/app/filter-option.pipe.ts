import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOption'
})
export class FilterOptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

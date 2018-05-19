import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterOptionPipe implements PipeTransform {

  transform(companies: any[], filter?: string): any {

    switch(filter) {
      case 'casual':
        //return code;
        break;
      case 'formal':
        //return code;
        break;
      case 'summerwear':
        //return code;
        break;
      case 'outdoors':
        //return code;
        break;
      case 'activewear':
        //return code;
        break;
      case 'petite':
        //return code;
        break;
      case 'plussize':
        //return code;
        break;

      default:
        return companies;
    }

  //   if(!values) {
  //     console.log("no values");
  //   } else {
  //
  //     let filteredList = companies.filter((item) => item.bestFor)
  //
  //     return filteredList
  //
  //   }
  //
  //
  //
  // }

}
}

// NOTE: Receiving 'undefined' on properties of bestFor because not all companies have 'bestFor' property yet?

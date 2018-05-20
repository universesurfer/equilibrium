import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';
// import * as __ from 'lodash';

@Pipe({
  name: 'filterList'
})
export class FilterOptionPipe implements PipeTransform {

  transform(companies: any[], filter?: string): any {

    switch(filter) {
      
      case 'casual':
      let casual = companies.filter( item => item.bestFor.casual === true);
      return casual

      case 'formal':
        let formal = companies.filter( item => item.bestFor.formalwear === true);
        return formal

      case 'summerwear':
        let summerwear = companies.filter( item => item.bestFor.summerwear === true);
        return summerwear

      case 'outdoors':
        let outdoors = companies.filter( item => item.bestFor.outdoors === true);
        return outdoors

      case 'activewear':
        let activewear = companies.filter( item => item.bestFor.activewear === true);
        return activewear

      case 'petite':
        let petite = companies.filter( item => item.bestFor.petite === true);
        return petite

      case 'plussize':
        let plussize = companies.filter( item => item.bestFor.plusSize === true);
        return plussize

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

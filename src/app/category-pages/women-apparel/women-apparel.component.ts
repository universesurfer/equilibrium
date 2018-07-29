import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-women-apparel',
  templateUrl: './women-apparel.component.html',
  styleUrls: ['./women-apparel.component.css']
})
export class WomenApparelComponent implements OnInit {

  allCompanies: any;
  companyName: string;
  category: string = 'women-apparel';

  //Holds selected filter choice for use in pipe
  filterOption: string;

  constructor(
    private session: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getCompaniesForCategory();
  }


  // filterBy(category) {
  //   this.filteredCompanyList = this.allCompanies.filter(company => company.bestFor === category);
  //   console.log("showing filtered company", this.filteredCompanyList);
  // }

//Change the Filter Pipe Argument Depending on Filter Option Selected By User
  // filterChanged(option) {
  //   this.filterOption = option;
  //   // this.filteredCompanyList = this.allCompanies.filter(company => company.bestFor.option === option);
  //   console.log("showing filter option", option);
  // }

  // filterChanged(selectedValue:string){
  //    console.log('value is ',selectedValue);
  // this.booksByStoreID = this.books.filter(
  //         book => book.store_id === this.store.id);


  navigateToCompanyPage(company) {
    this.companyName = company;
    this.router.navigate([`/${this.category}/${this.companyName}`]);

  }


  // When the page loads, retrieve all companies within the relevant category.
  getCompaniesForCategory() {
    this.session.getCompaniesForCategory(this.category)
    .subscribe(result => {
      if (result) {
        this.allCompanies = result.companies;
        // console.log("inside the result in getCompaniesForCategory()", result);
      } else {
        // console.log("Unable to retrieve companies...");
      }
    });
  }




}

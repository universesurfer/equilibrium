import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-women-apparel',
  templateUrl: './women-apparel.component.html',
  styleUrls: ['./women-apparel.component.css']
})
export class WomenApparelComponent implements OnInit {

  allCompanies: any;
  companyName: string;
  category: string = 'women-apparel';

  constructor(
    private session: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getCompaniesForCategory();
  }




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
        console.log("inside the result in getCompaniesForCategory()", result);
      } else {
        console.log("Unable to retrieve companies...");
      }
    });
  }




}

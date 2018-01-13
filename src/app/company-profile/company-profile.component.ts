import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../auth.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

companies: any;

params: any;
category: string;
companyName: string;
company: any;

  constructor(
    private session: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    //Set global variables with params for use in displayCompanyInfo() method below
    this.params = this.activatedRoute.snapshot.params;
    this.category = this.activatedRoute.snapshot.params.category;
    this.companyName = this.activatedRoute.snapshot.params.company;

   }


  ngOnInit() {
    console.log(this.session.companies);
    this.companies = this.session.companies;

    //Display the company data when page loads.
    this.displayCompanyInfo(this.params.category, this.params.company);

}



//Retrieves relevant company information for each separate company
displayCompanyInfo(category, companyName) {
  this.session.getSingleCompany(category, companyName)
    .subscribe(result => {
      if (result) {
        this.company = result
        console.log("inside the result in displayCompanyInfo()", this.company);
      } else {
        console.log("Unable to retrieve this company's information with displayCompanyInfo()");
      }
    });
}




}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

// category: string;


  constructor(
    private router: Router
  ) {}




  ngOnInit() {}



  // navigateToCategoryPage(category) {
  //   this.category = category.id;
  //   this.router.navigate([`/${this.category}`]);
  //
  // }




}

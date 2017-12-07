import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { LandingComponent } from '../landing/landing.component';
import { WomenApparelComponent } from '../category-pages/women-apparel/women-apparel.component';


export const routes: Routes = [
  {path: '', component: LandingComponent },
  {path: 'womens-apparel', component: WomenApparelComponent }
  // {path: '**', redirectTo: ''}
];

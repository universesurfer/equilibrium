import { Routes, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';


import { AppComponent } from '../app.component';
import { LandingComponent } from '../landing/landing.component';
import { WomenApparelComponent } from '../category-pages/women-apparel/women-apparel.component';
import { MenApparelComponent } from '../category-pages/men-apparel/men-apparel.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { ProfileComponent } from '../profile/profile.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';



export const routes: Routes = [

  { path: '', component: CategoriesComponent },
  { path: 'category/men-apparel', component: MenApparelComponent },
  { path: 'category/womens-apparel', component: WomenApparelComponent },
  { path: 'login', component: LoginModalComponent },
  { path: 'signup', component: SignupModalComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthService] },
  { path: ':category/:company', component: CompanyProfileComponent }
  // {path: '**', redirectTo: ''}
];

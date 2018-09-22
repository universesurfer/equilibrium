import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; //ng2-validation
import { routes } from './routes/app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { CategoriesComponent } from './categories/categories.component';
import { WomenApparelComponent } from './category-pages/women-apparel/women-apparel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { MenApparelComponent } from './category-pages/men-apparel/men-apparel.component';

import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';

import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import{ FileSelectDirective } from 'ng2-file-upload';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { FilterOptionPipe } from './filter-option.pipe';
import { CompanyImagePipe } from './company-image.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    CategoriesComponent,
    WomenApparelComponent,
    NavbarComponent,
    LandingComponent,
    MenApparelComponent,
    LoginModalComponent,
    SignupModalComponent,
    ProfileComponent,
    CompanyProfileComponent,
    FileSelectDirective,
    FooterComponent,
    SettingsComponent,
    FilterOptionPipe,
    CompanyImagePipe

  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    // CustomFormsModule,
    HttpModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,  //Toastr
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

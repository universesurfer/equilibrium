import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { routes } from './routes/app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { CategoriesComponent } from './categories/categories.component';
import { WomenApparelComponent } from './category-pages/women-apparel/women-apparel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { MenApparelComponent } from './category-pages/men-apparel/men-apparel.component';
import { MenAccessoriesComponent } from './category-pages/men-accessories/men-accessories.component';
import { BeautyComponent } from './category-pages/beauty/beauty.component';
import { BathBodyComponent } from './category-pages/bath-body/bath-body.component';
import { KitchenComponent } from './category-pages/kitchen/kitchen.component';
import { HomeGardenComponent } from './category-pages/home-garden/home-garden.component';
import { CleaningComponent } from './category-pages/cleaning/cleaning.component';
import { BulkFoodComponent } from './category-pages/bulk-food/bulk-food.component';
import { WritingComponent } from './category-pages/writing/writing.component';
import { ComputerAccessoriesComponent } from './category-pages/computer-accessories/computer-accessories.component';
import { DiyComponent } from './category-pages/diy/diy.component';
import { PhotographyComponent } from './category-pages/photography/photography.component';
import { PetsComponent } from './category-pages/pets/pets.component';
import { VintageComponent } from './category-pages/vintage/vintage.component';
import { WomenAccessoriesComponent } from './category-pages/women-accessories/women-accessories.component';
import { OutdoorsComponent } from './category-pages/outdoors/outdoors.component';
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




@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    CategoriesComponent,
    WomenApparelComponent,
    NavbarComponent,
    LandingComponent,
    MenApparelComponent,
    MenAccessoriesComponent,
    BeautyComponent,
    BathBodyComponent,
    KitchenComponent,
    HomeGardenComponent,
    CleaningComponent,
    BulkFoodComponent,
    WritingComponent,
    ComputerAccessoriesComponent,
    DiyComponent,
    PhotographyComponent,
    PetsComponent,
    VintageComponent,
    WomenAccessoriesComponent,
    OutdoorsComponent,
    LoginModalComponent,
    SignupModalComponent,
    ProfileComponent,
    CompanyProfileComponent,
    FileSelectDirective,
    FooterComponent,
    SettingsComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,  //Toastr
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

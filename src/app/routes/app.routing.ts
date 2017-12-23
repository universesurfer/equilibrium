import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { LandingComponent } from '../landing/landing.component';
import { WomenApparelComponent } from '../category-pages/women-apparel/women-apparel.component';
import { WomenAccessoriesComponent } from '../category-pages/women-accessories/women-accessories.component';
import { MenApparelComponent } from '../category-pages/men-apparel/men-apparel.component';
import { MenAccessoriesComponent } from '../category-pages/men-accessories/men-accessories.component';
import { BeautyComponent } from '../category-pages/beauty/beauty.component';
import { BathBodyComponent } from '../category-pages/bath-body/bath-body.component';
import { KitchenComponent } from '../category-pages/kitchen/kitchen.component';
import { HomeGardenComponent } from '../category-pages/home-garden/home-garden.component';
import { CleaningComponent } from '../category-pages/cleaning/cleaning.component';
import { BulkFoodComponent } from '../category-pages/bulk-food/bulk-food.component';
import { WritingComponent } from '../category-pages/writing/writing.component';
import { ComputerAccessoriesComponent } from '../category-pages/computer-accessories/computer-accessories.component';
import { DiyComponent } from '../category-pages/diy/diy.component';
import { PhotographyComponent } from '../category-pages/photography/photography.component';
import { PetsComponent } from '../category-pages/pets/pets.component';
import { VintageComponent } from '../category-pages/vintage/vintage.component';
import { OutdoorsComponent } from '../category-pages/outdoors/outdoors.component';



export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'womens-apparel', component: WomenApparelComponent },
  { path: 'women-accessories', component: WomenAccessoriesComponent },
  { path: 'men-apparel', component: MenApparelComponent },
  { path: 'men-accessories', component: MenAccessoriesComponent },
  { path: 'beauty', component: BeautyComponent },
  { path: 'bath-body', component: BathBodyComponent },
  { path: 'kitchen', component: KitchenComponent},
  { path: 'home-garden', component: HomeGardenComponent },
  { path: 'cleaning', component: CleaningComponent },
  { path: 'bulk-food', component: BulkFoodComponent },
  { path: 'writing', component: WritingComponent },
  { path: 'computer-accessories', component: ComputerAccessoriesComponent },
  { path: 'diy', component: DiyComponent },
  { path: 'photography', component: PhotographyComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'vintage', component: VintageComponent },
  { path: 'outdoors', component: OutdoorsComponent }


  // {path: '**', redirectTo: ''}
];

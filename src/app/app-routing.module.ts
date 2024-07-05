import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { ViewCarComponent } from './view-car/view-car.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:AllCarsComponent},
  {path:'view/:id',component:ViewCarComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'wishlist',canActivate:[authGuard], component:WishlistComponent},
  {path:'cart',canActivate:[authGuard],component:UserCartComponent},
  {path:'checkout',canActivate:[authGuard],component:CheckoutComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

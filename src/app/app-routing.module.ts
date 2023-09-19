import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PartCategoriesComponent } from './components/part-categories/part-categories.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PartsComponent } from './components/parts/parts.component';
import { CartComponent } from './components/cart/cart.component';
import { PartCardComponent } from './components/part-card/part-card.component';
import { PartComponent } from './components/part/part.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddEngineComponent } from './components/add-engine/add-engine.component';
import { AddTransmissionComponent } from './components/add-transmission/add-transmission.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddPartComponent } from './components/add-part/add-part.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { UpdateEngineComponent } from './components/update-engine/update-engine.component';
import { EnginesComponent } from './components/engines/engines.component';
import { UpdatePartComponent } from './components/update-part/update-part.component';
import { CarsComponent } from './components/cars/cars.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Roles } from './enums/enums';
import { RoleAuthGuard } from './auth/auth.role.gurad';
import { TokenAuthGuard } from './auth/auth.token.gurad';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: PartCategoriesComponent},
  {path:'articles', component: ArticlesComponent, canActivate: [TokenAuthGuard]},
  {path:'article/:id', component: ArticleComponent, canActivate: [TokenAuthGuard]},
  {path:'parts', component: PartsComponent},
  {path:'part/:id', component: PartComponent},
  {path:'cart', component: CartComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.User }},
  {path:'engines', component: EnginesComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'cars', component: CarsComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'add-engine', component: AddEngineComponent, canActivate: [RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'add-car', component: AddCarComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'add-part', component: AddPartComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'add-article', component: AddArticleComponent, canActivate: [TokenAuthGuard]},
  {path:'update-part/:id', component: UpdatePartComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'update-article/:id', component: UpdateArticleComponent, canActivate: [TokenAuthGuard]},
  {path:'update-engine/:id', component: UpdateEngineComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'update-car/:id', component: UpdateCarComponent, canActivate: [TokenAuthGuard, RoleAuthGuard], data: { role : Roles.Admin }},
  {path:'about-us', component: AboutUsComponent},
  {path:'profile', component: ProfileComponent, canActivate: [TokenAuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PartCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

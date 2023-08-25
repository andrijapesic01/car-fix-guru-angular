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

const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'home', component: PartCategoriesComponent},
    {path:'articles', component: ArticlesComponent},
    {path:'article/:id', component: ArticleComponent},
    {path:'parts', component: PartsComponent},
    {path:'part/:id', component: PartComponent},
    {path:'cart', component: CartComponent},
    {path:'part-card', component: PartCardComponent},
    {path:'image-viewer', component: ImageViewerComponent},
    {path:'add-engine', component: AddEngineComponent},
    {path:'add-transmission', component: AddTransmissionComponent},
    {path:'add-car', component: AddCarComponent},
    {path:'add-part', component: AddPartComponent},
    {path:'add-article', component: AddArticleComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: PartCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

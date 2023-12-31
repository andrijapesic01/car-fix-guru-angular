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

const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'part-categories', component: PartCategoriesComponent},
    {path:'articles', component: ArticlesComponent},
    {path:'article', component: ArticleComponent},
    {path:'parts', component: PartsComponent},
    {path:'cart', component: CartComponent},
    {path:'part-card', component: PartCardComponent},
    {path:'part', component: PartComponent},
    {path:'image-viewer', component: ImageViewerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

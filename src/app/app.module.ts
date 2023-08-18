import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PartCategoriesComponent } from './components/part-categories/part-categories.component';
import { PartCategoryCardComponent } from './components/part-category-card/part-category-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PartCategoryCardService } from './services/part-category-card.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnginesService } from './services/engines.service';
import { AngularMaterialModule } from './angular-material.module';
import { ArticlesComponent } from './components/articles/articles.component';
import { CarSelectCardComponent } from './components/car-select-card/car-select-card.component';
import { PartsComponent } from './components/parts/parts.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartCardComponent } from './components/part-card/part-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PartCategoriesComponent,
    PartCategoryCardComponent,
    NavbarComponent,
    ArticlesComponent,
    CarSelectCardComponent,
    PartsComponent,
    CartComponent,
    PartCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PartCategoryCardService, EnginesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

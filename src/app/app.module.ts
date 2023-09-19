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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnginesService } from './services/engines.service';
import { AngularMaterialModule } from './angular-material.module';
import { ArticlesComponent } from './components/articles/articles.component';
import { CarSelectCardComponent } from './components/car-select-card/car-select-card.component';
import { PartsComponent } from './components/parts/parts.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartCardComponent } from './components/part-card/part-card.component';
import { PartComponent } from './components/part/part.component';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddEngineComponent } from './components/add-engine/add-engine.component';
import { AddTransmissionComponent } from './components/add-transmission/add-transmission.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddPartComponent } from './components/add-part/add-part.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { partReducer } from './state/part/part.reducer';
import { AppState } from './app.state';
import { articleReducer } from './state/article/article.reducer';
import { PartEffects } from './state/part/part.effects';
import { ArticleEffects } from './state/article/article.effects';
import { EngineEffects } from './state/engine/engine.effects';
import { PartCategoryEffects } from './state/part-categories/part-categories.effects';
import { engineReducer } from './state/engine/engine.reducer';
import { partCategoryReducer } from './state/part-categories/part-categories.reducer';
import { carReducer } from './state/car/car.reducer';
import { CarEffects } from './state/car/car.effects';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { EnginesComponent } from './components/engines/engines.component';
import { UpdateEngineComponent } from './components/update-engine/update-engine.component';
import { UpdatePartComponent } from './components/update-part/update-part.component';
import { CarsComponent } from './components/cars/cars.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { cartReducer } from './state/cart/cart.reducer';
import { CartEffects } from './state/cart/cart.effects';
import { LocalStorageService } from './services/local-storage.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InterceptorService } from './auth/interceptor';
import { UserEffects } from './state/user/user.effects';
import { userReducer } from './state/user/user.reducer';
import { CartButtonComponent } from './components/cart-button/cart-button.component';


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
    PartCardComponent,
    PartComponent,
    ImageViewerComponent,
    ArticleComponent,
    AboutUsComponent,
    AddEngineComponent,
    AddTransmissionComponent,
    AddCarComponent,
    AddPartComponent,
    AddArticleComponent,
    UpdateArticleComponent,
    EnginesComponent,
    UpdateEngineComponent,
    UpdatePartComponent,
    CarsComponent,
    UpdateCarComponent,
    ProfileComponent,
    CartButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    /* StoreModule.forRoot<AppState>({ part: partReducer, article: articleReducer }),
    EffectsModule.forRoot([PartEffects, ArticleEffects]), */
    StoreModule.forRoot<AppState>({ part: partReducer, article: articleReducer, engine: engineReducer, partCategory: partCategoryReducer, car: carReducer, cart: cartReducer, user: userReducer}),
    EffectsModule.forRoot([PartEffects, ArticleEffects, EngineEffects, PartCategoryEffects, CarEffects, CartEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [PartCategoryCardService, EnginesService, LocalStorageService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

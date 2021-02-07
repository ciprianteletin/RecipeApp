import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ShoppingListComponent} from './components/shopping/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './components/shopping/shopping-edit/shopping-edit.component';
import {RecipeListComponent} from './components/recipe/recipe-list/recipe-list.component';
import {RecipesComponent} from './components/recipe/recipes/recipes.component';
import {RecipeItemComponent} from './components/recipe/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './components/recipe/recipe-detail/recipe-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownDirective} from './shared/dropdown.directive';
import {NoRecipeComponent} from './components/recipe/no-recipe/no-recipe.component';
import {RecipeEditComponent} from './components/recipe/recipe-edit/recipe-edit.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './components/auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './components/auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    DropdownDirective,
    NoRecipeComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './components/recipe/recipes/recipes.component';
import {ShoppingListComponent} from './components/shopping/shopping-list/shopping-list.component';
import {NoRecipeComponent} from './components/recipe/no-recipe/no-recipe.component';
import {RecipeDetailComponent} from './components/recipe/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './components/recipe/recipe-edit/recipe-edit.component';
import {RecipeResolverService} from './components/recipe/recipe-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', pathMatch: 'full', component: NoRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

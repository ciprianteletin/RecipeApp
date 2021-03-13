import {Injectable} from '@angular/core';
import {Recipe} from '../components/recipe/recipe.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor() {
  }

  getRecipesList(): Recipe[] {
    return this.recipes.slice();
  }

  getIdOfRecipe(recipe: Recipe): number {
    return this.recipes.findIndex((currentRecipe: Recipe) => recipe.name === currentRecipe.name);
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe): void {
    this.recipes[id] = recipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(recipe: Recipe): void {
    const id = this.getIdOfRecipe(recipe);
    this.recipes.splice(id, 1);
    this.recipeChanges.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipeChanges.next(recipes.slice());
  }
}

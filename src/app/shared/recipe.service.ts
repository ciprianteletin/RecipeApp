import {Injectable} from '@angular/core';
import {Recipe} from '../components/recipe/recipe.model';
import {Ingredient} from './ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simply test',
      'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe('A New Test Recipe', 'This is the second test',
      'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

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
}

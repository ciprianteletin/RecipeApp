import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from '../components/recipe/recipe.model';
import {Ingredient} from './ingredient.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
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

  private passRecipe = new EventEmitter<Recipe>();

  getRecipesList(): Recipe[] {
    return this.recipes.slice();
  }

  getPassRecipeEvent(): EventEmitter<Recipe> {
    return this.passRecipe;
  }
}

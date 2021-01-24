import {Injectable} from '@angular/core';
import {Ingredient} from './ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  addIngredientToList(ingredient: Ingredient): void {
    const copy = this.ingredients.find((ing: Ingredient) => ing.name.toLowerCase() === ingredient.name.toLowerCase());
    if (copy) {
      copy.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }

  addIngredientsToList(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.addIngredientToList(ingredient);
    }
  }
}

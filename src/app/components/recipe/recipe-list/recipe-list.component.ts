import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeItemPasser = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simply test',
      'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg'),
    new Recipe('A New Test Recipe', 'This is the second test',
      'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  passedRecipe(recipe: Recipe): void {
    this.recipeItemPasser.emit(recipe);
  }

}

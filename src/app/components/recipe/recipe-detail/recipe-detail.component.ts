import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../../shared/recipe.service';
import {ShoppingListService} from '../../../shared/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeItem: Recipe;

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  addToShopping(): void {
    this.shoppingService.addIngredientsToList(this.recipeItem.ingredients);
  }

}

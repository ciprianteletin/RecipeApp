import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../../shared/recipe.service';
import {ShoppingListService} from '../../../shared/shopping-list.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingListService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => this.recipeItem = this.recipeService.getRecipesList()[+param.id]);
  }

  addToShopping(): void {
    this.shoppingService.addIngredientsToList(this.recipeItem.ingredients);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../../shared/recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeChanges.subscribe((recipes: Recipe[]) => this.recipes = recipes);
    this.recipes = this.recipeService.getRecipesList();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}

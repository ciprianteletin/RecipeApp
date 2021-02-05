import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Observable} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';
import {RecipeService} from '../../shared/recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.recipeService.getRecipesList().length === 0) {
      return this.dataStorage.fetchRecipes();
    }
    return this.recipeService.getRecipesList();
  }

}

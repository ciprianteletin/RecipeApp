import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../components/recipe/recipe.model';
import {RecipeService} from './recipe.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../components/auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipesList();
    this.http.put('https://recipe-awesome-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(result => {
        console.log(result);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-awesome-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(val => val.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      })), tap(val => this.recipeService.setRecipes(val)));
  }
}

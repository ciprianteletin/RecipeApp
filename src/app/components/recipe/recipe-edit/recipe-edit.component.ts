import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../shared/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param.id;
      this.editMode = param.id != null;
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const currentRecipe = this.recipeService.getRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeImage = currentRecipe.imagePath;
      recipeDescription = currentRecipe.description;
      if (currentRecipe.ingredients) {
        for (const ingredinent of currentRecipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredinent.name, Validators.required),
            amount: new FormControl(ingredinent.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getControls(): AbstractControl[] {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(): void {
    (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(index: number): void {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    console.log(this.recipeForm.value);
    console.log(this.recipeForm);
    this.router.navigate(['/recipes']);
  }

}

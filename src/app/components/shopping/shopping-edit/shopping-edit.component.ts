import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../../../shared/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../../shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as ShoppingActions from '../store/shopping.actions';
import * as fromApp from '../../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm: NgForm;
  editMode = false;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.myForm.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.editMode) {
      this.store.dispatch(new ShoppingActions.AddIngredient
      (new Ingredient(this.myForm.value.nameInput, Number(this.myForm.value.amountInput))));
    } else {
      const ingredient = new Ingredient(this.myForm.value.nameInput, Number(this.myForm.value.amountInput));
      this.store.dispatch(new ShoppingActions.UpdateIngredient(ingredient));
    }
    this.myForm.reset();
  }

  onDelete(): void {
    if (this.editMode) {
      this.onClear();
      this.store.dispatch(new ShoppingActions.DeleteIngredient());
    }
  }

  onClear(): void {
    this.myForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingActions.StopEdit());
  }

}

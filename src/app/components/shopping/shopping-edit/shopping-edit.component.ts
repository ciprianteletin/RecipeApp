import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../../../shared/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.myForm.setValue({
        nameInput: this.editedItem.name,
        amountInput: this.editedItem.amount
      });
    });
  }

  onSubmit(): void {
    if (!this.editMode) {
      this.shoppingService.addIngredientToList(
        new Ingredient(this.myForm.value.nameInput, Number(this.myForm.value.amountInput)));
    } else {
      const ingredient = new Ingredient(this.myForm.value.nameInput, Number(this.myForm.value.amountInput));
      this.editedItem.name = ingredient.name;
      this.editedItem.amount = ingredient.amount;
      this.editMode = false;
    }
    this.myForm.reset();
  }

  onDelete(): void {
    if (this.editMode) {
      this.onClear();
      this.shoppingService.deleteItem(this.editedItemIndex);
    }
  }

  onClear(): void {
    this.myForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../shared/ingredient.model';
import {ShoppingListService} from '../../../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  addNewIngredient(): void {
    this.shoppingService.addIngredientToList(
      new Ingredient(this.nameInput.nativeElement.value, Number(this.amountInput.nativeElement.value)));
  }

}

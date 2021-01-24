import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Ingredient} from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() addIngredientEvent = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addNewIngredient(): void {
    this.addIngredientEvent.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}

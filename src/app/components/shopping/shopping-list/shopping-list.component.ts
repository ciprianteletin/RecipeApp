import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../../shared/ingredient.model';
import {ShoppingListService} from '../../../shared/shopping-list.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as ShoppingActions from '../store/shopping.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private shoppingService: ShoppingListService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingActions.StartEdit(index));
  }

}

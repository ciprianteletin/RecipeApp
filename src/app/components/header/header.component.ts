import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() recipeOrShopping = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipe(): void {
    this.recipeOrShopping.emit('recipe');
  }

  onShopping(): void {
    this.recipeOrShopping.emit('shopping');
  }

}

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayRecipeOrShopping = 'recipe';

  constructor() {

  }

  chooseDisplay(data: string): void {
    this.displayRecipeOrShopping = data;
  }

}

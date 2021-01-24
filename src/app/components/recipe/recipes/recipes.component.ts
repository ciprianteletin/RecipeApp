import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipePassed: Recipe;

  constructor() {
  }

  ngOnInit(): void {
  }

  onReceiveReceipe(received: Recipe): void {
    this.recipePassed = received;
  }

}

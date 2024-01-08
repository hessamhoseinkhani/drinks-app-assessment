import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DrinksService} from '../../_services/drinks.service';
import {DrinkDetails} from "../../_models/drink-details";

/** Component to display details of a drink. */
@Component({
  selector: 'app-drink-details',
  styleUrl: './drink-details.component.scss',
  templateUrl: './drink-details.component.html',
  standalone: true
})
export class DrinkDetailsComponent implements OnInit {
  /** Object to store details of the drink. */
  drink: DrinkDetails | undefined;

  /** Array to store the list of ingredients for the drink. */
  ingredients: string[] = [];

  /** Array to store recipes in different languages for the drink. */
  recipes: { language: string, instructions: string }[] = [];

  /* A flag which indicates the data is loading */
  isLoading: boolean = false;

  /**
   * Constructor with dependency injection for ActivatedRoute and DrinksService.
   * @param route - The route activated to get the drink details.
   * @param drinksService - The service to fetch drink details.
   */
  constructor(private route: ActivatedRoute, private drinksService: DrinksService) {
  }

  /**
   * Lifecycle hook called after the component has been initialized.
   * Retrieves the drink details based on the route parameter 'id'.
   * Calls setIngredients and setRecipes methods to process and store ingredients and recipes.
   */
  ngOnInit(): void {
    const drinkId: string | null = this.route.snapshot.paramMap.get('id');
    if (drinkId) {
      this.isLoading = true;
      this.drinksService.getDrinkDetails(drinkId).subscribe((data) => {
        this.drink = data;
        this.setIngredients();
        this.setRecipes();
      }).add(() => {
        this.isLoading = false;
      });
    } else {
      console.error('An error occurred while fetching the drink details: No Drink ID.');
    }
  }

  /** Method to set the list of ingredients for the drink. */
  setIngredients(): void {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = this.drink?.['strIngredient' + i];
      if (ingredient) {
        const measure = this.drink?.['strMeasure' + i] || '';
        ingredients.push(`${measure.trim()} of ${ingredient}`);
      }
    }
    this.ingredients = ingredients;
  }

  /** Method to set recipes in different languages for the drink. */
  setRecipes(): void {
    const recipes: { language: string, instructions: string }[] = [];
    for (const key in this.drink) {
      if (key.includes('strInstructions') && this.drink?.[key]) {
        const language = key.replace('strInstructions', '') || 'EN';
        const instructions = this.drink?.[key];
        if (language && instructions) {
          recipes.push({language, instructions});
        }
      }
    }
    this.recipes = recipes;
  }
}

import {Component, OnInit} from '@angular/core';
import {DrinksService} from '../../_services/drinks.service';
import {RouterLink} from "@angular/router";
import {Drink} from "../../_models/drink";

/** Component to display a list of drinks. */
@Component({
  selector: 'app-drinks-list',
  styleUrl: './drinks-list.component.scss',
  templateUrl: './drinks-list.component.html',
  imports: [RouterLink],
  standalone: true
})
export class DrinksListComponent implements OnInit {
  /** Array to store the list of drinks. */
  drinks: Drink[] = [];
  /* A flag which indicates the data is loading */
  isLoading: boolean = false;

  /**
   * Constructor with dependency injection for the DrinksService.
   * @param drinksService - The service to fetch drinks data.
   */
  constructor(private drinksService: DrinksService) {}

  /**
   * Lifecycle hook called after the component has been initialized.
   * Calls the 'getDrinks' method from the DrinksService
   * and subscribes to the observable to get data and update the 'drinks' array.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.drinksService.getDrinks().subscribe((data) => {
      this.drinks = data;
    }).add(() => {
      this.isLoading = false;
    });
  }
}

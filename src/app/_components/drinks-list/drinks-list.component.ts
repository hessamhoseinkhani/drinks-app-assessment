import {Component, OnInit} from '@angular/core';
import {DrinksService} from '../../_services/drinks.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-drinks-list',
  styleUrl: './drinks-list.component.scss',
  templateUrl: './drinks-list.component.html',
  imports: [RouterLink],
  standalone: true
})
export class DrinksListComponent implements OnInit {
  drinks: any[] = [];

  constructor(private drinksService: DrinksService) {
  }

  ngOnInit(): void {
    this.drinksService.getAlcoholicDrinks().subscribe((data) => {
      this.drinks = data.drinks;
    });
  }
}

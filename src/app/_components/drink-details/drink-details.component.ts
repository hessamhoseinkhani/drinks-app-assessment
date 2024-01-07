import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DrinksService} from '../../_services/drinks.service';

@Component({
  selector: 'app-drink-details',
  styleUrl: './drink-details.component.scss',
  templateUrl: './drink-details.component.html',
  standalone: true
})
export class DrinkDetailsComponent implements OnInit {
  drink: any;

  constructor(private route: ActivatedRoute, private drinksService: DrinksService) {
  }

  ngOnInit(): void {
    const drinkId = this.route.snapshot.paramMap.get('id');
    this.drinksService.getDrinkDetails(drinkId).subscribe((data) => {
      this.drink = data.drinks[0];
    });
  }
}

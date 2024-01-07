import {Routes} from '@angular/router';
import {DrinksListComponent} from "./_components/drinks-list/drinks-list.component";
import {DrinkDetailsComponent} from "./_components/drink-details/drink-details.component";

export const routes: Routes = [
  {path: '', component: DrinksListComponent},
  {path: 'drink/:id', component: DrinkDetailsComponent},
];

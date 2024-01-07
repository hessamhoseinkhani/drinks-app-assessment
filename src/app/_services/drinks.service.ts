import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {
  }

  getAlcoholicDrinks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter.php?a=Alcoholic`);
  }

  getDrinkDetails(drinkId: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/lookup.php?i=${drinkId}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {DrinkDetails} from "../_models/drink-details";
import {Drink} from "../_models/drink";

/** Service for fetching drink-related data from the API. */
@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  /** Base URL for APIs. */
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  /**
   * Creates an instance of DrinksService.
   * @param http - Angular's HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves a list of alcoholic drinks from thecocktaildb API.
   * @returns An observable containing the API response for alcoholic drinks.
   */
  getDrinks(): Observable<Drink[]> {
    return this.http.get<{ drinks: Drink[] }>(`${this.baseUrl}/filter.php?a=Alcoholic`)
      .pipe(map(response => response?.drinks));
  }

  /**
   * Retrieves details of a specific drink by its ID from thecocktaildb API.
   * @param drinkId - The ID of the drink to retrieve details for.
   * @returns An observable containing the API response for drink details.
   */
  getDrinkDetails(drinkId: string): Observable<DrinkDetails | undefined> {
    return this.http.get<{ drinks: DrinkDetails }>(`${this.baseUrl}/lookup.php?i=${drinkId}`)
      .pipe(map(response => response.drinks[0]));
  }
}

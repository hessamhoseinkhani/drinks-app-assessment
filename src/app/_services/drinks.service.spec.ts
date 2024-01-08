import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DrinksService} from './drinks.service';
import {ConfigService} from './config.service';

describe('DrinksService', () => {
  let service: DrinksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrinksService, ConfigService],
    });

    service = TestBed.inject(DrinksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of drinks', () => {
    const mockResponse = {drinks: [{idDrink: '1', strDrink: 'Mock Drink'}]};

    service.getDrinks().subscribe((drinks) => {
      expect(drinks).toBeTruthy();
      expect(drinks?.length).toBe(1);
      expect(drinks![0].idDrink).toBe('1');
      expect(drinks![0].strDrink).toBe('Mock Drink');
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/filter.php?a=Alcoholic`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get drink details', () => {
    const mockResponse = {drinks: [{idDrink: '1', strDrink: 'Mock Drink'}]};
    const drinkId = '1';

    service.getDrinkDetails(drinkId).subscribe((drinkDetails) => {
      expect(drinkDetails).toBeTruthy();
      expect(drinkDetails?.idDrink).toBe('1');
      expect(drinkDetails?.strDrink).toBe('Mock Drink');
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/lookup.php?i=${drinkId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DrinksService } from './drinks.service';

describe('DrinksService', () => {
  let service: DrinksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrinksService],
    });

    service = TestBed.inject(DrinksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve alcoholic drinks', () => {
    const mockResponse = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1' },
        { idDrink: '2', strDrink: 'Drink 2' },
      ],
    };

    service.getDrinks().subscribe((drinks) => {
      expect(drinks.length).toBe(2);
      expect(drinks[0].idDrink).toBe('1');
      expect(drinks[1].strDrink).toBe('Drink 2');
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/filter.php?a=Alcoholic`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // Add more test cases for other methods as needed
});

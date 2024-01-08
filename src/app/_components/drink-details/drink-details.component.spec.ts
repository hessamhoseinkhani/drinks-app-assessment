import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {DrinkDetailsComponent} from './drink-details.component';
import {DrinksService} from '../../_services/drinks.service';
import {DrinkDetails} from '../../_models/drink-details';

describe('DrinkDetailsComponent', () => {
  let component: DrinkDetailsComponent;
  let fixture: ComponentFixture<DrinkDetailsComponent>;
  let activatedRoute: ActivatedRoute;
  let drinksService: jasmine.SpyObj<DrinksService>;

  const mockDrinkDetails: DrinkDetails = {
    idDrink: '1',
    strDrink: 'Mock Drink',
    strIngredient1: 'Ingredient 1',
    strMeasure1: '2 oz',
  } as DrinkDetails;

  beforeEach(() => {
    activatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1'),
        },
      },
    } as any;

    drinksService = jasmine.createSpyObj('DrinksService', ['getDrinkDetails']);

    TestBed.configureTestingModule({
      imports: [DrinkDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: DrinksService, useValue: drinksService},
      ],
    });

    fixture = TestBed.createComponent(DrinkDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display drink details on initialization', () => {
    drinksService.getDrinkDetails.and.returnValue(of(mockDrinkDetails));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.drink).toEqual(mockDrinkDetails);
  });

  it('should handle loading error', () => {
    const errorMessage = 'An error occurred while loading drink details.';
    drinksService.getDrinkDetails.and.returnValue(throwError(errorMessage));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.drink).toBeUndefined();
  });

  it('should set ingredients', () => {
    component.drink = mockDrinkDetails;
    component.setIngredients();

    expect(component.ingredients).toEqual(['2 oz of Ingredient 1']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

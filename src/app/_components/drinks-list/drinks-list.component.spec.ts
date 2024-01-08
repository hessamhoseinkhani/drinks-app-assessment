import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DrinksListComponent} from './drinks-list.component';
import {DrinksService} from '../../_services/drinks.service';
import {Drink} from '../../_models/drink';

describe('DrinksListComponent', () => {
  let component: DrinksListComponent;
  let fixture: ComponentFixture<DrinksListComponent>;
  let drinksService: jasmine.SpyObj<DrinksService>;

  const mockDrinks: Drink[] = [{idDrink: '1', strDrink: 'Mock Drink 1'} as Drink];

  beforeEach(() => {
    drinksService = jasmine.createSpyObj('DrinksService', ['getDrinks']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {provide: DrinksService, useValue: drinksService},
        {provide: ActivatedRoute, useValue: {}},
      ],
    });

    fixture = TestBed.createComponent(DrinksListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display drinks on initialization', () => {
    drinksService.getDrinks.and.returnValue(of(mockDrinks));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.drinks).toEqual(mockDrinks);
  });

  it('should handle loading error', () => {
    const errorMessage = 'An error occurred while loading drinks.';
    drinksService.getDrinks.and.returnValue(throwError(errorMessage));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.drinks).toEqual([]);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

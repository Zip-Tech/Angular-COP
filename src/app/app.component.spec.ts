import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockLocationStrategy } from '@angular/common/testing';

describe('AppComponent', () => {
  let store: MockStore;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const initialState = { loggedIn: false };
  let LocationStrategy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-poc'`, () => {
    expect(component.title).toEqual('angular-poc');
  });

  it('should ngOnInit call', async () => {
    component.ngOnInit();
    expect(component.dispatchUser).toHaveBeenCalled();
  });

});

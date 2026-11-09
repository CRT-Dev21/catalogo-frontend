import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('links to the movie catalogue', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const catalogueLink =
      element.querySelector<HTMLAnchorElement>('a[routerLink="/movies"]');

    expect(catalogueLink?.getAttribute('href')).toBe('/movies');
  });
});

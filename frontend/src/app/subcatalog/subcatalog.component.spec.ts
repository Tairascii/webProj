import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatalogComponent } from './subcatalog.component';

describe('SubcatalogComponent', () => {
  let component: SubcatalogComponent;
  let fixture: ComponentFixture<SubcatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

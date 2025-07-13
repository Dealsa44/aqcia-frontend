import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAnimationComponent } from './product-animation.component';

describe('ProductAnimationComponent', () => {
  let component: ProductAnimationComponent;
  let fixture: ComponentFixture<ProductAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

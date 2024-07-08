import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComponent } from './produto.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

describe('ProdutoComponent', () => {
  let component: ProdutoComponent;
  let fixture: ComponentFixture<ProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoComponent],
      imports: [HttpClientModule],
      providers: [MessageService]
    });
    fixture = TestBed.createComponent(ProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

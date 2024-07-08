import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

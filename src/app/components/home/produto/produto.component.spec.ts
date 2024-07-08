import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ProdutoComponent } from './produto.component';
import { ProdutoService } from '../../../services/produto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { IProduto } from 'src/app/interfaces/iProduto';
import { ICategoria } from 'src/app/interfaces/iCategoria';

describe('ProdutoComponent', () => {
  let component: ProdutoComponent;
  let fixture: ComponentFixture<ProdutoComponent>;
  let produtoService: ProdutoService;
  let categoriaService: CategoriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, MessageService, HttpTestingController],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]

    });
    fixture = TestBed.createComponent(ProdutoComponent);
    component = fixture.componentInstance;
    categoriaService = TestBed.inject(CategoriaService);
    produtoService = TestBed.inject(ProdutoService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Produtos`, () => {
    const fixture = TestBed.createComponent(ProdutoComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Produtos');
  });

  it('should return the maximum id and sum 1', () => {
    component.produtoTable = [
      { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' },
      { id: 2, name: 'Teste', categoria: 'Teste', preco: 200, quantidade: 20, descricao: 'Teste' },
      { id: 3, name: 'Teste', categoria: 'Teste', preco: 300, quantidade: 30, descricao: 'Teste' }
    ]
    const maxId = component.getMaxIdProdutosAndSumOne();
    expect(maxId).toBe(4);
  });

  it('should load produtos', () => {
    const mockProdutos: IProduto[] = [
      { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' },
      { id: 2, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' }
    ]

    jest.spyOn(produtoService, 'loadProdutos').mockReturnValue(of(mockProdutos))

    component.loadProdutos();

    expect(component.produtoTable).toEqual(mockProdutos);
    expect(produtoService.loadProdutos).toHaveBeenCalled();
  });

  it('should load categorias', () => {
    const mockCategorias: ICategoria[] = [
      { id: 1, name: 'Teste', status: 'Ativa' },
      { id: 2, name: 'Teste', status: 'Ativa' }
    ];
    jest.spyOn(categoriaService, 'loadCategorias').mockReturnValue(of(mockCategorias))
    component.loadCategorias();
    expect(component.categorias).toEqual(mockCategorias);
    expect(categoriaService.loadCategorias).toHaveBeenCalled();
  });

  it('should save the produto', () => {
    const produto = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' } as IProduto;
    component.produto = produto;
    jest.spyOn(produtoService, 'saveProdutos').mockReturnValue(of(produto))
    component.saveProduto()
    expect(produtoService.saveProdutos).toHaveBeenCalledWith(produto);
    expect(component.produtoTable).toContain(produto);
  });

  it('should delete the produto', () => {
    const mockProduto = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' };
    component.produtoSelected = mockProduto;
    jest.spyOn(produtoService, 'deleteProdutos').mockReturnValue(of(mockProduto))
    component.confirmDelete();
    expect(produtoService.deleteProdutos).toHaveBeenCalledWith(mockProduto.id);
    expect(component.produtoTable).not.toContain(mockProduto);
  });

  it('should edit the produto', () => {
    const editedProduto = { id: 1, name: 'Teste', categoria: '', preco: 150, quantidade: 15, descricao: 'Teste' };
    jest.spyOn(produtoService, 'editProdutos').mockReturnValue(of(editedProduto));

    component.produtoTable = [
      { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' },
      { id: 2, name: 'Teste', categoria: 'Teste', preco: 200, quantidade: 20, descricao: 'Teste' }
    ];
    component.produtoSelected = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' };

    component.editProduto(editedProduto);

    expect(produtoService.editProdutos).toHaveBeenCalledWith(editedProduto);
    expect(component.produtoTable).toEqual([
      editedProduto,
      { id: 2, name: 'Teste', categoria: 'Teste', preco: 200, quantidade: 20, descricao: 'Teste' }
    ]);
  });

  it('should clear the produto', () => {
    component.visibleNewProduto = true;
    component.produtoEditDialog = true;
    component.produto = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' } as IProduto;
    component.categoriaSelected = 'Teste';

    component.clearProduto();

    expect(component.visibleNewProduto).toBe(false);
    expect(component.produtoEditDialog).toBe(false);
    expect(component.produto).toEqual({} as IProduto);
    expect(component.categoriaSelected).toBe('');
  });

  it('should set produtoEditDialog', () => {
    const produto: IProduto = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' };
    component.selectEditProduto(produto);
    expect(component.produtoEditDialog).toBe(true);
    expect(component.produtoSelected).toEqual(produto);
  });

  it('should set produtoDeleteDialog', () => {
    const produto: IProduto = { id: 1, name: 'Teste', categoria: 'Teste', preco: 100, quantidade: 10, descricao: 'Teste' };
    component.selectDeleteProduto(produto);
    expect(component.deleteProdutoDialog).toBe(true);
    expect(component.produtoSelected).toEqual(produto);
  });

  it('should set visibleNewProduto', () => {
    component.visibleNewProduto = false;
    component.categoriaSelected = 'Teste';
    component.openNewProduto();
    expect(component.visibleNewProduto).toBe(true);
    expect(component.categoriaSelected).toEqual('');
  });
});

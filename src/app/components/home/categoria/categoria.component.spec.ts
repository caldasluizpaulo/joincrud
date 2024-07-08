import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';

import { MessageService } from 'primeng/api';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from '../../../services/categoria.service';
import { ICategoria } from 'src/app/interfaces/iCategoria';
import { Table } from 'primeng/table';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;
  let categoriaService: CategoriaService;
  let httpMock: HttpTestingController;
  let messageService: MessageService;
  let table: Table;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, MessageService, HttpTestingController],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    categoriaService = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    table = { filterGlobal: jest.fn() } as unknown as Table;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Categorias`, () => {
    const fixture = TestBed.createComponent(CategoriaComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Categorias');
  });

  it('should return the maximum id and sum 1', () => {
    component.categoriaTable = [
      { id: 1, name: 'Teste', status: 'Ativa' },
      { id: 2, name: 'Teste', status: 'Ativa' },
      { id: 3, name: 'Teste', status: 'Ativa' }
    ]
    const maxId = component.getMaxIdProdutosAndSumOne();
    expect(maxId).toBe(4);
  });

  it('should open New', () => {
    component.openNew();
    expect(component.openNew).toBeTruthy();
  });

  it('should hideDialog', () => {
    component.hideDialog();
    expect(component.hideDialog).toBeTruthy();
  });

  it('should showDialog', () => {
    component.showDialog();
    expect(component.showDialog).toBeTruthy();
  });

  it('should load categorias', () => {
    const mockCategorias: ICategoria[] = [
      { id: 1, name: 'Teste', status: 'Ativa' }
    ];
    jest.spyOn(categoriaService, 'loadCategorias').mockReturnValue(of(mockCategorias))
    component.loadCategorias();
    expect(component.categoriaTable).toEqual(mockCategorias);
    expect(categoriaService.loadCategorias).toHaveBeenCalled();
  });

  it('should save the categoria', () => {
    const categoria = { id: 1, name: 'Teste', status: 'Ativa' } as ICategoria;
    component.categoria = categoria;
    jest.spyOn(categoriaService, 'saveCategorias').mockReturnValue(of(categoria))
    component.saveCategoria();
    expect(categoriaService.saveCategorias).toHaveBeenCalledWith(categoria);
    expect(component.categoriaTable).toContain(categoria);
  });

  it('should delete the categoria', () => {
    const mockCategoria = { id: 1, name: 'Teste', status: 'Ativa' };
    component.categoriaSelected = mockCategoria;
    jest.spyOn(categoriaService, 'deleteCategorias').mockReturnValue(of(mockCategoria))
    component.confirmDelete();
    expect(categoriaService.deleteCategorias).toHaveBeenCalledWith(mockCategoria.id);
    expect(component.categoriaTable).not.toContain(mockCategoria);
  });

  it('should edit the categoria', () => {
    const editedCategoria = { id: 1, name: 'Teste', status: 'Cancelada' };
    jest.spyOn(categoriaService, 'editCategorias').mockReturnValue(of(editedCategoria));

    component.categoriaTable = [
      { id: 1, name: 'Teste', status: 'Ativa' },
      { id: 2, name: 'Teste', status: 'Ativa' }
    ];
    component.categoriaSelected = { id: 1, name: 'Teste', status: 'Ativa' };

    component.editCategoria(editedCategoria);

    expect(categoriaService.editCategorias).toHaveBeenCalledWith(editedCategoria);
    expect(component.categoriaTable).toEqual([
      editedCategoria,
      { id: 2, name: 'Teste', status: 'Ativa' }
    ]);
  });

  it('should set categoriaEditDialog to be true and update categoriaSelected', () => {
    const categoria: ICategoria = { id: 1, name: 'Teste', status: 'Ativa' };
    component.selectEditCategoria(categoria);
    expect(component.categoriaEditDialog).toBe(true);
    expect(component.categoriaSelected).toEqual(categoria);
  });
});

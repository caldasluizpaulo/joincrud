import { ProdutoService } from './../../../services/produto.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategoria } from 'src/app/interfaces/iCategoria';
import { CategoriaService } from '../../../services/categoria.service';
import { IProduto } from 'src/app/interfaces/iProduto';
import { finalize, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit, OnDestroy {

  selectedCategorias: any;

  categoria: ICategoria = {} as ICategoria;
  categoriaSelected: ICategoria = {} as ICategoria;
  categoriaTable: ICategoria[] = [];

  categoriaColumns = [
    { field: 'id', header: 'Código' },
    { field: 'name', header: 'Descrição' },
    { field: 'status', header: 'Status' }
  ];

  title = 'Categorias';

  rowsPerPageOptions = [5, 10, 20];

  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * CONTROLES
   */
  categoriaEditDialog: boolean = false;
  deleteCategoriaDialog: boolean = false;
  categoriaSaveDialog: boolean = false;
  loadingCategoria: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadingCategoria = true;
    this.loadCategorias();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadCategorias() {
    this.categoriaService.loadCategorias()
    .pipe(
      finalize(() => (this.loadingCategoria = false) ),
      takeUntil(this.destroy$)
    )
    .subscribe((data: ICategoria[]) => {
      this.categoriaTable = data;
    })
  }

  saveCategoria() {
    this.categoriaSaveDialog = false;
    this.categoria.id = this.getMaxIdProdutosAndSumOne();
    this.categoria.status = 'Ativa';

    this.categoriaService.saveCategorias(this.categoria)
      .subscribe((data: ICategoria) => {
        this.categoriaTable.push(data);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria cadastrada com sucesso!' });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível salvar a categoria' });
      });
  }

  confirmDelete() {
    this.deleteCategoriaDialog = false;

    this.categoriaService.deleteCategorias(this.categoriaSelected.id)
      .subscribe((data: ICategoria) => {
        this.categoriaTable = this.categoriaTable.filter((val) => val.id !== this.categoriaSelected.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso!' });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'algo deu errado', detail: 'Não foi posível deletar a categoria.' });
      });
  }

  editCategoria(categoria: ICategoria) {
    this.categoriaEditDialog = false;
    this.categoriaSelected = { ...categoria };

    this.categoriaService.editCategorias(this.categoriaSelected)
      .subscribe((data: ICategoria) => {
        this.categoriaTable = this.categoriaTable.map((val) => {
          if (val.id === this.categoriaSelected.id) {
            val = this.categoriaSelected;
          }
          return val;
        });
        this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Categoria editada com sucesso!' });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'algo deu errado', detail: 'Não foi posível editar a categoria.' });
      });
  }

  getMaxIdProdutosAndSumOne(): number {
    const maxId: number = Math.max.apply(Math, this.categoriaTable.map((o: ICategoria) => o.id));
    return maxId + 1
  }


  onGlobalFilter(table: any, event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.categoriaSaveDialog = true;
  }

  selectDeleteCategoria(categoria: ICategoria) {
    let produtoList: IProduto[] = [];
    this.produtoService.loadProdutos()
    .pipe(
      finalize(() => {
        const produtoByCategoriaFind = produtoList.find((produto: IProduto) => produto.categoria === categoria.name);
        if (produtoByCategoriaFind) {
          this.messageService.add({ severity: 'warn', summary: 'atenção', detail: 'Não é posível deletar categoria com produtos associados' });
          this.categoriaSelected = {} as ICategoria;
          return this.deleteCategoriaDialog = false;;
        }
        this.categoriaSelected = { ...categoria };
        return this.deleteCategoriaDialog = true;
      })
    )
    .subscribe((data: IProduto[]) => {
      produtoList = data;
    });
  }

  selectEditCategoria(categoria: ICategoria) {
    this.categoriaEditDialog = true;
    this.categoriaSelected = { ...categoria };
  }

  hideDialog() {
    this.categoriaEditDialog = false;
  }

  showDialog() {
    this.categoriaSaveDialog = true;
  }


}

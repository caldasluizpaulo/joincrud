import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ICategoria } from 'src/app/interfaces/iCategoria';
import { IProduto } from 'src/app/interfaces/iProduto';
import { CategoriaService } from '../../../services/categoria.service';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, OnDestroy {

  produtoTable: IProduto[] = [];
  produto: IProduto = {} as IProduto;
  produtoSelected: IProduto = {} as IProduto;

  categorias: ICategoria[] = [];
  categoriaOptions: [{label: string, value: string}] = [{label: '', value: ''}];
  categoriaSelected: string = '';


  produtoColumns = [
    { field: 'id', header: 'Código' },
    { field: 'name', header: 'Descrição' },
    { field: 'preco', header: 'Preço' },
    { field: 'categoria', header: 'Categoria' },
    { field: 'quantidade', header: 'Quantidade' }
  ];

  selectedProdutos: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  deleteProdutoDialog: boolean = false;
  visibleNewProduto: boolean = false;
  produtoEditDialog: boolean = false;
  loadingProduto: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadingProduto = true;
    this.loadProdutos();
    this.loadCategorias()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onGlobalFilter(table: any, event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  selectEditProduto(produto: IProduto) {
    this.produtoEditDialog = true;
    this.categoriaSelected = produto.categoria;
    this.produtoSelected = { ...produto };
  }

  selectDeleteProduto(produto: IProduto) {
    this.deleteProdutoDialog = true;
    this.produtoSelected = { ...produto };
  }

  openNewProduto() {
    this.visibleNewProduto = true;
    this.categoriaSelected = '';
  }

  loadCategorias() {
    this.categoriaService.loadCategorias()
    .pipe(
      finalize(() => {
        if(this.categorias.length > 0) {
          this.categoriaOptions.pop();
          this.categorias.forEach((value) => {
            this.categoriaOptions.push({label: value.name, value: value.name});
          });
        }
      })
    )
    .subscribe((data: ICategoria[]) => {
      this.categorias = data.filter((categoria: ICategoria) => categoria.status === 'Ativa');
    })
  }

  loadProdutos() {
    this.produtoService.loadProdutos()
    .pipe(
      finalize(() => (this.loadingProduto = false)),
      takeUntil(this.destroy$)
    )
    .subscribe((data: IProduto[]) => {
      this.produtoTable = data;
    });
  }

  saveProduto() {
    this.visibleNewProduto = false;
    this.produto.id = this.getMaxIdProdutos();
    this.produto.categoria = this.categoriaSelected;

    this.produtoService.saveProdutos(this.produto)
    .pipe(
      finalize(() => (this.clearProduto()) )
    )
    .subscribe((data: IProduto) => {
      this.produtoTable.push(data);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto cadastrado com sucesso!' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível salvar o produto' });
    })
  }

  confirmDelete() {
    this.deleteProdutoDialog = false;

    this.produtoService.deleteProdutos(this.produtoSelected.id).subscribe((data: IProduto) => {
      this.produtoTable = this.produtoTable.filter((val) => val.id !== this.produtoSelected.id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto excluído com sucesso!' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível deletar o produto' });
    });
  }

  editProduto(produto: IProduto) {
    this.produtoEditDialog = false;
    this.produtoSelected = { ...produto };
    this.produtoSelected = { ...this.produtoSelected, categoria: this.categoriaSelected };

    this.produtoService.editProdutos(this.produtoSelected).subscribe((data: IProduto) => {
      this.produtoTable = this.produtoTable.map((val) => {
        if (val.id === this.produtoSelected.id) {
          val = this.produtoSelected;
        }
        return val;
      });
      this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Produto editado com sucesso!' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível editar o produto' });
    });
  }

  getMaxIdProdutos(): number {
    const maxId: number = Math.max.apply(Math, this.produtoTable.map((o: IProduto) => o.id));
    return maxId + 1
  }

  clearProduto() {
    this.visibleNewProduto = false;
    this.produtoEditDialog = false;
    this.produto = {} as IProduto;
    this.categoriaSelected = '';
  }

}

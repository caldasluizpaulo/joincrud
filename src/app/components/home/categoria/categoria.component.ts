import { Component, OnInit } from '@angular/core';
import { ICategoria } from 'src/app/interfaces/iCategoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  selectedCategorias: any;

  categorias: ICategoria[] = [];

  categoria: ICategoria = {} as ICategoria;

  /**
   * CATEGORIAS
   */
  categoriaTable: ICategoria[] = [];
    /* {
      id: 1,
      name: 'Teste',
      status: true
    },
    {
      id: 2,
      name: 'Teste',
      status: true
    }
  ]; */

  categoriaColumns = [
    { field: 'id', header: 'Código' },
    { field: 'name', header: 'Descrição' },
    { field: 'status', header: 'Status' }
  ];

  rowsPerPageOptions = [5, 10, 20];

  categoriaSelected: ICategoria = {} as ICategoria;

  categoriaEditDialog: boolean = false;
  deleteCategoriaDialog: boolean = false;

  submitted: boolean = false;

  visible: boolean = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.loadCategoria();
  }

  loadCategoria() {
    this.categoriaService.loadCategorias().subscribe((data: ICategoria[]) => {
      this.categoriaTable = data;
    })
  }

  saveCategoria() {
    console.log('Salvar categoria...');
    this.visible = false;
    this.submitted = true;
    this.categoria.id = this.getMaxIdCategoria();
    this.categoria.status = 'Ativa';

    this.categoriaService.saveCategorias(this.categoria)
      .subscribe((data: ICategoria) => {
        this.categoriaTable.push(data);
      });
  }

  confirmDelete() {
    this.deleteCategoriaDialog = false;
    console.log('Deletar Categorias...', this.categoriaSelected);

    this.categoriaService.deleteCategorias(this.categoriaSelected.id)
      .subscribe((data: ICategoria) => {
        console.log(data);
        this.categoriaTable = this.categoriaTable.filter((val) => val.id !== this.categoriaSelected.id);
      });
  }

  editCategoria(categoria: ICategoria) {
    this.categoriaEditDialog = false;
    this.categoriaSelected = { ...categoria };
    console.log('Editar Categorias...', this.categoriaSelected);

    this.categoriaService.editCategorias(this.categoriaSelected)
      .subscribe((data: ICategoria) => {
        this.categoriaTable = this.categoriaTable.map((val) => {
          if (val.id === this.categoriaSelected.id) {
            val = this.categoriaSelected;
          }
          return val;
        })
      });
  }

  getMaxIdCategoria(): number {
    const maxId: number = Math.max.apply(Math, this.categoriaTable.map((o: ICategoria) => o.id));
    return maxId + 1
  }


  onGlobalFilter(table: any, event: Event) {
    console.log(table);
    console.log(event);
    const value: string = (event.target as HTMLInputElement).value;
    console.log(value);
    table.filterGlobal(value, 'contains');
}

  openNew() {
    this.visible = true;
  }

  selectDeleteCategoria(categoria: ICategoria) {
    this.deleteCategoriaDialog = true;
    this.categoriaSelected = { ...categoria };
  }

  selectEditCategoria(categoria: ICategoria) {
    this.categoriaEditDialog = true;
    this.categoriaSelected = { ...categoria };
  }

  hideDialog() {
    this.categoriaEditDialog = false;
    this.submitted = false;
  }

  showDialog() {
    this.visible = true;
  }


}

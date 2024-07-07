import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/iCategoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  loadCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${this.urlApi}/categorias`);
  }

  saveCategorias(categoria: ICategoria): Observable<ICategoria> {
    return this.http.post<ICategoria>(`${this.urlApi}/categorias`, categoria);
  }

  deleteCategorias(idCategoria: number): Observable<ICategoria> {
    return this.http.delete<ICategoria>(`${this.urlApi}/categorias/${idCategoria}`);
  }

  editCategorias(categoria: ICategoria): Observable<ICategoria> {
    return this.http.put<ICategoria>(`${this.urlApi}/categorias/${categoria.id}`, categoria);
  }
}

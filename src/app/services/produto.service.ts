import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduto } from '../interfaces/iProduto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private urlApi = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  loadProdutos(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(`${this.urlApi}/produtos`)
  }

  saveProdutos(produto: IProduto): Observable<IProduto> {
    return this.http.post<IProduto>(`${this.urlApi}/produtos`, produto)
  }

  deleteProdutos(id: number): Observable<IProduto> {
    return this.http.delete<IProduto>(`${this.urlApi}/produtos/${id}`)
  }

  editProdutos(produto: IProduto): Observable<IProduto> {
    return this.http.put<IProduto>(`${this.urlApi}/produtos/${produto.id}`, produto)
  }
}

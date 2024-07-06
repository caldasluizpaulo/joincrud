import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUser } from '../interfaces/iUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Metodo para realizar pesquisa do usuário por email
   * @param email email do usuário
   * @returns retorna observable com usuário pesquisado
   */
  findUserByEmail(email: string): Observable<iUser[]> {
    return this.http.get<iUser[]>(`${this.urlApi}/users?email=${email}`);
  }

  // TODO
  /**
   * Metodo para cadastrar um usuário
   * @param user objeto usuário
   * @returns retorna observable do usuario cadastrado
   */
  saveUser(user: iUser): Observable<iUser> {
    return this.http.post<iUser>(`${this.urlApi}/users`, user);
  }

  /**
   * Metodo para registrar o usuário na sessão ativa
   * @param userEmailJoin email do usuário
   */
  setUserSession(userEmailJoin: string) {
    sessionStorage.setItem('userJoin', userEmailJoin as string);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://reqres.in/api';

  constructor( private http: HttpClient) { }


  getUsers(){
    return this.http.get(`${this.url}/users?per_page=6&delay=4`)
              .pipe(
                map( resp => resp['data'] )
              );
  }


  getUserByID(id: string){
    return this.http.get(`${this.url}/users/${id}`)
              .pipe(
                map( resp => resp['data'] )
              );
  }



}

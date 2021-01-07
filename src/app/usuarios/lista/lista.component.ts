import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UsuariosService } from '../../services/usuarios.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any = null;

  constructor( 
    //public usuarioServices: UsuariosService
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    // this.usuarioServices.getUsers().subscribe( users => {
    // console.log(users);
    //   this.usuarios = users  
    // })

    this.store.select('usuarios')
      .subscribe( ({users, loading, error}) => {
        this.usuarios = users;
        this.loading =loading;
        this.error = error;  
    })

    this.store.dispatch( cargarUsuarios() )
  }

}

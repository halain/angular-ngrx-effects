import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from "rxjs/operators";
import * as usuariosActions from "../actions";
import { UsuariosService } from '../../services/usuarios.service';
import { of } from "rxjs";


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuariosService
      ) {}


    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ), //action a escuchar cuando se realiza el dispatch de la misma
            //tap( data => console.log('effect tap',data) ),
            mergeMap( //observable que se encarga de pedir la informacion, dispara un nuevo observable y lo mezcla con el observable anterior
                ( action ) => this.usuarioService.getUserByID( action.id )
                    .pipe(
                        //tap(data => console.log('mergeMap effect getUserByID',data) ),
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user})),
                        catchError( error => of( usuariosActions.cargarUsuarioError({ payload: error }) ) )
                    )
            ) 
        )
    );
    

}
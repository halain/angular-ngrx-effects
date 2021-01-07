import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from "rxjs/operators";
import * as usuariosActions from "../actions";
import { UsuariosService } from '../../services/usuarios.service';
import { of } from "rxjs";


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuariosService
      ) {}


    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ), //action a escuchar cuando se realiza el dispatch de la misma
            //tap( data => console.log('effect tap',data) ),
            mergeMap( //observable que se encarga de pedir la informacion, dispara un nuevo observable y lo mezcla con el observable anterior
                () => this.usuarioService.getUsers()
                    .pipe(
                        //tap(data => console.log('mergeMap effect getUsers',data) ),
                        map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users})),
                        catchError( error => of( usuariosActions.cargarUsuariosError({ payload: error }) ) )
                    )
            ) 
        )
    );
    

}
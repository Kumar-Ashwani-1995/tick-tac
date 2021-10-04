import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  
  {path :"",redirectTo:"boards",pathMatch:"full"},
  { path: 'boards', loadChildren: () => import('./board/board.module').then(m => m.BoardModule) },
  { path : "**" , loadChildren: () => import('./board/board.module').then(m => m.BoardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

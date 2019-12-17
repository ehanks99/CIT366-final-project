import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MoviesResolverService } from './movies/movies-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, children: [
    // { path: '', component: MoviesComponent, pathMatch: 'full' },
    { path: 'new', component: MovieEditComponent },
    { path: ':id', component: MovieDetailComponent, resolve: [MoviesResolverService] }, 
    { path: ':id/edit', component: MovieEditComponent, resolve: [MoviesResolverService] }
  ]}
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

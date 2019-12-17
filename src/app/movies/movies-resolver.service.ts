import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesResolverService implements Resolve<Movie[]> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      return this.movieService.fetchingMovies();
  }
}
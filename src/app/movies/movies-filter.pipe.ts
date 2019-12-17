import { Pipe, PipeTransform } from '@angular/core';

import { Movie } from './movie.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {
  transform(movies: Movie[], searchTerm: string): Movie[] {
    if (!searchTerm || searchTerm === ""){
      return movies;
    }

    let term = searchTerm;

    let filteredArray: Movie[] = [];
    filteredArray = movies.filter(
      (movie: Movie) => 
        movie.name.toLowerCase().includes(term.toLowerCase())
        // see if it matches the actors
        || movie.actors.some(function(v){ return v.toLowerCase().indexOf(term)>=0 })
        // see if it matches the directors
        || movie.directors.some(function(v){ return v.toLowerCase().indexOf(term)>=0 })
        // see if it matches the genres
        || movie.genres.some(function(v){ return v.toLowerCase().indexOf(term)>=0 })
    );

    // if (filteredArray.length < 1) {
    //   return movies;
    // }
    
    return filteredArray;
  }
}

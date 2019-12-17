import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieListChangedEvent = new Subject<Movie[]>();
  private movies: Movie[] = [];

  constructor(private http: HttpClient) { }

  getMovies() {
    // this.http.get("http://localhost:3000/api/movies")
    this.http.get("https://fathomless-wildwood-37339.herokuapp.com/api/movies")
    .subscribe(
      // success function
      (returnInfo: {message: String, movies: Movie[]}) => {
        this.movies = returnInfo.movies;

        this.movieListChangedEvent.next(this.movies.slice());
      },
      // error function
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMovie(id: string): Movie {
    for (let movie of this.movies) {
      if (movie.movieId === id) {
        return movie;
      }
    }

    return null;
  }

  fetchingMovies() {
    // return this.http.get<{message: String, movies: Movie[]}>("http://localhost:3000/api/movies")
    return this.http.get<{message: String, movies: Movie[]}>("https://fathomless-wildwood-37339.herokuapp.com/api/movies")
      .pipe(tap(movieInfo => {
          this.movies = movieInfo.movies;
        }
      )
    );
  }

  deleteMovie(movie: Movie) {
    if (!movie) {
      return;
    }
    
    // this.http.delete<{message: string}>("http://localhost:3000/api/movies/" + movie.movieId)
    this.http.delete<{message: string}>("https://fathomless-wildwood-37339.herokuapp.com/api/movies/" + movie.movieId)
    .subscribe(
      (returnInfo) => {
          let pos = this.movies.indexOf(movie);
          this.movies.splice(pos, 1);
          this.movieListChangedEvent.next(this.movies.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addMovie(newMovie: Movie) {
    if (!newMovie) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newMovie.movieId = "";
    const strMovie = JSON.stringify(newMovie);
    
    // this.http.post<{message: string, movie: Movie}>("http://localhost:3000/api/movies", strMovie, {headers: headers})
    this.http.post<{message: string, movie: Movie}>("https://fathomless-wildwood-37339.herokuapp.com/api/movies", strMovie, {headers: headers})
      .subscribe(
        (movieInfo) => {
          // we want to use the returned movie because it has the correct "id" field filled in (from the database)
          this.movies.push(movieInfo.movie);
          this.movieListChangedEvent.next(this.movies.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  updateMovie(originalMovie: Movie, newMovie: Movie) {
    if (!originalMovie || !newMovie) {
      return;
    }

    let pos = this.movies.indexOf(originalMovie);
    if (pos < 0) {
      return;
    }
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newMovie.movieId = originalMovie.movieId;
    const strMovie = JSON.stringify(newMovie);
    
    // this.http.put<{message: string, movie: Movie}>("http://localhost:3000/api/movies/" + originalMovie.movieId,
    //                 strMovie,
    //                 {headers: headers})
    this.http.put<{message: string, movie: Movie}>("https://fathomless-wildwood-37339.herokuapp.com/api/movies/" + originalMovie.movieId,
                    strMovie,
                    {headers: headers})
      .subscribe(
        (movieInfo) => {
          // don't need to use the returned movie here because we already have the id saved from
          // the original movie, but it's fine if we do use it
          this.movies[pos] = movieInfo.movie;
          this.movieListChangedEvent.next(this.movies.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

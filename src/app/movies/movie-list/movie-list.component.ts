import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  searchTerm: String = "";
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // this.movies = this.movieService.getMovies();
    this.subscription = this.movieService.movieListChangedEvent.subscribe(
      (contacts: Movie[]) => {
        this.movies = contacts;
      }
    );

    this.movieService.getMovies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

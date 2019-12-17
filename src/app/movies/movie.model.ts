import { Injectable } from '@angular/core';

@Injectable()
export class Movie {
  constructor(
    // public _id: string,
    public movieId: string, 
    public imageUrl: string, 
    public name: string, 
    public summary: string, 
    public rating: string, 
    public actors: string[] = null, // set default to be null
    public directors: string[] = null,
    public genres: string[] = null
  ) { }
}
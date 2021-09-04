import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  getMovies(page: number = 1) {
    return this.httpClient.get(`${environment.baseUrl}/3/movie/popular?api_key=${environment.apiKey}&language=es-ES&page=${page}`);
  }
  getMovie(movieId: number | string){
    return this.httpClient.get(`${environment.baseUrl}/3/movie/${movieId}?api_key=${environment.apiKey}&language=en-US`);
  }
}

import { Injectable } from '@angular/core';
import { MovieOption } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  getMovies(options: MovieOption) {
    let url: string = `${environment.baseUrl}/3/movie/popular?api_key=${environment.apiKey}&language=es-ES&page=${options.page}`;
    if(options.q) url += `&q=${options.q}`;
    return this.httpClient.get(url);
  }
  getMovie(movieId: number | string){
    return this.httpClient.get(`${environment.baseUrl}/3/movie/${movieId}?api_key=${environment.apiKey}&language=en-US`);
  }
}

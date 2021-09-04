import { Component, OnInit } from '@angular/core';
import { Paginate } from '../paginate/paginate.model';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: Movie[];

  constructor( private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(( paginate: Paginate<Movie[]>) => {
      const movies: Movie[] = paginate.results;
      this.movies = movies;
      console.log(movies);
    });
  }

}

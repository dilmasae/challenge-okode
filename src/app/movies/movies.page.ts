import { Component, OnInit } from '@angular/core';
import { Paginate } from '../paginate/paginate.model';
import { Movie, MovieOption } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  q: string = "";
  isFetching: boolean = false;
  isFetchingNextPage: boolean = false;
  movies: Movie[];

  constructor( private moviesService: MoviesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.fetchData({ page: 1 });
  }

  private fetchData(options: MovieOption) {
    this.moviesService.getMovies({ page: options.page, q: options.q }).subscribe(( paginate: Paginate<Movie[]>) => {
      const movies: Movie[] = paginate.results;

      // Not found search parameter in API documentation
      if(options.q) {
        this.movies = movies.filter((movie: Movie) => {
          return movie.title.toLocaleLowerCase().includes( options.q.toLocaleLowerCase() );
        });
      }
      else this.movies = movies;
      
      this.isFetching = false;
      this.isFetchingNextPage = false;
    });
  }

  handleSearch() {
    this.fetchData({ page: 1, q: this.q });
  }

}

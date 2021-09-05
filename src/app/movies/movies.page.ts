import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Paginate } from '../paginate/paginate.model';
import { Movie, MovieOption } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  page: number = 1;
  total_pages: number = 1;

  q: string = "";
  isFetching: boolean = false;
  movies: Movie[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor( private moviesService: MoviesService) { }

  ngOnInit() {
    this.isFetching = true;
    this.fetchData({ page: 1 });
  }

  private fetchData(options: MovieOption) {
    this.moviesService.getMovies({ page: options.page, q: options.q }).subscribe(( paginate: Paginate<Movie[]>) => {
      
      const { page, total_pages } = paginate;
      this.page = page;
      this.total_pages = total_pages;

      const movies: Movie[] = paginate.results;

      // Not found search parameter in API documentation
      if(options.q) {
        this.movies = movies.filter((movie: Movie) => {
          return movie.title.toLocaleLowerCase().includes( options.q.toLocaleLowerCase() );
        });
      }
      else this.movies = movies;
      
      this.isFetching = false;
    });
  }

  handleSearch() {
    this.fetchData({ page: 1, q: this.q });
  }

  loadData(event) {

    this.moviesService.getMovies({ page: this.page + 1, q: this.q }).subscribe(( paginate: Paginate<Movie[]>) => {
      
      const { page, total_pages } = paginate;
      this.page = page;
      this.total_pages = total_pages;

      const movies: Movie[] = paginate.results;

      this.movies = [
        ...this.movies,
        ...movies,
      ];

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if(this.page >= this.total_pages) {
        event.target.disabled = true;
      }

    });

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}

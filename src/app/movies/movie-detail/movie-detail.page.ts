import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  movie: Movie | null;
  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {

      const recipedId = paramMap.get('movieId');
       
      this.movieService.getMovie(recipedId).subscribe((movie: Movie) => {
        this.movie = movie;
      });
    });
  }

}

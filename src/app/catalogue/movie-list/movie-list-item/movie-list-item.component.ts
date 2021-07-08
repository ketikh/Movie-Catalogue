import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListItem } from '../../catalogue.model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css'],
})
export class MovieListItemComponent implements OnInit {
  @Input() item: MovieListItem;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate([`catalogue/${this.item.data.id}`]);
  }

  ngOnInit() {}
}

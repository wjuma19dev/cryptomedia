import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  @Input({ required: true }) articles!: IArticle[];

  constructor() {}
}

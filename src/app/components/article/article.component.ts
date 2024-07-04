import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input({ required: true }) article!: IArticle;
  @Input({ required: true }) index!: number;

  constructor() {}

  ngOnInit() {}
}

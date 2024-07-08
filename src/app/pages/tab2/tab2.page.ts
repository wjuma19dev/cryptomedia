import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public categorySelected: string = this.categories[0];
  public articles: IArticle[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.categorySelected)
      .subscribe({
        next: (articles) => {
          this.articles = [...articles];
          console.log(articles);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onChange(event: any) {
    this.categorySelected = event.detail.value;
    this.newsService
      .getTopHeadlinesByCategory(this.categorySelected)
      .subscribe({
        next: (articles) => {
          this.articles = [...articles];
          console.log(articles);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}

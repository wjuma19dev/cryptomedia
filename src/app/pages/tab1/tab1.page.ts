import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public articles: IArticle[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.topHeadlines().subscribe({
      next: (articles) => {
        this.articles.push(...articles);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

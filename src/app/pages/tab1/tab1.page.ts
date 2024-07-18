import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  ionInfiniteScroll!: IonInfiniteScroll;

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

  loadMore() {
    this.newsService.getTopHeadlinesByCategory('business', true).subscribe({
      next: (articles) => {
        if (
          this.articles[this.articles.length - 1].title ===
          articles[articles.length - 1].title
        ) {
          setTimeout(() => {
            this.ionInfiniteScroll.disabled = true;
            return;
          }, 100);
        }

        this.articles = articles;
        this.ionInfiniteScroll.complete();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

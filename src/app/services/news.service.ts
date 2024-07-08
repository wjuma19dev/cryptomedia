import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {
  IArticle,
  IArticlesByCategoryAndPage,
  INewsResponse,
} from '../types/news.type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private APY_KEY = environment.API_KEY;
  private BASE_URL = environment.BASE_URL;
  private articlesByCategoryAndPage: IArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery(endpoint: string): Observable<INewsResponse> {
    return this.http.get<INewsResponse>(`${this.BASE_URL}/${endpoint}`, {
      params: {
        apiKey: this.APY_KEY,
        country: 'us',
      },
    });
  }

  topHeadlines(): Observable<IArticle[]> {
    return this.executeQuery('top-headlines').pipe(
      map(({ articles }) => articles)
    );
  }

  getTopHeadlinesByCategory(category: string): Observable<IArticle[]> {
    return this.executeQuery(`top-headlines?category=${category}`).pipe(
      map(({ articles }) => articles)
    );
  }

  private getArticlesByCategory(category: string): Observable<IArticle[]> {
    if (Object.keys(this.articlesByCategoryAndPage[category])) {
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(map(({ articles }) => articles));
  }
}

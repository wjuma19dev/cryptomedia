import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {
  IArticle,
  IArticlesByCategoryAndPage,
  INewsResponse,
} from '../types/news.type';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private APY_KEY = environment.API_KEY;
  private BASE_URL = environment.BASE_URL;
  private articlesByCategoryAndPage: IArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery(endpoint: string): Observable<INewsResponse> {
    // console.log('Get HTTP realized');
    return this.http.get<INewsResponse>(`${this.BASE_URL}/${endpoint}`, {
      params: {
        apiKey: this.APY_KEY,
        country: 'us',
      },
    });
  }

  topHeadlines(): Observable<IArticle[]> {
    return this.getArticlesByCategory('business');
    // return this.executeQuery('top-headlines').pipe(
    //   map(({ articles }) => articles)
    // );
  }

  getTopHeadlinesByCategory(
    category: string,
    loadMode: boolean = false
  ): Observable<IArticle[]> {
    if (loadMode) {
      return this.getArticlesByCategory(category);
    }
    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }
    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<IArticle[]> {
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // Exist
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length === 0)
          return this.articlesByCategoryAndPage[category].articles;
        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [
            ...this.articlesByCategoryAndPage[category].articles,
            ...articles,
          ],
        };
        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}

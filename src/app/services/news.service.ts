import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IArticle, INewsResponse } from '../types/news.type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private APY_KEY = environment.API_KEY;

  constructor(private http: HttpClient) {}

  topHeadlines(): Observable<IArticle[]> {
    return this.http
      .get<INewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`, {
        params: {
          apiKey: this.APY_KEY,
        },
      })
      .pipe(map(({ articles }) => articles));
  }
}

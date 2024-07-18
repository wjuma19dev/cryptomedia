import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  articles: IArticle[] = [];

  constructor(private storageService: StorageService) {}
  

  ngOnInit (): void {
    this.storageService.articlesReload.subscribe(articles => {
      this.articles = articles;
    })
  }

}

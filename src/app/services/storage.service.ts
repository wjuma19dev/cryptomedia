import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IArticle } from '../types/news.type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: IArticle[] = [];

  articlesReload = new EventEmitter<IArticle[]>();

  constructor(private storage: Storage) {
    this.init();
  }

  isArticleInFavorite( article: IArticle ): boolean {
    return !!this._localArticles.find(a => a.title === article.title);
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  async saveAndRemoveArticle( article: IArticle ) {

    const existsArticle = this._localArticles.find( a => a.title === article.title );

    if(existsArticle) {
      this._localArticles = this._localArticles.filter( a => a.title !== article.title);
    } else {
      this._localArticles = [ article, ...this._localArticles ];
    }

    await 
    
    this._storage?.set('articles', this._localArticles);
    this.loadFavorites();
  }

  async loadFavorites() {
    try {
      const articles = await this._storage?.get('articles');
      this._localArticles = articles || [];
      this.articlesReload.emit([...this._localArticles]);
    } catch (error) {
      throw Error('An Error Ocurred!');
    }
  }

}

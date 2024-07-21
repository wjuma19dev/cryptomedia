import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ActionSheetController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { IArticle } from 'src/app/types/news.type';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input({ required: true }) article!: IArticle;
  @Input({ required: true }) index!: number;

  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService
  ) {}

  async openArticle() {
    if (this.platform.is('desktop')) {
      // REVIEW: Open in a web browser with JS
      window.open(this.article.url, 'blank');
    } else {
      // REVIEW: @capacitor/browser
      await Browser.open({ url: this.article.url });
    }
  }

  async openActionSheet() {


    // Verify is the article exists in favorite
    const isFavorite = this.storageService.isArticleInFavorite(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode: 'md',
      buttons: [
        {
          text: 'Shared',
          icon: 'share-outline',
          handler: async () => {
            await Share.share({
              title: this.article.title,
              text: this.article.description,
              url: this.article.url,
              dialogTitle: this.article.author,
            });
          }
        },
        {
          text: isFavorite ? 'Remove favorite' : 'Favorites',
          icon: isFavorite ? 'heart' : 'heart-outline',
          handler: () => {
            this.storageService.saveAndRemoveArticle(this.article);
          }
        },
        {
          role: 'cancel',
          text: 'Cancel',
          icon: 'trash-outline',
          data: {
            action: 'cancel'
          }
        }
      ]
    });
    await actionSheet.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  userDetails: any = {};

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  getData() {
    this.dataService
      .getUserWallet(this.authService.currentUser.id)
      .subscribe((resp) => {
        this.userDetails = resp;
      });
  }

  ionViewWillEnter() {
    this.getData();
    this.menuCtrl.close();
  }

  doRefresh(event) {
    this.dataService
      .getUserWallet(this.authService.currentUser.id)
      .subscribe((resp) => {
        this.userDetails = resp;
        event.target.complete();
      });
  }
}

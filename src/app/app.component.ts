import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private navCtrl: NavController
  ) {}

  logout() {
    this.authService.logOut();
  }
}

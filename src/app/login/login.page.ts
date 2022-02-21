import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordVisible = false;
  username = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {}

  login() {
    const obj = { username: this.username, password: this.password };
    this.authService.login(obj).subscribe(
      (resp) => {
        if (
          this.authService.currentUser?.role !== 'Chief' &&
          this.authService.currentUser?.role !== 'Attendant'
        ) {
          this.authService.logOut();
          this.toast.dark('Check your credentials');
        } else {
          this.navCtrl.navigateRoot('/slips', {
            animationDirection: 'forward',
          });
        }
      },
      (err) => {
        this.toast.dark('Check your credentials');
      }
    );
  }
}

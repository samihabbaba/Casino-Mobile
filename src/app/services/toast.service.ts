import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async success(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }

  async danger(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }

  async dark(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'dark',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  activeVariation: string = 'pending';

  constructor(
    private toast: ToastService,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  doRefresh(event) {
    console.log(event);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  segmentChanged(e: any) {
    const destination = e.detail.value;
    if (this.activeVariation === 'pending' && destination === 'submitted') {
      this.animateLeftToRight('pending', 'submitted');
    }
    if (this.activeVariation === 'pending' && destination === 'history') {
      this.animateLeftToRight('pending', 'history');
    }
    if (this.activeVariation === 'submitted' && destination === 'history') {
      this.animateLeftToRight('submitted', 'history');
    }
    if (this.activeVariation === 'submitted' && destination === 'pending') {
      this.animateRightToLeft('submitted', 'pending');
    }
    if (this.activeVariation === 'history' && destination === 'submitted') {
      this.animateRightToLeft('history', 'submitted');
    }
    if (this.activeVariation === 'history' && destination === 'pending') {
      this.animateRightToLeft('history', 'pending');
    }
    this.activeVariation = destination;
  }

  animateLeftToRight(from: string, to: string) {
    this.animationCtrl
      .create()
      .addElement(document.querySelector('.' + from))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

    this.animationCtrl
      .create()
      .addElement(document.querySelector('.' + to))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
  }

  animateRightToLeft(from: string, to: string) {
    this.animationCtrl
      .create()
      .addElement(document.querySelector('.' + to))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(document.querySelector('.' + from))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
  }
}

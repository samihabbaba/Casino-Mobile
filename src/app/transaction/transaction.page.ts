import { Component, OnInit } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  activeVariation: string = 'pending';

  pendingTransactions: any[] = [];
  submittedTransactions: any[] = [];
  historyTransactions: any[] = [];

  constructor(
    private toast: ToastService,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getTransactionPending();
    this.getTransactionSubmitted();
    this.getTransactionHistory();
  }

  doRefresh(event) {
    this.getTransactionPending();
    this.getTransactionSubmitted();
    this.dataService
      .getTransactions(this.authService.currentUser.id, false, true)
      .subscribe((resp) => {
        this.historyTransactions = resp;
        event.target.complete();
      });
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

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected = [];

  submitPending() {
    const arr: number[] = [];
    this.selected.forEach((x) => {
      arr.push(x.id);
    });
    this.dataService
      .submitPendingSlips(this.authService.currentUser.id, arr)
      .subscribe(
        (resp) => {
          this.toast.success('Successful');
          this.getTransactionPending();
          this.selected = [];
        },
        (err) => {
          this.toast.danger(err.error.Message);
        }
      );
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  deleteTransaction(item) {
    this.dataService.deleteTransaction(item.id).subscribe(
      (resp) => {
        this.toast.success('Deleted successfully');
        this.getTransactionPending();
      },
      () => {
        this.toast.danger('Something went wrong');
      }
    );
  }

  getTransactionPending() {
    this.dataService
      .getTransactions(this.authService.currentUser.id, true)
      .subscribe((resp) => {
        this.pendingTransactions = resp;
      });
  }

  getTransactionSubmitted() {
    this.dataService
      .getTransactions(this.authService.currentUser.id, false, false)
      .subscribe((resp) => {
        this.submittedTransactions = resp;
      });
  }

  getTransactionHistory() {
    this.dataService
      .getTransactions(this.authService.currentUser.id, false, true)
      .subscribe((resp) => {
        this.historyTransactions = resp;
      });
  }
}

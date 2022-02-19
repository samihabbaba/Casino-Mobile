import { Component, OnInit } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
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




  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected = [];
  // displayCheck(row) {
  //   return row.name !== 'Ethel Price';
  // }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    // event.stopPropagation()
    console.log('Activate Event', event);
  }

  deleteTransaction(item) {
    console.log(item)
  }

  movies = [
    {
      name: 'Escape Room',
      company: 'Columbia Pictures',
      genre: 'Horror',
    },
    {
      name: 'Rust Creek',
      company: 'IFC Films',
      genre: 'Drama',
    },
    {
      name: 'American Hangman',
      company: 'Hangman Productions',
      genre: 'Thriller',
    },
    {
      name: 'The Upside',
      company: 'STX Entertainment',
      genre: 'Comedy',
    },
    {
      name: 'Replicas',
      company: 'Entertainment Studios',
      genre: 'Sci-Fi',
    },
    {
      name: 'After Darkness',
      company: 'Grindstone Group',
      genre: 'Drama',
    },
    {
      name: 'Glass',
      company: 'Universal Pictures',
      genre: 'Superhero',
    },
    {
      name: 'Close',
      company: 'Netflix',
      genre: 'Action',
    },
    {
      name: 'The Final Wish',
      company: 'BondIt Capital',
      genre: 'Horror',
    },
    {
      name: 'Serenity',
      company: 'Aviron Pictures',
      genre: 'Drama',
    },
    {
      name: 'Miss Bala',
      company: 'Columbia Pictures',
      genre: 'Thriller',
    },
    {
      name: 'Velvet Buzzsaw',
      company: 'Netflix',
      genre: 'Comedy',
    },
  ];
}

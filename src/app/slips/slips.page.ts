import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-slips',
  templateUrl: './slips.page.html',
  styleUrls: ['./slips.page.scss'],
})
export class SlipsPage implements OnInit {
  constructor(private toast: ToastService) {}

  ngOnInit() {}

  doRefresh(event) {
    console.log(event);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.page.html',
  styleUrls: ['./meter.page.scss'],
})
export class MeterPage implements OnInit {

  constructor(private toast: ToastService) { }

  ngOnInit() {
  }


  doRefresh(event) {
    console.log(event);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}

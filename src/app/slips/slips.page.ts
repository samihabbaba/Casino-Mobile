import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-slips',
  templateUrl: './slips.page.html',
  styleUrls: ['./slips.page.scss'],
})
export class SlipsPage implements OnInit {
  form: FormGroup;
  searchQuery: string = '';
  machineList: any[] = [];

  constructor(
    private toast: ToastService,
    private menuCtrl: MenuController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.machineList = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 5, 5, 6, 7, 6, 1, 2, 3, 4, 5, 6, 7,
    ];
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  initializeForm() {
    this.form = this.fb.group({
      in: new FormControl(null, [Validators.required, Validators.min(0)]),
      out: new FormControl(null, [Validators.required, Validators.min(0)]),
      customerId: new FormControl(null, [Validators.required]),
      credit: new FormControl(null, [Validators.required, Validators.min(0)]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      currencyId: new FormControl(1, [Validators.required]),
      isActive: new FormControl(true),
    });
  }

  doRefresh(event) {
    this.initializeForm();
    event.target.complete();
  }

  submitForm() {
    const form = this.form.getRawValue();
    this.toast.success('Your changes saved successfully');
    console.log(form);
  }

  search(ev) {
    console.log(ev);
    console.log(this.searchQuery);
  }

  handleListClick(item) {
    console.log(item);
  }

  changeSize(currency: any) {
    this.form.get('currencyId').patchValue(currency);
  }

  get selectedCurrency() {
    return this.form.get('currencyId').value;
  }
}

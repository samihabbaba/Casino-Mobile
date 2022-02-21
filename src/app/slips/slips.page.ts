import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-slips',
  templateUrl: './slips.page.html',
  styleUrls: ['./slips.page.scss'],
})
export class SlipsPage implements OnInit {
  form: FormGroup;
  searchQuery: string = '';
  selectedMachine: any;
  machineList: any[] = [];
  copyOfMachineList: any[] = [];
  currencyList: any[] = [];

  paymentTypes: string[] = ['Cash', 'Credit Card', 'Chip'];

  constructor(
    private toast: ToastService,
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getMachines();
    this.initializeForm();
    this.getCurrencies();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  getCurrencies() {
    this.dataService.getCurrencies().subscribe((res) => {
      this.currencyList = res;
      this.form.get('currencyId').patchValue(this.currencyList[0].id);
    });
  }

  getMachines() {
    this.dataService.getMachines().subscribe((resp) => {
      this.machineList = resp;
      this.copyOfMachineList = resp;
      console.log(this.machineList);
    });
  }

  // AutoComplete
  customers: any[];

  onCustomerSelect(ev) {
    console.log(ev);
    // this.form.get('customerId').patchValue(ev.id);
  }
  getCustomers(event) {
    this.dataService
      .getCustomersAutoComplete(event.target.value)
      .subscribe((resp) => {
        this.customers = resp;
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      type: new FormControl('in', [Validators.required]),
      customerId: new FormControl(null, [Validators.required]),
      credit: new FormControl(null, [Validators.required, Validators.min(0)]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      currencyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(true),
      paymentType: new FormControl('Cash'),
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
    this.copyOfMachineList = this.machineList.filter(
      (option) =>
        String(option.seqNumber).indexOf(String(this.searchQuery)) === 0
    );
  }



  handleListClick(item) {
    this.selectedMachine = item;
    console.log(this.selectedMachine);
  }

  get selectedCurrency() {
    return this.form.get('currencyId').value;
  }

  changeCurrency(currency: any) {
    this.form.get('currencyId').patchValue(currency);
  }

  get selectedPaymentType() {
    return this.form.get('paymentType').value;
  }

  changePaymentType(paymentType: any) {
    this.form.get('paymentType').patchValue(paymentType);
  }
}

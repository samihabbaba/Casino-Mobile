import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-slips',
  templateUrl: './slips.page.html',
  styleUrls: ['./slips.page.scss'],
})
export class SlipsPage implements OnInit {
  @ViewChild('customersAutoComplete') customersAutoComplete: any;

  form: FormGroup;
  formAmount: number = null;
  formCredit: number = null;
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
    private dataService: DataService,
    private authService: AuthService
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
      this.form.get('rate').patchValue(this.currencyList[0].rate);
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
    if (ev?.id) {
      this.form.get('customerId').patchValue(ev.id);
      this.form.get('name').patchValue(ev.name);
      this.customersAutoComplete.searchInput.nativeElement.placeholder = '';
    }
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
      machineId: new FormControl(null),
      machineName: new FormControl(null),
      seqNumber: new FormControl(null),
      machineCredit: new FormControl(null),
      isJackPot: new FormControl(null),
      isVIP: new FormControl(null),
      customerId: new FormControl(null, [Validators.required]),
      name: new FormControl(null),
      currencyId: new FormControl(null, [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      credit: new FormControl(0, [Validators.required, Validators.min(0)]),
      staffId: new FormControl(this.authService.currentUser.id),
      rate: new FormControl(null, [Validators.required]),
      paymentType: new FormControl('Cash'),
      recordType: new FormControl('in'),
    });
  }

  handleListClick(item) {
    this.dataService.getMachineById(item.id).subscribe((resp) => {
      this.selectedMachine = resp;
      this.form.get('machineId').patchValue(this.selectedMachine.machineId);
      this.form.get('machineName').patchValue(this.selectedMachine.machineName);
      this.form.get('seqNumber').patchValue(this.selectedMachine.seqNumber);
      this.form
        .get('machineCredit')
        .patchValue(this.selectedMachine.machineCredit);
      this.form.get('name').patchValue(this.selectedMachine.name);
      this.form.get('isJackPot').patchValue(this.selectedMachine.isJackPot);
      this.form.get('isVIP').patchValue(this.selectedMachine.isVIP);
      this.form.get('customerId').patchValue(this.selectedMachine.customerId);

      this.form.get('recordType').patchValue('Credit');

      this.resetAmountAndCredit();

      this.customersAutoComplete.clearModel();
      this.customersAutoComplete.searchInput.nativeElement.placeholder =
        this.selectedMachine.name;
      console.log(this.selectedMachine);
    });
  }

  doRefresh(event) {
    this.initializeForm();
    this.form.get('currencyId').patchValue(this.currencyList[0].id);
    this.form.get('rate').patchValue(this.currencyList[0].rate);
    this.selectedMachine = null;
    this.resetAmountAndCredit();
    this.customersAutoComplete.clearModel();
    this.customersAutoComplete.searchInput.nativeElement.placeholder = '';
    this.dataService.getMachines().subscribe((resp) => {
      this.machineList = resp;
      this.copyOfMachineList = resp;
      event.target.complete();
      console.log(this.machineList);
    });
  }

  submitForm() {
    this.form.get('amount').patchValue(this.formAmount);
    this.form.get('credit').patchValue(this.formCredit);
    if (this.form.valid) {
      const form = this.form.getRawValue();
      this.dataService.addSlip(form).subscribe(
        (resp) => {
          this.initializeForm();
          this.form.get('currencyId').patchValue(this.currencyList[0].id);
          this.form.get('rate').patchValue(this.currencyList[0].rate);
          this.selectedMachine = null;
          this.resetAmountAndCredit();
          this.getMachines();
          this.customersAutoComplete.clearModel();
          this.customersAutoComplete.searchInput.nativeElement.placeholder = '';
          this.toast.success('Your changes saved successfully');
        },
        () => {
          this.toast.danger('Something went wrong');
        }
      );
    } else {
      this.toast.dark('Form is not valid');
    }
  }

  search(ev) {
    this.copyOfMachineList = this.machineList.filter(
      (option) =>
        String(option.seqNumber).indexOf(String(this.searchQuery)) === 0
    );
  }

  get recordType() {
    return this.form.get('recordType').value;
  }

  get selectedCurrency() {
    return this.form.get('currencyId').value;
  }

  changeCurrency(currency: any) {
    this.form.get('currencyId').patchValue(currency.id);
    this.form.get('rate').patchValue(currency.rate);

    this.resetAmountAndCredit();
  }

  get selectedPaymentType() {
    return this.form.get('paymentType').value;
  }

  changePaymentType(paymentType: any) {
    this.form.get('paymentType').patchValue(paymentType);
  }

  amountChange(ev) {
    if (this.formAmount) {
      const machineCredit = this.form.get('machineCredit').value;
      const rate = this.form.get('rate').value;
      const amountValue = this.formAmount;
      const creditValue = amountValue * rate * machineCredit;
      this.formCredit = +creditValue.toFixed(2);
      console.log(creditValue);
    }
  }

  creditChange(ev) {
    if (this.formCredit) {
      const machineCredit = this.form.get('machineCredit').value;
      const rate = this.form.get('rate').value;
      const creditValue = this.formCredit;
      const amountValue = creditValue / rate / machineCredit;
      this.formAmount = +amountValue.toFixed(2);
      console.log(this.formAmount);
    }
  }

  resetAmountAndCredit() {
    this.formAmount = null;
    this.formCredit = null;
  }
}

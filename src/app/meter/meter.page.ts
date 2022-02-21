import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.page.html',
  styleUrls: ['./meter.page.scss'],
})
export class MeterPage implements OnInit {
  form: FormGroup;
  searchQuery: string = '';
  selectedMachine: any;
  machineList: any[] = [];
  copyOfMachineList: any[] = [];

  constructor(
    private toast: ToastService,
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getMachines();
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  initializeForm() {
    this.form = this.fb.group({
      in: new FormControl(null, [Validators.required, Validators.min(0)]),
      out: new FormControl(null, [Validators.required, Validators.min(0)]),
      jackPot: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  getMachines() {
    this.dataService.getMachines().subscribe((resp) => {
      this.machineList = resp;
      this.copyOfMachineList = resp;
      console.log(this.machineList);
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
}

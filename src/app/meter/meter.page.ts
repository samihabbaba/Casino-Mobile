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
      checkInMeter: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      checkOutMeter: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      jackPotMeter: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      isOpenClose: new FormControl('true'),
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
    this.selectedMachine = null;
    this.dataService.getMachines().subscribe((resp) => {
      this.machineList = resp;
      this.copyOfMachineList = resp;
      event.target.complete();
    });
  }

  submitForm() {
    if (this.form.valid) {
      const form = this.form.getRawValue();
      if (form.isOpenClose === 'true') {
        form.isOpenClose = true;
      }
      if (form.isOpenClose === 'false') {
        form.isOpenClose = false;
      }
      this.dataService.addMeter(form, this.selectedMachine.id).subscribe(
        (resp) => {
          this.initializeForm();
          const currentIndex = this.machineList.findIndex(
            (x) => x.id === this.selectedMachine.id
          );
          this.selectedMachine = this.machineList[currentIndex + 1];
          this.toast.success('Your changes saved successfully');
        },
        (err) => {
          this.toast.danger(err.error.Message);
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

  handleListClick(item) {
    this.selectedMachine = item;
    console.log(this.selectedMachine);
  }
}

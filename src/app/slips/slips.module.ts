import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlipsPageRoutingModule } from './slips-routing.module';

import { SlipsPage } from './slips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SlipsPageRoutingModule,
  ],
  declarations: [SlipsPage],
})
export class SlipsPageModule {}

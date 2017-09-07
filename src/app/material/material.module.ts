import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdTableModule, MdPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, 
    MdCheckboxModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule,
    MdTableModule,
    MdPaginatorModule
  ],
  declarations: []
})
export class MaterialModule { }

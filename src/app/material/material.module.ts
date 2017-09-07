import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdTableModule, MdPaginatorModule, MdSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdSortModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule
  ],
  declarations: []
})
export class MaterialModule { }

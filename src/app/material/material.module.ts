import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdTableModule, MdPaginatorModule, MdSortModule, MdInputModule, MdSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdSortModule,
    MdInputModule,
    MdSelectModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule,
    MdInputModule,
    MdSelectModule
  ],
  declarations: []
})
export class MaterialModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Birthday } from 'src/app/model/birthday';

@Component({
  selector: 'app-birthdays-list',
  templateUrl: './birthdays-list.component.html',
  styleUrls: ['./birthdays-list.component.scss'],
})
export class BirthdaysListComponent {
  @Input() birthdays: Birthday[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns: string[] = ['name', 'birthday', 'actions'];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(birthday: Birthday){
    this.edit.emit(birthday);
  }
}

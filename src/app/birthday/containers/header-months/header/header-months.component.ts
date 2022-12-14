import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Birthday } from 'api-birthdays/dist/birthdays/entities/birthday.entity';
import { first, Observable, of, Subscription } from 'rxjs';
import { HeaderMonthsService } from '../../header-months.service';
import { Birthdays } from './../../../model/Birthday';

@Component({
  selector: 'app-header-months',
  templateUrl: './header-months.component.html',
  styleUrls: ['./header-months.component.scss'],
})
export class HeaderMonthsComponent implements OnDestroy {
  birthdays$ = this.headerMonthService.listAll();

  prints$: Observable<Birthday[]> | null = null;
  months: string[] = [];

  //@Output() birthdays: EventEmitter<any> = new EventEmitter(false);

  subscription: Subscription = new Subscription();
  constructor(
    private headerMonthService: HeaderMonthsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loadMonth();
  }

  loadMonth() {
    this.months = this.headerMonthService.getMonths();
  }

  forAll(){
    this.birthdays$ = this.headerMonthService.listAll();
  }

  forMonth(month: string) {
    this.subscription = this.headerMonthService
      .listForMonth(month)
      .subscribe((b: Birthdays) => (this.birthdays$ = of(b)));
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(birthday: Birthday) {
    this.router.navigate(['edit', birthday.id], { relativeTo: this.route });
  }

  onRemove(birthday: Birthday) {
    this.headerMonthService
      .remove(birthday.id)
      .pipe(first())
      .subscribe(() => {
        this.snackBar.open('Registro removido com sucesso!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

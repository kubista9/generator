import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { selectCurrentAlert } from '../store/selectors/alert.selectors';
import { loadProfile } from '../store/actions/user.actions';
import { clearAlert } from '../store/actions/alert.actions';
import { Alert as AlertMessage } from '@depsit/chattypes';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false
})

export class MainLayoutComponent implements OnInit, OnDestroy {
  error$: Observable<AlertMessage | undefined> | undefined;
  open = false;
  showError = true;
  private resizeObserver: ResizeObserver | null = null;
  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.error$ = this.store.pipe(select(selectCurrentAlert));
  }

  ngOnInit() {
    this.store.dispatch(loadProfile());
    this.resizeObserver = new ResizeObserver((entries) => {
      const [entry] = entries;
      if (entry.contentRect.width < 1000 || entry.contentRect.height < 600) {
        if (this.showError) {
          this.open = true;
          this.showError = false;
          this.cdr.detectChanges();
        }
      } else {
        this.showError = true;
      }
    });
    const element = document.querySelector('body');
    if (element) {
      this.resizeObserver.observe(element);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  closeAlert() {
    this.store.dispatch(clearAlert());
  }

  closeModal() {
    this.open = false;
  }
}
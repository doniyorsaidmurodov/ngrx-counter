import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {Observable} from "rxjs";
import {getLoading} from "./store/shared/shared.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }
}

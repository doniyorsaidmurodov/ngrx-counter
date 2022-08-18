import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {changeName, customInput} from "../state/counter.actions";
import {CounterState} from "../state/counter.state";
import {getName} from "../state/counter.selector";
import {Observable} from "rxjs";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  name$: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.name$ = this.store.select(getName);
  }

  onAdd() {
    this.store.dispatch(customInput({count: +this.value}))
  }

  onChange() {
    this.store.dispatch(changeName());
  }
}

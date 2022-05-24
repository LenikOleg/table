import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Directive,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { debounceTime, startWith, takeUntil } from 'rxjs';
import { ExtendedColumn } from '../models/extended-column';
import { InputComponent } from '../models/input-component';
import { DestroyService } from '../services/destroy.service';

@Directive({ selector: `[optionalComponentContainer]` })
export class OptionalComponentContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TableToolbarComponent implements OnInit, OnChanges {
  @Input() columns: Array<ExtendedColumn> = [];
  @Input() components!: Array<InputComponent>;
  @Output() onClick = new EventEmitter<string>();
  @Output() searchTermChanged = new EventEmitter<string>();
  @Output() columnsChanged = new EventEmitter<Array<ExtendedColumn>>();

  @ViewChild(OptionalComponentContainerDirective, { static: true })
  readonly formContainer!: OptionalComponentContainerDirective;

  private formComponent!: ComponentRef<any>;

  searchControl = new FormControl();

  constructor(private injector: Injector, private destroyService: DestroyService) {

  }

  ngOnInit() {
    this.renderComponents(this.components);

    this.searchControl.valueChanges
      .pipe(startWith(this.searchControl.value), debounceTime(300), takeUntil(this.destroyService))
      .subscribe((f) => {
        this.searchTermChanged.emit(f);
      });
    history.state?.searchText && this.searchControl.setValue(history.state.searchText);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const compts = changes['components'];

    if (compts && !isEqual(compts.previousValue, compts.currentValue)) {
      this.renderComponents(this.components);
    }
  }

  onColumnsChanged(columns: Array<ExtendedColumn>): void {
    this.columnsChanged.emit(columns);
  }

  private renderComponents(components: Array<InputComponent>) {
    if (components && components.length) {
      const viewContainerRef = this.formContainer.viewContainerRef;
      viewContainerRef.clear();

      components.forEach((component) => {
        this.formComponent = viewContainerRef.createComponent<any>(component.component, {
          injector: Injector.create({
            parent: this.injector,
            providers: [],
          }),
        });

        if (component.props) {
          Object.keys(component.props).forEach((x) => {
            this.formComponent.instance[x] = component.props![x];
          });
        }

        if (this.formComponent.instance.onClick) {
          this.formComponent.instance.onClick.subscribe((name: string | undefined) => {
            this.onClick.emit(name);
            console.log('tbclick');
          });
        }
      });
    }
  }
}

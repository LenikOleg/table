import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum BadgeTypeEnum {
  icon = 'icon',
  button = 'button',
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() name = '';

  @Input() text = '';

  @Input() paletteColor:
    | 'primary'
    | 'primary-light'
    | 'primary-clear'
    | 'accent'
    | 'accent-light'
    | 'alert'
    | 'alert-light'
    | 'grey' = 'primary';

  @Input() color = '';

  @Input() icon = '';

  @Input() fontIcon = '';

  @Input() tooltip = '';

  @Input() matMenuTriggerFor: any = 'toolbarSettingsMenu';

  @Input() badge: BadgeTypeEnum = BadgeTypeEnum.button;

  @Input() disabled = false;

  @Output() onClick = new EventEmitter<string | undefined>();

  BadgeTypeEnum = BadgeTypeEnum;

  onClickHandler = () => {
    this.onClick.emit(this.name);
  };
}

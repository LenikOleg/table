import { Component, Input } from '@angular/core';
import { AvatarData } from '../models/avatar-data';

@Component({
  selector: 'app-userpick',
  templateUrl: './userpick.component.html',
  styleUrls: ['./userpick.component.scss'],
})
export class UserpickComponent {
  @Input() onlyPhoto = true;

  @Input()
  data!: AvatarData;

  @Input() isOnline = false;

  @Input() size = 5;
}

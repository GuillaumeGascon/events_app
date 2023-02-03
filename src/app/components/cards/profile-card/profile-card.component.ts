import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements AfterViewInit {

  @Input() me!: User;

  @Output() edit = new EventEmitter();

  avatar!: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.avatar = `/assets/avatar/${this.me.avatar}.gif`;
    this.changeDetectorRef.detectChanges();
  }

}

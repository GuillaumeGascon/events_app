import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'action-sheet-modal',
  templateUrl: './action-sheet-modal.component.html',
  styleUrls: ['./action-sheet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetModalComponent {

  @Input() title!: string;
  @Input() text!: string;
  @Input() status!: string;
  @Input() actionButton!: string;
  @Input() cancelButton!: string;
  @Input() data!: any;

  @Output() action = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController
  ) { }

  async dismiss(data?: any, role?: string): Promise<void> {
    await this.modalCtrl.dismiss(data, role);
  }

}

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'button-base',
  templateUrl: './button-base.component.html',
  styleUrls: ['./button-base.component.scss'],
})
export class ButtonBaseComponent implements AfterViewInit {

  @Input() size: 'large' | 'medium' | 'small' = 'large';
  @Input() iconSlot: 'start' | 'end' = 'start';
  @Input() buttonStyle: 'filled' | 'outline' = 'filled';
  @Input() color!: string;
  @Input() iconOnly!: boolean;
  @Input() lottie!: boolean;
  @Input() lottiePath!: string;
  @Input() icon!: boolean;
  @Input() iconName!: string;
  @Input() label!: string;
  @Input() disabled!: boolean;

  options: AnimationOptions = {
    autoplay: false,
    loop: 0,
  }

  private animationItem!: AnimationItem;


  @Output() clicked = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    this.options = {
      ...this.options,
      path: this.lottiePath
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  animationComplete(): void {
    this.animationItem.stop();
    this.clicked.emit();
  }

  onClick(): void {
    if (this.lottie) {
      this.animationItem.play();
    } else {
      this.clicked.emit();
    }
  }

}

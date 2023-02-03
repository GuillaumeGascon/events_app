import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { wait } from 'src/app/helpers/wait';

@Component({
  selector: 'admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnDestroy {

  @ViewChild(IonTabs) tabs!: IonTabs;

  listOption: AnimationOptions = {
    path: '/assets/lottie/list-outline.json',
    autoplay: false,
    loop: 0
  }

  addOption: AnimationOptions = {
    path: '/assets/lottie/add-outline.json',
    autoplay: false,
    loop: 0
  }

  listItem!: AnimationItem;
  addItem!: AnimationItem;

  timeout!: NodeJS.Timeout;

  constructor() { }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  ionViewDidEnter(){
    this.getSelectedTab();
  }

  listCreated(animationItem: AnimationItem): void {
    this.listItem = animationItem;
  }

  addCreated(animationItem: AnimationItem): void {
    this.addItem = animationItem;
  }

  play(): void {
    this.getSelectedTab();
  }

  async getSelectedTab(): Promise<void> {
    await wait(50);
    const selected = this.tabs.getSelected();
    switch(selected) {
      case 'list':
        this.selectList();
        break;
      case 'add':
        this.selectAdd();
        break;
    }
  }

  selectList(): void {
    this.listOption = {
      ...this.listOption,
      path: '/assets/lottie/list.json'
    }
    this.addOption = {
      ...this.addOption,
      path: '/assets/lottie/add-outline.json'
    }
    this.timeout = setTimeout(() => {
      this.listItem.play();
    }, 50);
  }

  selectAdd(): void {
    this.listOption = {
      ...this.listOption,
      path: '/assets/lottie/list-outline.json'
    }
    this.addOption = {
      ...this.addOption,
      path: '/assets/lottie/add.json'
    }
    this.timeout = setTimeout(() => {
      this.addItem.play();
    }, 50);
  }

}

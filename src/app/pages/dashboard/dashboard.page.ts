import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { wait } from 'src/app/helpers/wait';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnDestroy {

  @ViewChild(IonTabs) tabs!: IonTabs;

  homeOption: AnimationOptions = {
    path: '/assets/lottie/home-outline.json',
    autoplay: false,
    loop: 0
  }

  ticketOption: AnimationOptions = {
    path: '/assets/lottie/ticket-outline.json',
    autoplay: false,
    loop: 0
  }

  accountOption: AnimationOptions = {
    path: '/assets/lottie/account-outline.json',
    autoplay: false,
    loop: 0
  }

  homeItem!: AnimationItem;
  ticketItem!: AnimationItem;
  accountItem!: AnimationItem;

  timeout!: NodeJS.Timeout;

  constructor() { }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  ionViewDidEnter(){
    this.getSelectedTab();
  }

  homeCreated(animationItem: AnimationItem): void {
    this.homeItem = animationItem;
  }

  ticketCreated(animationItem: AnimationItem): void {
    this.ticketItem = animationItem;
  }

  accountCreated(animationItem: AnimationItem): void {
    this.accountItem = animationItem;
  }

  play(): void {
    this.getSelectedTab();
  }

  async getSelectedTab(): Promise<void> {
    await wait(50);
    const selected = this.tabs.getSelected();
    switch(selected) {
      case 'home':
        this.selectHome();
        break;
      case 'ticket':
        this.selectTicket();
        break;
      case 'account':
        this.selectAccount();
        break;
    }
  }

  selectHome(): void {
    this.homeOption = {
      ...this.homeOption,
      path: '/assets/lottie/home.json'
    }
    this.ticketOption = {
      ...this.ticketOption,
      path: '/assets/lottie/ticket-outline.json'
    }
    this.accountOption = {
      ...this.accountOption,
      path: '/assets/lottie/account-outline.json'
    }
    this.timeout = setTimeout(() => {
      this.homeItem.play();
    }, 50);
  }

  selectTicket(): void {
    this.homeOption = {
      ...this.homeOption,
      path: '/assets/lottie/home-outline.json'
    }
    this.ticketOption = {
      ...this.ticketOption,
      path: '/assets/lottie/ticket.json'
    }
    this.accountOption = {
      ...this.accountOption,
      path: '/assets/lottie/account-outline.json'
    }
    this.timeout = setTimeout(() => {
      this.ticketItem.play();
    }, 50);
  }

  selectAccount(): void {
    this.homeOption = {
      ...this.homeOption,
      path: '/assets/lottie/home-outline.json'
    }
    this.ticketOption = {
      ...this.ticketOption,
      path: '/assets/lottie/ticket-outline.json'
    }
    this.accountOption = {
      ...this.accountOption,
      path: '/assets/lottie/account.json'
    }
    this.timeout = setTimeout(() => {
      this.accountItem.play();
    }, 50);
  }

}

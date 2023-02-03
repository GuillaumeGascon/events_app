import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export const showErrorToast = async (translateService: TranslateService, toastrCtrl: ToastController, err: any): Promise<void> => {
  if (err.error) {
    const titleLabel = `${err.error.translation}.title`;
    const bodyLabel = `${err.error.translation}.body`;
    let message: any;
    translateService.get([
        titleLabel,
        bodyLabel,
        'error.unknown.title',
        'error.unknown.body'
      ]).subscribe(res => {
        message = res;
      });
    let title = message[titleLabel];
    let body = message[bodyLabel];
    console.log({
      title,
      titleLabel
    })
    if (title === titleLabel || body === bodyLabel) {
      title = message['error.unknown.title'];
      body = message['error.unknown.body'];
    }
    const toast = await toastrCtrl.create({
      header: title,
      message: body,
      icon: 'warning',
      cssClass: 'custom-toast danger-base',
      duration: 5000
    });
    toast.addEventListener('click', () => toast.dismiss());
    await toast.present();
  } else {
    console.error(err);
  }
};

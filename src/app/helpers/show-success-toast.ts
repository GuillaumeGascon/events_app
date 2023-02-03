import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export const showSuccessToast = async (translateService: TranslateService, toastrCtrl: ToastController, prefix: string, style: string): Promise<void> => {
  const headerLabel = `${prefix}.header`;
  const messageLabel = `${prefix}.message`;
  const message = await firstValueFrom(translateService.get([
      headerLabel,
      messageLabel
    ]));
  const toast = await toastrCtrl.create({
    header: message[headerLabel],
    message: message[messageLabel],
    icon: 'sh-check',
    cssClass: `custom-toast ${style}`,
    duration: 5000
  });
  toast.addEventListener('click', () => toast.dismiss());
  await toast.present();
};

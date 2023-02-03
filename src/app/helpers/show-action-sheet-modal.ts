import { Keyboard } from '@capacitor/keyboard';
import { ModalController } from '@ionic/angular';
import { ActionSheetModalComponent } from '../components/modals/action-sheet-modal/action-sheet-modal.component';
import { getContentHeight } from './get-content-height';
import { wait } from './wait';

export const setSheetModalContentHeight = (modal: HTMLIonModalElement, breakpoint: number, expand: boolean): boolean => {
  if (breakpoint >= 0.9 && !expand) {
    modal.classList.add('no-radius');
    modal.setCurrentBreakpoint(1);
    expand = true;
  } else if (breakpoint <= 0.9 && expand) {
    modal.classList.remove('no-radius');
    expand = false;
  }
  return expand;
}

export const getSheetModalHeight = async (): Promise<number> => {
  await Keyboard.hide();
  await wait(50);
  const h = window.innerHeight;
  if (h >= 950) return 0.340;
  if (h >= 925) return 0.350;
  if (h >= 900) return 0.360;
  if (h >= 875) return 0.370;
  if (h >= 850) return 0.380;
  if (h >= 825) return 0.390;
  if (h >= 800) return 0.400;
  if (h >= 775) return 0.410;
  if (h >= 750) return 0.420;
  if (h >= 725) return 0.433;
  if (h >= 700) return 0.450;
  if (h >= 675) return 0.465;
  if (h >= 650) return 0.485;
  if (h >= 625) return 0.510;
  if (h >= 600) return 0.535;
  if (h >= 575) return 0.560;
  if (h >= 550) return 0.590;
  if (h >= 525) return 0.620;
  if (h >= 500) return 0.650;
  return 0.75;
};

export const showActionSheetModal = async (
  modalCtrl: ModalController,
  title: string,
  text: string,
  status: string,
  actionButton: string,
  cancelButton: string,
  data?: any,
  actionCallback?: () => void,
  cancelCallback?: () => void,
  dismissCallback?: () => void): Promise<void> => {
  const height = await getSheetModalHeight();
  const modal = await modalCtrl.create({
    component: ActionSheetModalComponent,
    breakpoints: [height],
    handle: false,
    initialBreakpoint: height,
    componentProps: {
      title,
      text,
      status,
      actionButton,
      cancelButton,
      data
    },
    id: 'modalSheet'
  });
  await modal.present();
  const output = await modal.onDidDismiss();
  if (output.data) {
    if (actionCallback && output.role === 'confirm') {
      actionCallback()
    } else if (cancelCallback && output.role === 'cancel') {
      cancelCallback()
    }
  } else if (!output.data && dismissCallback) {
    dismissCallback();
  }
};

export const dismissCurrentModal = async (): Promise<void> => {
  const currentModal = document.querySelector('#modalSheet') as HTMLIonModalElement;
  if (currentModal) {
    currentModal.canDismiss = true;
    await currentModal.dismiss();
  }
};

export const initModalListener = async (modal: HTMLIonModalElement): Promise<void> => {
  let expand = false;
  // Define if the modal is fully expand
  const content = getContentHeight();
  // Return an object with content height in px and in %
  const initialBreakpoint = await modal.getCurrentBreakpoint();
  // Get the initialBreakpoint
  expand = setSheetModalContentHeight(modal, initialBreakpoint as number, expand);
  addEventListener('ionModalWillPresent', () => {
    modal.setAttribute('style', `--height: ${content.percent}%`);
    // Set the modal height before it shown to avoid visual bug
  });
  addEventListener('ionBreakpointDidChange', (e: any) => {
    const breakpoint = e.detail.breakpoint;
    expand = setSheetModalContentHeight(modal, breakpoint, expand);
  });
};

export const removeModalListener = async (modal: HTMLIonModalElement): Promise<void> => {
  let expand = false;
  // Define if the modal is fully expand
  const content = getContentHeight();
  // Return an object with content height in px and in %
  removeEventListener('ionModalWillPresent', () => {
    modal.setAttribute('style', `--height: ${content.percent}%`);
    // Set the modal height before it shown to avoid visual bug
  });
  removeEventListener('ionBreakpointDidChange', (e: any) => {
    const breakpoint = e.detail.breakpoint;
    expand = setSheetModalContentHeight(modal, breakpoint, expand);
  });
};

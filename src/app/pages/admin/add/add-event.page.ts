import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { ImageService } from 'src/app/services/image.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage {

  @ViewChild('uploader') uploader!: ElementRef;
  @ViewChild('swiper') swiper!: SwiperComponent;

  isLoading!: boolean;
  length!: number
  currentIndex!: number;
  eventDate!: Date;
  preview!: string;
  file!: File | null;

  //error
  codeError: string | null = null;
  passwordError: string | null = null;
  repeatPasswordError: string | null = null;

  slideOptions: SwiperOptions = {
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 16,
    initialSlide: 0
  };

  eventMainInformationsForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    creator: ['', [Validators.required]]
  });

  eventInformationsForm: FormGroup = this.fb.group({
    location: ['', [Validators.required]],
    date: ['', [Validators.required]]
  });

  get title(): FormControl {
    return this.eventMainInformationsForm.get('title') as FormControl;
  }

  get creator(): FormControl {
    return this.eventMainInformationsForm.get('creator') as FormControl;
  }

  get location(): FormControl {
    return this.eventInformationsForm.get('location') as FormControl;
  }

  get date(): FormControl {
    return this.eventInformationsForm.get('date') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private eventService: EventService,
    private imageService: ImageService
  ) { }

  ngAfterViewInit() {
    this.getSliderLength();
    this.reset();
    this.changeDetectorRef.detectChanges();
  }

  setDate(e: any): void {
    this.date.setValue(e);
  }

  counter(n: number): any {
    return new Array(n);
  }

  getCurrentIndex(): void {
    this.currentIndex = this.swiper.swiperRef.activeIndex;
  }

  getSliderLength(): void {
    this.length = this.swiper.swiperRef.wrapperEl.children.length;
  }

  openFileDialog() {
    this.uploader.nativeElement.click();
  };

  async setImage(event: any): Promise<void> {
    const eventObj: any = event;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    this.file = target.files![0];
    this.preview = URL.createObjectURL(this.file);
 }

 async createEvent(): Promise<void> {
  const loading = await this.loadingCtrl.create();
  await loading.present();
  try {
    if (this.file) {
      const banner = await this.imageService.upload(this.file);
      if (this.eventInformationsForm.valid && this.eventMainInformationsForm.valid && banner) {
        const event: Event = {
          title: this.title.value,
          creator: this.creator.value,
          location: this.location.value,
          date: this.date.value,
          banner: banner.id.toString(),
        }
        await this.eventService.createEvent(event);
        this.reset();
        await this.navCtrl.navigateRoot(['/admin/tabs/list']);
      }
    }
  } catch (err) {
    console.error(err);
  }
  await loading.dismiss();
 }

  slideNext(): void {
    this.swiper.swiperRef.slideNext();
    this.getCurrentIndex();
  }

  slidePrev(): void {
    this.swiper.swiperRef.slidePrev();
    this.getCurrentIndex();
  }

  reset(): void {
    this.title.reset();
    this.creator.reset();
    this.location.reset();
    this.date.reset();
    this.file = null;
    this.preview = '';
    this.currentIndex = 0;
    this.swiper.swiperRef.slideTo(0);
    this.getCurrentIndex();
  }

}

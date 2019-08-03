import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';


@Component({
	selector: 'app-bookings',
	templateUrl: './bookings.page.html',
	styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
	loadedBookings: Booking[];
	private bookingSub: Subscription;

	constructor(private bookingService: BookingService, private loadingController: LoadingController) { }

	ngOnInit() {
		this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
			this.loadedBookings = bookings;
		});
	}

	onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
		slidingEl.close();
		this.loadingController.create({message: 'Cancelling...'}).then(loadingEl => {
			loadingEl.present();
			this.bookingService.cancelBooking(bookingId).subscribe(() => {
				loadingEl.dismiss();
			});
		});
	}

	ngOnDestroy() {
		if (this.bookingSub) {
			this.bookingSub.unsubscribe();
		}
	}

}

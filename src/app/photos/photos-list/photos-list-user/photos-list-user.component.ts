import {Component, Output, EventEmitter} from '@angular/core';
import {PhotosListComponent} from "../photos-list.component";
import {ErrorService} from "../../../core/error/error.service";

/**
 * A list of the user's photos
 */
@Component({
  selector: 'photos-list-user',
  templateUrl: './photos-list-user.component.html',
  styleUrls: ['../photos-list.component.scss', './photos-list-user.component.scss']
})
export class PhotosListUserComponent extends PhotosListComponent {

	@Output() public closed: EventEmitter<void> = new EventEmitter();

	/**
	 * Name of the user
	 */
	public userName: string;

	/**
	 * Id of the user
	 */
	private userId: string;

	/**
	 * Duration of the slide up/down transition
	 * @type {number}
	 */
	private transitionDuration: number = 300;

	public fetchPage(page: number = 1): void {
		if (!this.userId) return;

		this.flickrApiService.getUserPhotos(this.userId, page)
			.subscribe(
				data => {
					if (this.flickrApiService.handleError(data)) return;

					const photosData = (<any>data).photos;
					const fetchedPhotos = PhotosListComponent.mapPhotos(photosData.photo);

					this.addPhotos(fetchedPhotos);
					this.checkIfAllFetched(photosData);
				},
				error => {
					this.errorService.reportError(`${error.statusText} (code ${error.status})`);
				}
			);
	}

	public showUserPhotos(user: any): void {
		this.userId = user.id;
		this.userName = user.name;
		this.fetchPage();
	}

	public close(): void {
		this.closed.emit();
		window.setTimeout(() => this.clear(), this.transitionDuration);
	}
}

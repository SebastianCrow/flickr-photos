import {Component, Output, EventEmitter} from '@angular/core';
import {PhotosListComponent} from "../photos-list.component";
import {Filters} from "../../../api/flickr-api.data";

/**
 * A list of the searched photos
 */
@Component({
  selector: 'photos-list-search',
  templateUrl: './photos-list-search.component.html',
  styleUrls: ['../photos-list.component.scss']
})
export class PhotosListSearchComponent extends PhotosListComponent {

	@Output() public userSelected: EventEmitter<any> = new EventEmitter();

	/**
	 * Search query
	 * @type {string}
	 */
	public query: string = "Dogs";

	/**
	 * Search filters
	 */
	public filters: Filters;

	///

	public onSearchParamsChanged(data: any): void {
		this.query = data.query;
		this.filters = data.filters;

		this.clear();
		this.clearPaging.next();
		this.fetchPage();
	}

	public fetchPage(page: number = 1): void {
		if (!this.query) return;

		this.flickrApiService.search(this.query, this.filters, page)
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

	public selectUser(userId: string, userName: string): void {
		this.userSelected.emit({ id: userId, name: userName });
	}
}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FlickrApiService} from "../../api/flickr-api.service";
import {FetchPagesComponent} from "../../core/paging/paging.component";
import {Subject} from "rxjs";
import {ErrorService} from "../../core/error/error.service";
import {Photo} from "../../model/Photo";
import {PhotoSize} from "../../api/flickr-api.data";

interface PageData {
	page: number;
	pages: number;
}

/**
 * An abstract component for a list of the photos
 */
@Component({})
export abstract class PhotosListComponent implements OnInit, FetchPagesComponent {

	@Output() public photoSelected: EventEmitter<Photo> = new EventEmitter();

	/**
	 * Photos in the list
	 * @type {Array}
	 */
	public photos: Photo[] = [];

	/**
	 * Clear paging and start from the page 1 again
	 * @type {Subject<void>}
	 */
	public clearPaging: Subject<void> = new Subject<void>();

	/**
	 * Whether all the pages are fetched
	 * @type {boolean}
	 */
	protected allPagesFetched: boolean = false;

	constructor(protected flickrApiService: FlickrApiService,
	            protected errorService: ErrorService) {}

	ngOnInit() {
		this.fetchPage(1);
	}

	///

	public selectPhoto(photo: Photo): void {
		this.photoSelected.emit(photo);
	}

	///

	public areAllPagesFetched(): boolean {
		return this.allPagesFetched;
	}

	public abstract fetchPage(page: number): void;

	///

	protected static mapPhotos(photos: any[]): Photo[] {
		const photoModels: Photo[] = [];

		for (const photo of photos) {
			const photoModel = Photo.fromData(photo);
			// TODO: Better photo size depending on desktop / mobile
			photoModel.thumbnailUrl = FlickrApiService.getPhotoUrl(photo, PhotoSize.Medium);
			photoModel.originalUrl = FlickrApiService.getPhotoUrl(photo, PhotoSize.Large);
			photoModels.push(photoModel);
		}

		return photoModels;
	}

	protected addPhotos(photos: Photo[]): void {
		this.photos = this.photos.concat(photos);
	}

	protected checkIfAllFetched(data: PageData): void {
		this.allPagesFetched = (data.page >= data.pages);
	}

	protected clear(): void {
		this.photos = [];
		this.allPagesFetched = false;
	}
}

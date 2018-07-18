import { Component } from '@angular/core';
import {Photo} from "../../model/Photo";

/**
 * Photo details page
 */
@Component({
  selector: 'photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent {

	public photo: Photo;

	public largePhotoUrl: string;
	public authorName: string;
	public date: Date;
	public description: string;

	private transitionDuration: number = 300;

	public showPhoto(photo: Photo): void {
		this.photo = photo;
		this.largePhotoUrl = photo.originalUrl;
		this.authorName = photo.authorName;
		this.date = photo.date;
		this.description = photo.description;
	}

	public close(): void {
		this.photo = undefined;
		window.setTimeout(() => this.clear(), this.transitionDuration);
	}

	private clear(): void {
		this.largePhotoUrl = undefined;
		this.authorName = undefined;
		this.date = undefined;
		this.description = undefined;
	}
}

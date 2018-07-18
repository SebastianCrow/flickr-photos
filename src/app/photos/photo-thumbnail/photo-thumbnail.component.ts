import {Component, Input, EventEmitter, Output} from '@angular/core';

/**
 * Photo thumbnail element (image & info)
 */
@Component({
	selector: 'photo-thumbnail',
	templateUrl: './photo-thumbnail.component.html',
	styleUrls: ['./photo-thumbnail.component.scss']
})
export class PhotoThumbnailComponent {

	@Input() public url: string;

	@Input() public authorName: string;

	@Input() public date: Date;

	@Input() public description: string;

	@Output() public photoSelected: EventEmitter<void> = new EventEmitter();

	@Output() public userSelected: EventEmitter<void> = new EventEmitter();

	public selectPhoto(): void {
		this.photoSelected.emit();
	}

	public selectUser(): void {
		this.userSelected.emit();
	}
}

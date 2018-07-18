import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {

	public static message: string;

	public static modalRef: BsModalRef;

	private static title: string = "Error";

	get title(): string {
		return ErrorModalComponent.title;
	}

	get message(): string {
		return ErrorModalComponent.message;
	}

	// TODO: Support for multiple modals
	public close(): void {
		ErrorModalComponent.modalRef.hide();
		ErrorModalComponent.modalRef = undefined;
	}
}

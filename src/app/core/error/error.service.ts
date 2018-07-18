import { Injectable } from '@angular/core';
import {BsModalService} from "ngx-bootstrap";
import {ErrorModalComponent} from "./error-modal/error-modal.component";

/**
 * A general service to handle errors (modals & console)
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

	private modalReporting: boolean = true;
	private consoleReporting: boolean = true;

	constructor(private modalService: BsModalService) {}

	public reportError(message: string): void {
		if (this.modalReporting) {
			this.reportModal(message);
		}
		if (this.consoleReporting) {
			this.reportConsole(message);
		}
	}

	private reportModal(message: string): void {
		// TODO: A better way to communicate between the service and modal component
		ErrorModalComponent.message = message;
		ErrorModalComponent.modalRef = this.modalService.show(ErrorModalComponent);
	}

	private reportConsole(message: string): void {
		console.error(message);
	}
}

import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	public currentUserId: string;

	public showUser(userId: string): void {
		this.currentUserId = userId;
	}

	public closeUser(): void {
		this.currentUserId = undefined;
	}
}

import {Component, Output, EventEmitter} from '@angular/core';

/**
 * Search input element
 */
@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

	@Output() public enterPressed: EventEmitter<string> = new EventEmitter();

	public onEnterPressed(inputValue: string): void {
		this.enterPressed.emit(inputValue);
	}
}

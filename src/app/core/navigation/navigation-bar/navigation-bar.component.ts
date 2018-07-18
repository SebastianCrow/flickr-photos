import {Component, EventEmitter, Output} from '@angular/core';
import {Filters} from "../../../api/flickr-api.data";

/**
 * Top Navigation Bar
 */
@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

	@Output() public searchParamsChanged: EventEmitter<any> = new EventEmitter();

	private query: string = "Dogs";

	private filters: Filters;

	public onSearchEnterPressed(query: string): void {
		if (!query) return;

		this.query = query;
		this.emitChangedSearchParams();
	}

	public onFilterChange(filters: Filters): void {
		this.filters = filters;
		this.emitChangedSearchParams();
	}

	private emitChangedSearchParams(): void {
		this.searchParamsChanged.emit({
			query: this.query,
			filters: this.filters
		});
	}
}

import {Component, OnInit, Input} from '@angular/core';
import {Subject} from "rxjs";

/**
 * Interface for a component using the paging component
 */
export interface FetchPagesComponent
{
	/**
	 * A subject to dispatch when the paging should be cleared (start from the page 1 again)
	 */
	clearPaging: Subject<void>;

	/**
	 * Whether all the pages are fetched
	 * @returns {boolean} All pages fetched
	 */
	areAllPagesFetched(): boolean;

	/**
	 * Fetch a given page
	 * @param {number} page Page to fetch
	 */
	fetchPage(page: number): void;
}

/**
 * Infinite scroll component
 */
@Component({
	selector: 'paging',
	templateUrl: 'paging.component.html',
	styleUrls: ['paging.component.scss']
})
export class PagingComponent implements OnInit {

	/**
	 * Component controlling the paging
	 */
	@Input() public fetchPagesComponent: FetchPagesComponent;

	/**
	 * Whether or not the scrollable wrapper element should be fixed
	 */
	@Input() public fixed: boolean;

	/**
	 * A class for an additional top padding
	 */
	@Input() public paddingTopClass: string;

	/**
	 * Currently fetched page
	 * @type {number}
	 */
	private currentPage: number = 1;

	///

	ngOnInit() {
		this.fetchPagesComponent.clearPaging.subscribe(() => this.clear());
	}

	///

	public fetchNextPage(): void {
		if (this.fetchPagesComponent.areAllPagesFetched()) {
			return;
		}

		this.currentPage += 1;
		this.fetchPagesComponent.fetchPage(this.currentPage);
	}

	private clear(): void {
		this.currentPage = 1;
	}
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorService} from "../core/error/error.service";
import {UrlData, PhotoSize, PhotoInfo, Filters, Param} from "./flickr-api.data";

@Injectable({
	providedIn: 'root'
})
export class FlickrApiService {

	private baseUrl: string = "https://api.flickr.com/services/rest";

	private apiKey: string = "0f1e8ea33a6c65319353dae13edfc6d7";

	private searchData: UrlData = { method: "flickr.photos.search", extras: ["owner_name", "date_upload", "description"] };
	private getUserPhotosData: UrlData = { method: "flickr.people.getPublicPhotos", extras: ["owner_name", "date_upload", "description"] };
	private getLicensesData: UrlData = { method: "flickr.photos.licenses.getInfo" };

	constructor(private httpClient: HttpClient,
	            private errorService: ErrorService) {}

	/* API functions */

	/**
	 * Get url for the photo file
	 * @param photo
	 * @param size
	 * @returns {string}
	 */
	public static getPhotoUrl(photo: PhotoInfo, size: PhotoSize = PhotoSize.Thumbnail) {
		return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
	}

	/**
	 * Paged search for the photos with the optional filters
	 * @param query
	 * @param filters
	 * @param page
	 * @returns {Observable<Object>}
	 */
	public search(query: string, filters?: Filters, page: number = 1): Observable<Object> {

		const params = this.getParams(this.searchData);
		FlickrApiService.addFilters(params, filters);
		FlickrApiService.addPage(params, page);
		FlickrApiService.addParam(params, "text", query);

		const url = `${this.baseUrl}/?${FlickrApiService.paramsToString(params)}`;

		return this.httpClient.get(url);
	}

	/**
	 * Get paged photos of the given user
	 * @param userId
	 * @param page
	 * @returns {Observable<Object>}
	 */
	public getUserPhotos(userId: string, page: number = 1): Observable<Object> {

		const params = this.getParams(this.getUserPhotosData);
		FlickrApiService.addPage(params, page);
		FlickrApiService.addParam(params, "user_id", userId);

		const url = `${this.baseUrl}/?${FlickrApiService.paramsToString(params)}`;

		return this.httpClient.get(url);
	}

	/**
	 * Get a list of the licenses
	 * @returns {Observable<Object>}
	 */
	public getLicenses(): Observable<Object> {

		const params = this.getParams(this.getLicensesData);
		const url = `${this.baseUrl}/?${FlickrApiService.paramsToString(params)}`;

		return this.httpClient.get(url);
	}

	/* Params helpers */

	private getParams(urlData: UrlData): Param[] {
		const params: Param[] = [];

		// Api Key
		FlickrApiService.addParam(params, "api_key", this.apiKey);

		// Method
		FlickrApiService.addParam(params, "method", urlData.method);
		if (urlData.extras !== undefined && urlData.extras.length > 0) {
			FlickrApiService.addParam(params, "extras", urlData.extras.join(","));
		}

		// Format
		FlickrApiService.addParam(params, "format", "json");
		FlickrApiService.addParam(params, "nojsoncallback", "1");

		return params;
	}

	private static addPage(params: Param[], page: number): void {
		FlickrApiService.addParam(params, "page", String(page));
	}

	private static addFilters(params, filters: Filters): void {

		if (filters !== undefined && filters.color !== undefined) {
			FlickrApiService.addParam(params, "color_codes", filters.color);
		}
		if (filters !== undefined && filters.license !== undefined) {
			FlickrApiService.addParam(params, "license", filters.license);
		}
	}

	private static addParam(params: Param[], name: string, value: string): void {
		params.push(new Param(name, value));
	}

	private static paramsToString(params: Param[]): string {
		return params.map(param => param.getString()).join("&");
	}

	/* Error handling */

	public handleError(data: any): boolean {
		if (data.stat === "fail") {
			this.errorService.reportError(`${data.message} (code ${data.code})`);
			return true;
		}
		return false;
	}
}
